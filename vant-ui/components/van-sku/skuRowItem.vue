<template>
	<view class="tui-sku-row__item" @tap="onSelect" 
	:class="{ 
			'tui-sku-row__item--active': skuValue.id === selectedSku[skuKeyStr],
			'tui-sku-row__item--disabled': !chooseable
	}">
		<image :src="skuValue.imgUrl" class="tui-sku-row__item-img" 
		v-if="skuValue.imgUrl" ></image>
		
		<text class="tui-sku-row__item-name">{{ skuValue.name }}</text>
	</view>
</template>

<script>
import {isSkuChoosable} from './sku-helper.js'

export default {
	props: {
		skuValue: Object,
		skuKeyStr: String,
		selectedSku: Object,
		skuList: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		chooseable() {
			return isSkuChoosable(this.skuList, this.selectedSku, {
				key: this.skuKeyStr,
				valueId: this.skuValue.id,
			});
		}
	},
	methods: {
		onSelect() {
			if (this.chooseable) {
				uni.$emit('sku:select', {
					...this.skuValue,
					skuKeyStr: this.skuKeyStr
				});
			}
		},
		

	}
};
</script>

<style lang="scss" scoped>
.tui-sku-row__item {
	max-width: 100%;
	min-width: 200rpx;
	height: 64rpx;
	display: -webkit-inline-flex;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: #f7f7f7;
	padding: 0 26rpx;
	box-sizing: border-box;
	// border-radius: 32rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	font-size: 26rpx;
	position: relative;

	.tui-sku-row__item-img {
		z-index: 1;
		width: 48rpx;
		height: 48rpx;
		margin: 8rpx 0 8rpx 8rpx;
		object-fit: cover;
		border-radius: 4rpx;
	}

	.tui-sku-row__item-name {
		z-index: 1;
		padding: 8px;
	}
}

.tui-sku-row__item--active {
	background: #fcedea !important;
	color: #ee0a24;
}

.tui-sku-row__item--disabled {
    color: #c8c9cc;
    background: #f2f3f5;
    cursor: not-allowed;
}
</style>
