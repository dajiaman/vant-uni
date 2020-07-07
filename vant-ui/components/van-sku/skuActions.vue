<template>
	<view class="van-sku-actions">
		<van-button class="van-button " type="warning" round @tap="createEmitter('sku:addCart')">加入购物车</van-button>

		<van-button class="van-button"  round  type="danger" @tap="createEmitter('sku:buy')">立即购买</van-button>
	</view>
</template>

<script>
export default {
	props: {
		// skuEventBus: null
	},
	methods: {
		createEmitter(name) {
			uni.$emit(name);
		}
	}
};
</script>

<style lang="scss" scoped>
.van-sku-actions {
	display: flex;
	padding: 8px 16px;

	.van-button {
		display: inline-flex;
		flex:1;
	}

	.van-button--warning {
		background: -webkit-linear-gradient(left, #ffd01e, #ff8917);
		background: linear-gradient(to right, #ffd01e, #ff8917);
	}

	.van-button--danger {
		background: -webkit-linear-gradient(left, #ff6034, #ee0a24);
		background: linear-gradient(to right, #ff6034, #ee0a24);
	}
}
</style>
