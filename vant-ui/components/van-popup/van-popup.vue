<template>
	<view v-if="visibleSync" :style="[customStyle]" :class="{'u-drawer-visible': showDrawer }" class="u-drawer">
		<van-overlay :closeOnClickOverlay="closeOnClickOverlay" :show="showDrawer && overlay" @click="maskClick"></van-overlay>
		<view
			class="u-drawer-content"
			@tap="modeCenterClose(position)"
			:class="[
				safeAreaInsetBottom ? 'safe-area-inset-bottom' : '',
				'u-drawer-' + position,
				showDrawer ? 'u-drawer-content-visible' : '',
				zoom && position == 'center' ? 'u-animation-zoom' : ''
			]"
			@touchmove.stop.prevent
			@tap.stop.prevent
			:style="[style]"
		>
			<view class="u-mode-center-box" @tap.stop.prevent @touchmove.stop.prevent v-if="position == 'center'" :style="[centerStyle]">
				<u-icon
					@click="close"
					v-if="closeable"
					class="u-close"
					:class="['u-close--' + closeIconPos]"
					:name="closeIcon"
					:color="closeIconColor"
					:size="closeIconSize"
				></u-icon>
				<scroll-view class="u-drawer__scroll-view" scroll-y="true">
					<slot />
				</scroll-view>
			</view>
			<scroll-view class="u-drawer__scroll-view" scroll-y="true" v-else>
				<slot />
			</scroll-view>
			<view class="u-close" :class="['u-close--' + closeIconPosition]">
				<van-icon
					v-if="position != 'center' && closeable"
					@click="close"
					:name="closeIcon"
					:color="closeIconColor"
					:size="closeIconSize"
				></van-icon>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * popup 弹窗
 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义
 * @tutorial https://www.uviewui.com/components/popup.html
 * @property {String} mode 弹出方向（默认left）
 * @property {Boolean} mask 是否显示遮罩（默认true）
 * @property {Stringr | Number} length mode=left | 见官网说明（默认auto）
 * @property {Boolean} zoom 是否开启缩放动画，只在mode为center时有效（默认true）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @property {Boolean} mask-close-able 点击遮罩是否可以关闭弹出层（默认true）
 * @property {Object} custom-style 用户自定义样式
 * @property {Numberr | String} border-radius 弹窗圆角值（默认0）
 * @property {Numberr | String} z-index 弹出内容的z-index值（默认1075）
 * @property {Boolean} closeable 是否显示关闭图标（默认false）
 * @property {String} close-icon 关闭图标的名称，只能uView的内置图标
 * @property {String} close-icon-pos 自定义关闭图标位置（默认top-right）
 * @property {String} close-icon-color 关闭图标的颜色（默认#909399）
 * @property {Number | String} close-icon-size 关闭图标的大小，单位rpx（默认30）
 * @event {Function} open 弹出层打开
 * @event {Function} close 弹出层收起
 * @example <u-popup v-model="show"><view>出淤泥而不染，濯清涟而不妖</view></u-popup>
 */
export default {
	name: 'van-popup',
	props: {
		/**
		 * 显示状态
		 */
		show: {
			type: Boolean,
			default: false
		},
		/**
		 * 弹出方向，left|right|top|bottom|center
		 */
		position: {
			type: String,
			default: 'left'
		},
		/**
		 * 是否显示遮罩
		 */
		overlay: {
			type: Boolean,
			default: true
		},
		// 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"
		// 或者百分比"50%"，表示由内容撑开高度或者宽度
		length: {
			type: [Number, String],
			default: 'auto'
		},
		// 是否开启缩放动画，只在mode=center时有效
		zoom: {
			type: Boolean,
			default: true
		},
		// 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
		safeAreaInsetBottom: {
			type: Boolean,
			default: false
		},
		// 是否可以通过点击遮罩进行关闭
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		},
		// 用户自定义样式
		customStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		value: {
			type: Boolean,
			default: false
		},
		// 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
		// 对v-model双向绑定多层调用造成报错不能修改props值的问题
		popup: {
			type: Boolean,
			default: true
		},
		round: {
			type: Boolean,
			default: false
		},
		// 显示显示弹窗的圆角，单位rpx
		borderRadius: {
			type: [Number, String],
			default: 40
		},
		zIndex: {
			type: [Number, String],
			default: ''
		},
		// 是否显示关闭图标
		closeable: {
			type: Boolean,
			default: false
		},
		// 关闭图标的名称，只能uView的内置图标
		closeIcon: {
			type: String,
			default: 'cross'
		},
		// 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
		closeIconPosition: {
			type: String,
			default: 'top-right'
		},
		// 关闭图标的颜色
		closeIconColor: {
			type: String,
			default: '#909399'
		},
		// 关闭图标的大小，单位rpx
		closeIconSize: {
			type: [String, Number],
			default: '30'
		},
		// 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
		// 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
		width: {
			type: String,
			default: ''
		},
		// 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
		// 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
		height: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			visibleSync: false,
			showDrawer: false,
			timer: null,
			style1: {},

		};
	},
	computed: {
		// 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
		style() {
			let style = {};
			// 如果是左边或者上边弹出时，需要给translate设置为负值，用于隐藏
			if (this.position == 'left' || this.position == 'right') {
				style = {
					width: this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length),
					height: '100%',
					transform: `translate3D(${this.position == 'left' ? '-100%' : '100%'},0px,0px)`
				};
			} else if (this.position == 'top' || this.position == 'bottom') {
				style = {
					width: '100%',
					height: this.height ? this.getUnitValue(this.height) : this.getUnitValue(this.length),
					transform: `translate3D(0px,${this.position == 'top' ? '-100%' : '100%'},0px)`
				};
			}
			style.zIndex = this.zIndex ? this.zIndex : this.$van.zIndex.popup;
			// 如果用户设置了borderRadius值，添加弹窗的圆角
			if (this.round) {
				switch (this.position) {
					case 'left':
						style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`;
						break;
					case 'top':
						style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`;
						break;
					case 'right':
						style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`;
						break;
					case 'bottom':
						style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`;
						break;
					default:
				}
				// 不加可能圆角无效
				style.overflow = 'hidden';
			}
			return style;
		},
		// 中部弹窗的特有样式
		centerStyle() {
			let style = {};
			style.width = this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length);
			// 中部弹出的模式，如果没有设置高度，就用auto值，由内容撑开高度
			style.height = this.height ? this.getUnitValue(this.height) : 'auto';
			style.zIndex = this.zIndex ? this.zIndex : this.$van.zIndex.popup;
			if (this.borderRadius) {
				style.borderRadius = `${this.borderRadius}rpx`;
				// 不加可能圆角无效
				style.overflow = 'hidden';
			}
			return style;
		},
	},
	watch: {
		value(val) {
			if (val) {
				this.open();
			} else {
				this.close();
			}
		}
	},
	methods: {
		// 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
		getUnitValue(val) {
			if(/(%|px|rpx|auto)$/.test(val)) return val;
			else return val + 'rpx'
		},
		// 遮罩被点击
		maskClick() {
			console.log('mask click')
			if(this.closeOnClickOverlay){
				this.close();
			}
		},
		close() {
			this.change('visibleSync', 'showDrawer', false);
		},
		// 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
		// 让其只在mode=center时起作用
		modeCenterClose(position) {
			if (position != 'center' || !this.closeOnClickOverlay) return;
			this.close();
		},
		open() {
			this.change('visibleSync', 'showDrawer', true);
		},
		// 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
		// 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
		change(param1, param2, status) {
			// 如果this.popup为false，意味着为picker，actionsheet等组件调用了popup组件
			if (this.popup == true) this.$emit('input', status);
			this[param1] = status;
			if(status) {
				// #ifdef H5 || MP
				this.timer = setTimeout(() => {
					this[param2] = status;
					this.$emit(status ? 'open' : 'close');
				}, 50);
				// #endif
				// #ifndef H5 || MP
				this.$nextTick(() => {
					this[param2] = status;
					this.$emit(status ? 'open' : 'close');
				})
				// #endif
			} else {
				this.timer = setTimeout(() => {
					this[param2] = status;
					this.$emit(status ? 'open' : 'close');
				}, 300);
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";
.u-drawer {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	z-index: 999;
}
.u-drawer-content {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	position: absolute;
	z-index: 1003;
	transition: all 0.3s linear;
}
.u-drawer__scroll-view {
	width: 100%;
	height: 100%;
}
.u-drawer-left {
	top: 0;
	bottom: 0;
	left: 0;
	background-color: #ffffff;
}
.u-drawer-right {
	right: 0;
	top: 0;
	bottom: 0;
	background-color: #ffffff;
}
.u-drawer-top {
	top: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
}
.u-drawer-bottom {
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
}
.u-drawer-center {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	justify-content: center;
	align-items: center;
	opacity: 0;
	z-index: 99999;
}
.u-mode-center-box {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	position: relative;
	background-color: #ffffff;
}
.u-drawer-content-visible.u-drawer-center {
	transform: scale(1);
	opacity: 1;
}
.u-animation-zoom {
	transform: scale(1.15);
}
.u-drawer-content-visible {
	transform: translate3D(0px, 0px, 0px) !important;
}
.u-close {
	position: absolute;
	z-index: 3;
}
.u-close--top-left {
	top: 30rpx;
	left: 30rpx;
}
.u-close--top-right {
	top: 30rpx;
	right: 30rpx;
}
.u-close--bottom-left {
	bottom: 30rpx;
	left: 30rpx;
}
.u-close--bottom-right {
	right: 30rpx;
	bottom: 30rpx;
}
</style>