<template>
	<van-button class="van-goods-action-button" 
	square size="large"
	 :type="type" :icon="icon" :color="color" :loading="loading" 
	 :disabled="disabled" 
	 
	 :class="[
		 type ? 'van-goods-action-button--' + type : '',
		 isFirst ? 'van-goods-action-button--first' : '',
		 isLast ? 'van-goods-action-button--last' : ''
	 ]"
	 
	 @click="onClick">
		<slot></slot>
		<block v-if="!$slots['default']">{{ text }}</block>
	</van-button>
</template>

<script>
import { ChildrenMixin } from '../mixins/relation';

export default {
	mixins: [ChildrenMixin('vanGoodsAction')],
	props: {
		type: String,
		text: String,
		icon: String,
		color: String,
		loading: Boolean,
		disabled: Boolean
	},
	computed: {
		isFirst() {
			const prev = this.parent && this.parent.children[this.index - 1];
			return !prev || prev.$options.name !== this.$options.name;
		},

		isLast() {
			const next = this.parent && this.parent.children[this.index + 1];
			return !next || next.$options.name !== this.$options.name;
		}
	},
	methods: {
		onClick(event) {
			this.$emit('click', event);
		}
	}
};
</script>

<style lang="scss" scoped>
.van-goods-action-button {
	flex: 1;
	height: $goods-action-button-height;
	font-weight: $font-weight-bold;
	font-size: $font-size-md;
	border: none;

	&--first {
		margin-left: 10rpx;
		border-top-left-radius: $border-radius-max;
		border-bottom-left-radius: $border-radius-max;
	}

	&--last {
		margin-right: 10rpx;
		border-top-right-radius: $border-radius-max;
		border-bottom-right-radius: $border-radius-max;
	}

	&--warning {
		background: $goods-action-button-warning-color;
	}

	&--danger {
		background: $goods-action-button-danger-color;
	}
}
</style>
