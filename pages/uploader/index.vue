<template>
	<view>
		<van-uploader :file-list="fileList" :maxCount="maxCount" @after-read="afterRead" :useBeforeRead="useBeforeRead" @before-read="beforeRead" @delete="onDelete"></van-uploader>

		<van-uploader :file-list="fileList" :maxCount="maxCount" @after-read="afterRead" :useBeforeRead="useBeforeRead" @before-read="beforeRead">
			<van-button icon="photo" type="primary">上传图片</van-button>
		</van-uploader>
	</view>
</template>

<script>
export default {
	data() {
		return {
			useBeforeRead: true,
			maxCount: 3,
			fileList: [
				{
					url: 'https://img.yzcdn.cn/vant/leaf.jpg',
					deletable: true,
					status: 'uploading',
					message: '上传中'
				},
				{
					url: 'https://img.yzcdn.cn/vant/tree.jpg',
					deletable: false,
					status: 'done',
					message: '上传完成'
				},
				{
					url: 'https://img.yzcdn.cn/vant/tree.jpg',
					deletable: false,
					status: 'failed',
					message: '上传失败'
				}
			]
		};
	},
	methods: {
		beforeRead(event) {
			console.log(event);
			const { file, callback } = event;
			callback(file.type === 'image/png');
		},
		afterRead(event) {
			const { file } = event;
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			uni.uploadFile({
				url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
				filePath: file.path,
				name: 'file',
				formData: { user: 'test' },
				success(res) {
					// 上传完成需要更新 fileList
					const { fileList = [] } = this.data;
					fileList.push({ ...file, url: res.data });

					this.fileList = fileList;
				}
			});
		},
		onDelete(event) {
			const { index } = event;

			const fileList = this.fileList.slice(0);
			fileList.splice(index, 1);

			this.fileList = fileList;
		}
	}
};
</script>

<style></style>
