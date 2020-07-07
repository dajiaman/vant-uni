<template>
	<view class="van-sidebar-item" @click="onClick" :class="[select ? 'van-sidebar-item--select' : '', disabled ? 'van-sidebar-item--disabled' : '']">
		<view class="van-sidebar-item__text">{{ title }}
			<van-info 
			:dot="dot"
			:info="badge"
			class="van-sidebar-item--info"
			></van-info>
		</view>
	</view>
</template>

<script>
import { ChildrenMixin } from '../mixins/relation';
export default {
	props: {
		title: String,
		dot: Boolean,
		info: [Number, String],
		badge: [Number, String],
		disabled: Boolean
	},
	mixins: [ChildrenMixin('vanSidebar')],
	computed: {
		select() {
			return this.index === +this.parent.activeKey;
		}
	},
	methods: {
		onClick() {
			if (this.disabled) {
				return;
			}

			this.$emit('click', this.index);
			this.parent.$emit('input', this.index);
			this.parent.setIndex(this.index);
		}
	}
};
</script>

<style lang="scss">
.van-sidebar-item {
	position: relative;
	display: block;
	box-sizing: border-box;
	padding: $sidebar-padding;
	overflow: hidden;
	color: $sidebar-text-color;
	font-size: $sidebar-font-size;
	line-height: $sidebar-line-height;
	word-wrap: break-word;
	background-color: $sidebar-background-color;
	cursor: pointer;
	user-select: none;

	&:active {
		background-color: $sidebar-active-color;
	}

	&__text {
		position: relative;
		display: inline-block;
	}

	&:not(:last-child)::after {
		border-bottom-width: 1px;
	}

	&--select {
		color: $sidebar-selected-text-color;
		font-weight: $sidebar-selected-font-weight;

		&,
		&:active {
			background-color: $sidebar-selected-background-color;
		}

		&::before {
			position: absolute;
			top: 50%;
			left: 0;
			width: $sidebar-selected-border-width;
			height: $sidebar-selected-border-height;
			background-color: $sidebar-selected-border-color;
			transform: translateY(-50%);
			content: '';
		}
	}

	&--disabled {
		color: $sidebar-disabled-text-color;
		cursor: not-allowed;

		&:active {
			background-color: $sidebar-background-color;
		}
	}
}
</style>
