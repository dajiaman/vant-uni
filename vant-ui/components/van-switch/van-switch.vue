<template>
	<view class="van-switch" 
		:class="[checked ? 'van-switch--on' : '', 
		loading ? 'van-switch--loading' : '',
		disabled ? 'van-switch--disabled': '',
		]" :style="style" @click.stop="onClick">
		<view class="van-switch__node"></view>
	</view>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},

		loading: {
			type: Boolean,
			default: false
		},

		disabled: {
			type: Boolean,
			default: false
		},
		// 开关尺寸，默认单位为px
		size: {
			type: [Number, String],
			default: '48rpx'
		},
		//打开时的背景色
		activeColor: {
			type: String,
			default: '#1989fa'
		},

		//关闭时的背景色
		inactiveColor: {
			type: String,
			default: 'white'
		},

		activeValue: {
			type: Boolean,
			default: true
		},

		inactiveValue: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		checked() {
			return this.value === this.activeValue;
		},

		style() {
			return {
				fontSize: this.size,
				backgroundColor: this.checked ? this.activeColor : this.inactiveColor
			};
		}
	},
	methods: {
		onClick(event) {
			this.$emit('click', event);

			if (!this.disabled && !this.loading) {
				const newValue = this.checked ? this.inactiveValue : this.activeValue;
				this.$emit('input', newValue);
				this.$emit('change', newValue);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.van-switch {
	position: relative;
	display: inline-block;
	box-sizing: content-box;
	width: $switch-width;
	height: $switch-height;
	font-size: $switch-size;
	background-color: $switch-background-color;
	border: $switch-border;
	border-radius: $switch-node-size;
	cursor: pointer;
	transition: background-color $switch-transition-duration;

	&__node {
		position: absolute;
		top: 0;
		left: 0;
		z-index: $switch-node-z-index;
		width: $switch-node-size;
		height: $switch-node-size;
		background-color: $switch-node-background-color;
		border-radius: 100%;
		box-shadow: $switch-node-box-shadow;
		transition: transform $switch-transition-duration cubic-bezier(0.3, 1.05, 0.4, 1.05);
	}

	&__loading {
		top: 25%;
		left: 25%;
		width: 50%;
		height: 50%;
		line-height: 1;
	}

	&--on {
		background-color: $switch-on-background-color;

		.van-switch__node {
			transform: translateX($switch-width - $switch-node-size);
		}

		.van-switch__loading {
			color: $switch-on-background-color;
		}
	}

	&--disabled {
		cursor: not-allowed;
		opacity: $switch-disabled-opacity;
	}

	&--loading {
		cursor: default;
	}
}
</style>
