<template>
	<view class="goods-item">
		
		<view class="goods-img-wrapper">
			<image :src="goodsInfo.image" class="goods-image"></image>
			
		</view>
		
		<view class="goods-content">
			<view class="goods-title">{{ goodsInfo.title }}</view>
			
			<view class="price-box">
				<view class="goods-price">
					<text class="price-unit">¥</text>
					{{ goodsInfo.price }}
				</view>
				
				<van-icon name="add-o" color="red" size="44rpx" @click="addCart"></van-icon>
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		goodsInfo: {
			type: Object
		}
	},
	methods: {
		addCart(){
			console.log('add-cart');
			this.$emit('add-cart', this.goodsInfo.goodsId, this.goodsInfo);
		}
	}
};
</script>

<style lang="scss">
.goods-item {
	background-color: #ffffff;
	padding: 20rpx 0;
	display: flex;
	flex-direction: row;

	.goods-img-wrapper {
		width: 200rpx;
		height: 200rpx;
		background-color: #F2F3F5;
		margin-left: 20rpx;
		position: relative;

		.goods-image {
			width: 100%;
			height: 100%;
		}
	}
	
	
	.goods-content{
		flex: 1;
		margin-left: 20rpx;
		margin-right: 20rpx;
		
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;
		
		.goods-title{
			white-space: normal;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			font-size: 32rpx;
			color: #333;
		}
		
		.price-box {
			width: 100%;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: end;
			-webkit-align-items: flex-end;
			align-items: flex-end;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			justify-content: space-between;
		
			.goods-price {
				font-size: 34rpx;
				font-weight: 500;
				color: #e41f19;
		
				.price-unit {
					font-size: 26rpx;
					margin-right: 2rpx;
				}
			}
		}
		
		
	}
	
}
</style>
