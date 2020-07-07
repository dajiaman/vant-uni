<template>
	<view
		class="van-overlay"
		:style="[maskStyle, zoomStyle]"
		@tap="onClick"
		@touchmove.stop.prevent
		:class="{
			'u-mask-zoom': zoom,
			'u-mask-show': show
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
export default {
	props: {
		show: Boolean,
		zIndex: [Number, String],
		// 遮罩的过渡时间，单位为ms
		duration: {
			type: [Number, String],
			default: 300
		},
		// 用户自定义样式
		customStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
		zoom: {
			type: Boolean,
			default: true
		},
		closeOnClickOverlay: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			zoomStyle: {
				transform: ''
			},
			scale: 'scale(1.2, 1.2)'
		};
	},
	watch: {
		show(n) {
			if (n && this.zoom) {
				// 当展示遮罩的时候，设置scale为1，达到缩小(原来为1.2)的效果
				this.zoomStyle.transform = 'scale(1, 1)';
			} else if (!n && this.zoom) {
				// 当隐藏遮罩的时候，设置scale为1.2，达到放大(因为显示遮罩时已重置为1)的效果
				this.zoomStyle.transform = this.scale;
			}
		}
	},
	computed: {
		maskStyle() {
			let style = {};

			style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
			if (this.show) style.zIndex = this.zIndex ? this.zIndex : this.$van.zIndex.mask;
			else style.zIndex = -1;
			style.transition = `all ${this.duration / 1000}s ease-in-out`;
			// 判断用户传递的对象是否为空，不为空就进行合并
			if (Object.keys(this.customStyle).length) style = { ...style, ...this.customStyle };
			return style;
		}
	},
	methods: {
		onClick() {
			if (!this.closeOnClickOverlay) return;
			console.log('overlay click');
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
.van-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0;
	transition: transform 0.3s;
}

.u-mask-show {
	opacity: 1;
}

.u-mask-zoom {
	transform: scale(1.2, 1.2);
}
</style>
