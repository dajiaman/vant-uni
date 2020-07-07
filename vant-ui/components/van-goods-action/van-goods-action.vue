<template>
	<view class="van-goods-action" :class="[!safeAreaInsetBottom ? 'van-goods-action--unfit' : '']"><slot></slot></view>
</template>

<script>
import { ParentMixin } from '../mixins/relation';

export default {
	mixins: [ParentMixin('vanGoodsAction')],
	props: {
		safeAreaInsetBottom: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style lang="scss" scoped>
.van-goods-action {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	box-sizing: content-box;
	height: $goods-action-height;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	background-color: $goods-action-background-color;

	&--unfit {
		padding-bottom: 0;
	}
}
</style>
