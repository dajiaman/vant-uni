<template>
	<view>
		<view class="tui-sku-row__title">{{ skuRow.k }}</view>
		<slot></slot> 
	</view>
</template>

<script>
	export default {
		props: {
			skuRow: null
		}
	}
</script>

<style scoped>
	.tui-sku-row__title {
		padding: 20rpx 0;
		color: #323233;
		font-size: 30rpx;
	}
</style>
