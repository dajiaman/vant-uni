<template>
	<view>
		<van-popup
			:zoom="zoom"
			position="center"
			:popup="false"
			:z-index="uZIndex"
			v-model="value"
			:length="width"
			:overlay="overlay"
			:maskCloseable="closeOnClickOverlay"
			:border-radius="borderRadius"
			@close="popupClose"
		>
			<view class="van-dialog">
				
				<view v-if="showTitle" class="van-dialog__header" :style="[titleStyle]">{{ title }}</view>

				<view class="van-dialog__content">
					
					<view :style="[contentStyle]" v-if="$slots.default"><slot /></view>
					
					<view v-else class="van-dialog__message" 
					:class="[
						title ? 'van-dialog__message--has-title' : '',
						'van-dialog__message--' + messageAlign
					]" 
					:style="[contentStyle]">{{ message }}</view>
				</view>

				<view class="van-hairline--top van-dialog__footer van-dialog__footer--buttons" 
				v-if="showCancelButton || showConfirmButton">
			

					<van-button v-if="showCancelButton" 
					size="large"
					class="van-dialog__cancel"
					@tap="cancel">{{ cancelText }}
					</van-button>
					
					
					<van-button v-if="showConfirmButton"
					size="large"
					class="van-dialog__confirm van-hairline--left"
					:open-type="confirmButtonOpenType"
					@tap="confirm">{{ confirmText }}
					</van-button>

					
					
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
/**
 * modal 模态框
 * @description 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作
 * @tutorial https://www.uviewui.com/components/modal.html
 * @property {Boolean} value 是否显示模态框
 * @property {String | Number} z-index 层级
 * @property {String} title 模态框标题（默认"提示"）
 * @property {String | Number} width 模态框宽度（默认600）
 * @property {String} content 模态框内容（默认"内容"）
 * @property {Boolean} show-title 是否显示标题（默认true）
 * @property {Boolean} async-close 是否异步关闭，只对确定按钮有效（默认false）
 * @property {Boolean} show-confirm-button 是否显示确认按钮（默认true）
 * @property {Boolean} show-cancel-button 是否显示取消按钮（默认false）
 * @property {Boolean} mask-close-able 是否允许点击遮罩关闭modal（默认false）
 * @property {String} confirm-text 确认按钮的文字内容（默认"确认"）
 * @property {String} cancel-text 取消按钮的文字内容（默认"取消"）
 * @property {String} cancel-color 取消按钮的颜色（默认"#606266"）
 * @property {String} confirm-color 确认按钮的文字内容（默认"#2979ff"）
 * @property {String | Number} border-radius 模态框圆角值，单位rpx（默认16）
 * @property {Object} title-style 自定义标题样式，对象形式
 * @property {Object} content-style 自定义内容样式，对象形式
 * @property {Object} cancel-style 自定义取消按钮样式，对象形式
 * @property {Object} confirm-style 自定义确认按钮样式，对象形式
 * @property {Boolean} zoom 是否开启缩放模式（默认true）
 * @event {Function} confirm 确认按钮被点击
 * @event {Function} cancel 取消按钮被点击
 * @example <u-modal :src="title" :content="content"></u-modal>
 */
export default {
	name: 'u-modal',
	props: {
		// 是否显示Modal
		value: {
			type: Boolean,
			default: false
		},
		overlay: {
			type: Boolean,
			default: true
		},
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		},
		// 层级z-index
		zIndex: {
			type: [Number, String],
			default: ''
		},
		// 标题
		title: {
			type: [String],
			default: '提示'
		},
		// 弹窗宽度，可以是数值(rpx)，百分比，auto等
		width: {
			type: [Number, String],
			default: 600
		},
		// 弹窗内容
		message: {
			type: String,
			default: '内容'
		},
		// 内容对齐方式，可选值为left right
		messageAlign: {
			type: String,
			default: 'center'
		},
		// 是否显示标题
		showTitle: {
			type: Boolean,
			default: true
		},
		// 是否显示确认按钮
		showConfirmButton: {
			type: Boolean,
			default: true
		},
		// 是否显示取消按钮
		showCancelButton: {
			type: Boolean,
			default: false
		},
		// 确认文案
		confirmText: {
			type: String,
			default: '确认'
		},
		// 取消文案
		cancelText: {
			type: String,
			default: '取消'
		},
		// 确认按钮颜色
		confirmColor: {
			type: String,
			default: '#2979ff'
		},
		// 取消文字颜色
		cancelColor: {
			type: String,
			default: '#606266'
		},
		// 圆角值
		borderRadius: {
			type: [Number, String],
			default: 16
		},
		// 标题的样式
		titleStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 内容的样式
		contentStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 取消按钮的样式
		cancelStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 确定按钮的样式
		confirmStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 是否开启缩放效果
		zoom: {
			type: Boolean,
			default: true
		},
		// 是否异步关闭，只对确定按钮有效
		asyncClose: {
			type: Boolean,
			default: false
		},
		// 确认按钮的微信开放能力，具体
		confirmButtonOpenType: {
			type: String
		}
	},
	data() {
		return {
			loading: false // 确认按钮是否正在加载中
		};
	},
	computed: {
		cancelBtnStyle() {
			return Object.assign({ color: this.cancelColor }, this.cancelStyle);
		},
		confirmBtnStyle() {
			return Object.assign({ color: this.confirmColor }, this.confirmStyle);
		},
		uZIndex() {
			return this.zIndex ? this.zIndex : this.$van.zIndex.popup;
		}
	},
	watch: {
		// 如果是异步关闭时，外部修改v-model的值为false时，重置内部的loading状态
		// 避免下次打开的时候，状态混乱
		value(n) {
			if (n === true) this.loading = false;
		}
	},
	methods: {
		confirm() {
			this.$emit('confirm');
			// 异步关闭
			if (this.asyncClose) {
				this.loading = true;
			} else {
				this.$emit('input', false);
			}
		},
		cancel() {
			this.$emit('cancel');
			this.$emit('input', false);
			// 目前popup弹窗关闭有一个延时操作，此处做一个延时
			// 避免确认按钮文字变成了"确定"字样，modal还没消失，造成视觉不好的效果
			setTimeout(() => {
				this.loading = false;
			}, 300);
		},
		// 点击遮罩关闭modal，设置v-model的值为false，否则无法第二次弹起modal
		popupClose() {
			this.$emit('input', false);
		},
		// 清除加载中的状态
		clearLoading() {
			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.van-dialog {
  position: fixed;
  top: 45%;
  left: 50%;
  width: $dialog-width;
  overflow: hidden;
  font-size: $dialog-font-size;
  background-color: $dialog-background-color;
  border-radius: $dialog-border-radius;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden; // avoid blurry text after scale animation
  transition: $dialog-transition;
  transition-property: transform, opacity;



  &__header {
    padding-top: $dialog-header-padding-top;
    font-weight:$dialog-header-font-weight;
    line-height: $dialog-header-line-height;
    text-align: center;

    &--isolated {
      padding: $dialog-header-isolated-padding;
    }
  }

  &__message {
    max-height: $dialog-message-max-height;
    padding: $dialog-message-padding;
    overflow-y: auto;
    font-size: $dialog-message-font-size;
    line-height: $dialog-message-line-height;

    // allow newline charactor
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
    -webkit-overflow-scrolling: touch;

    &--has-title {
      padding-top: $dialog-has-title-message-padding-top;
      color: $dialog-has-title-message-text-color;
    }

    &--left {
      text-align: left;
    }

    &--right {
      text-align: right;
    }
  }

  &__footer {
    overflow: hidden;
    user-select: none;

    &--buttons {
			
      display: flex;

      .van-button {
        flex: 1;
				border: 0;
      }
			
			.van-hairline--left{
				border-left: 1rpx solid #ebedf0;
			}
			
    }
  }

  &__confirm {
    &,
    &:active {
      color: $dialog-confirm-button-text-color;
    }
  }

  &-bounce-enter {
    transform: translate3d(-50%, -50%, 0) scale(0.7);
    opacity: 0;
  }

  &-bounce-leave-active {
    transform: translate3d(-50%, -50%, 0) scale(0.9);
    opacity: 0;
  }
}

.van-hairline--top{
	border-top: 1rpx solid #ebedf0;
}



</style>
