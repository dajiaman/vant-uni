<template>
	<view class="van-uploader">
		<view class="van-uploader__wrapper">
			<view class="van-uploader__preview" v-for="(item, index) in lists" :key="index" :data-index="index" @click="onClickPreview">
				<image v-if="item.isImage" class="van-uploader__preview-image" :mode="imageFit" :src="item.url || item.path" :data-index="index" @click="onPreviewImage"></image>

				<view class="van-uploader__file" v-else>
					<van-icon name="description" class="van-uploader__file-icon"></van-icon>
					<view class="van-uploader__file-name van-ellipsis">{{ item.name || item.url || item.path }}</view>
				</view>

				<view v-if="item.status === 'uploading' || item.status === 'failed'" class="van-uploader__mask">
					<van-icon v-if="item.status === 'failed'" name="warning-o" class="van-uploader__mask-icon"></van-icon>
					<van-loading v-else custom-class="van-uploader__loading" />
					<text v-if="item.message" class="van-uploader__mask-message">{{ item.message }}</text>
				</view>

				<view v-if="deleteable && item.deleteable" class="van-uploader__preview-delete" :data-index="index" @click.stop="deleteItem">
					<van-icon class="van-uploader__preview-delete__icon" name="clear"></van-icon>
				</view>
			</view>

			<block v-if="isInCount">
				<view class="van-upload__slot" @click="startUpload"><slot></slot></view>

				<!-- 默认上传样式 -->
				<view v-if="showUpload && !$slots['default']" class="van-uploader__upload" :class="[disabled ? 'van-uploader__upload--disabled' : '']" @click="startUpload">
					<van-icon :name="uploadIcon" size="42" class="van-uploader__upload-icon"></van-icon>

					<text v-if="uploadText" class="van-uploader__upload-text">{{ uploadText }}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import { isImageFile, isVideo, chooseFile, isPromise } from './utils.js';

export default {
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		uploadText: String,
		useBeforeRead: Boolean,
		afterRead: null,
		beforeRead: null,
		previewSize: {
			type: null,
			default: 80
		},
		name: {
			type: [Number, String],
			default: ''
		},

		accept: {
			type: String,
			default: 'image'
		},

		fileList: {
			type: Array,
			default: () => {
				return [];
			}
		},
		// 文件最大大小
		maxSize: {
			type: Number,
			default: Number.MAX_VALUE
		},
		maxCount: {
			type: Number,
			default: 100
		},
		deleteable: {
			type: Boolean,
			default: true
		},
		showUpload: {
			type: Boolean,
			default: true
		},
		previewImage: {
			type: Boolean,
			default: true
		},
		previewFullImage: {
			type: Boolean,
			default: true
		},
		imageFit: {
			type: String,
			default: 'scaleToFill'
		},
		uploadIcon: {
			type: String,
			default: 'photograph'
		},
		sizeType: {
			type: Array,
			default: () => {
				return ['original', 'compressed'];
			}
		},
		capture: {
			type: Array,
			default: () => {
				return ['album', 'camera'];
			}
		},

		compressed: {
			type: Boolean,
			default: true
		},
		maxDuration: {
			type: Number,
			default: 60
		},
		camera: {
			type: String,
			default: 'back'
		}
	},
	watch: {
		fileList: {
			immediate: true,
			handler: 'formatFileList'
		}
	},
	data() {
		return {
			lists: [],
			isInCount: true
		};
	},
	methods: {
		formatFileList() {
			const { fileList = [], maxCount } = this;
			const lists = fileList.map(item => ({
				...item,
				isImage: typeof item.isImage === 'undefined' ? isImageFile(item) : item.isImage,
				deleteable: typeof item.deleteable === 'undefined' ? true : item.deleteable
			}));

			this.lists = lists;
			this.isInCount = lists.length < maxCount;
		},

		getDetail(index) {
			return {
				name: this.name,
				index: index == null ? this.fileList.length : index
			};
		},

		startUpload() {
			const { maxCount, multiple, accept, lists, disabled, capture, compressed, sizeType, maxDuration, camera } = this;

			if (disabled) return;

			let that = this;

			chooseFile({
				accept,
				multiple,
				capture,
				compressed,
				maxDuration,
				sizeType,
				camera,
				maxCount,
				maxCount: maxCount - lists.length
			})
				.then(res => {
					let file = null;

					if (isVideo(res, accept)) {
						file = {
							path: res.tempFilePath,
							...res
						};
					} else {
						file = multiple ? res.tempFilePaths : res.tempFiles[0];
					}

					this.onBeforeRead(file);
				})
				.catch(error => {
					this.$emit('error', error);
				});
		},
		onBeforeRead(file) {
			const { beforeRead, useBeforeRead } = this;

			let res = true;

			if (typeof beforeRead === 'function') {
				res = beforeRead(file, this.getDetail());
			}

			if (useBeforeRead) {
				res = new Promise((resolve, reject) => {
					this.$emit('before-read', {
						file,
						...this.getDetail(),
						callback: ok => {
							ok ? resolve() : reject();
						}
					});
				});
			}

			if (!res) {
				return;
			}

			if (isPromise(res)) {
				res.then(data => {
					this.onAfterRead(data || file);
				});
			} else {
				this.onAfterRead(file);
			}
		},
		onAfterRead(file) {
			const { maxSize } = this;
			const oversize = Array.isArray(file) ? file.some(item => item.size > maxSize) : file.size > maxSize;

			if (oversize) {
				// 超出上传大小限制
				this.$emit('oversize', { file, ...this.getDetail() });
				return;
			}

			if (typeof this.afterRead === 'function') {
				this.afterRead(file, this.getDetail());
			}

			this.$emit('after-read', { file, ...this.getDetail() });
		},
		// 删除
		deleteItem(event) {
			const { index } = event.currentTarget.dataset;

			this.$emit('delete', {
				...this.getDetail(index),
				file: this.fileList[index]
			});
		},

		onPreviewImage(event) {
			if (!this.previewFullImage) return;

			const { index } = event.currentTarget.dataset;
			const { lists } = this;
			const item = lists[index];

			uni.previewImage({
				urls: lists.filter(item => item.isImage).map(item => item.url || item.path),
				current: item.url || item.path,
				fail() {
					uni.showToast({ title: '预览图片失败', icon: 'none' });
				}
			});
		},

		onClickPreview(event) {
			const { index } = event.currentTarget.dataset;
			const item = this.lists[index];

			this.$emit('click-preview', {
				...item,
				...this.getDetail(index)
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.van-uploader {
	position: relative;
	display: inline-block;

	&__wrapper {
		display: flex;
		flex-wrap: wrap;

		&--disabled {
			opacity: $uploader-disabled-opacity;
		}
	}

	&__input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden; // to clip file-upload-button
		cursor: pointer;
		opacity: 0;

		&-wrapper {
			position: relative;
		}

		&:disabled {
			cursor: not-allowed;
		}
	}

	&__upload {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: $uploader-size;
		height: $uploader-size;
		margin: 0 $padding-xs $padding-xs 0;
		background-color: $uploader-upload-background-color;
		border-radius: $uploader-upload-border-radius;

		&:active {
			background-color: $uploader-upload-active-color;
		}

		&-icon {
			color: $uploader-icon-color;
			font-size: $uploader-icon-size;
		}

		&-text {
			margin-top: $padding-xs;
			color: $uploader-text-color;
			font-size: $uploader-text-font-size;
		}
	}

	&__preview {
		position: relative;
		margin: 0 $padding-xs $padding-xs 0;
		cursor: pointer;

		&-image {
			display: block;
			width: $uploader-size;
			height: $uploader-size;
			overflow: hidden;
			border-radius: $uploader-upload-border-radius;
		}

		&-delete {
			position: absolute;
			top: -8px;
			right: -8px;
			width: 32rpx;
			height: 32rpx;
			display: inline-flex;
			color: $uploader-delete-color;
			font-size: $uploader-delete-icon-size;
			background-color: $uploader-delete-background-color;
			border-radius: 100%;
			text-align: center;
		}
	}

	&__mask {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: $white;
		background-color: $uploader-mask-background-color;
		border-radius: $uploader-upload-border-radius;
		background-color: rgba($color: #606266, $alpha: 0.7);

		&-icon {
			font-size: $uploader-mask-icon-size;
		}

		&-message {
			margin-top: 6px;
			padding: 0 $padding-base;
			font-size: $uploader-mask-message-font-size;
			line-height: $uploader-mask-message-line-height;
		}
	}

	&__loading {
		width: $uploader-loading-icon-size;
		height: $uploader-loading-icon-size;
		color: $uploader-loading-icon-color;
	}

	&__file {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: $uploader-size;
		height: $uploader-size;
		background-color: $uploader-file-background-color;
		border-radius: $uploader-upload-border-radius;

		&-icon {
			color: $uploader-file-icon-color;
			font-size: $uploader-file-icon-size;
		}

		&-name {
			box-sizing: border-box;
			width: 100%;
			margin-top: $uploader-file-name-margin-top;
			padding: $uploader-file-name-padding;
			color: $uploader-file-name-text-color;
			font-size: $uploader-file-name-font-size;
			text-align: center;
		}
	}
}
</style>
