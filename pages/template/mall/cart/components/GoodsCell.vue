<template>
		<van-swipe-cell :actions="actions" :closable="false" @click="handlerButton">
			<template v-slot:content>
				<view class="goods-item">
					<label class="select-wrap">
						<van-checkbox v-model="goodsInfo.selected"
						 :name="goodsInfo.goodsId"
						 @change="onCheckboxChange"></van-checkbox>
					</label>

					<image class="goods-img" :src="goodsInfo.image"></image>

					<view class="goods-content">
						<view class="goods-title">{{ goodsInfo.title }}</view>

						<view class="goods-model" @click="skuClick">
							<text class="model-text">{{ goodsInfo.sku }}</text>
							<van-icon name="arrow-down" size="24rpx"></van-icon>
						</view>

						<view class="price-box">
							<view class="goods-price">
								<text class="price-unit">¥</text>
								{{ goodsInfo.price }}
							</view>
							<van-stepper async-change @change="onStepperChange"></van-stepper>
						</view>
					</view>
				</view>
			</template>
		</van-swipe-cell>
</template>

<script>
export default {
	props: {
		goodsInfo: {
			type: Object
		},
		valid: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			actions: [
				{
					name: '收藏',
					width: 70,
					fontsize: 30,
					color: '#fff',
					background: '#C8C7CD'
				},
				{
					name: '删除',
					color: '#fff',
					fontsize: 30, //单位rpx
					width: 70, //单位px
					background: '#FD3B31'
				}
			]
		};
	},
	methods: {
		handlerButton(e) {
			let index = e.index;
			let item = e.item;

			if (index === 1) {
				// 删除
				this.$emit('sku-delete', this.goodsInfo.goodsId);
			}

			// uni.showToast('您点击了【' + menuTxt + '】按钮');
		},
		
		onCheckboxChange(){
			console.log('onCheckboxChange')
			this.$emit('sku-selected-change', this.goodsInfo.goodsId);
		},
		

		// sku点击
		skuClick() {
			console.log('skuClick')
			this.$emit('sku-title-click', this.goodsInfo.id, this.goodsInfo);
		},
		//步进器变化
		onStepperChange() {
			console.log('onStepperChange')
			this.$emit('sku-stepper-change', this.goodsInfo.goodsId, this.goodsInfo);
		}
	}
};
</script>

<style lang="scss">
.goods-item {
	background-color: #fff;
	display: flex;
	padding: 0 15px;
	box-sizing: border-box;
	margin: 20rpx 0;

	.select-wrap {
		min-width: 70rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.goods-img {
		width: 220rpx;
		height: 220rpx;
		border-radius: 12rpx;
		flex-shrink: 0;
		display: block;
	}

	.goods-content {
		width: 100%;
		padding-left: 20rpx;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: start;
		-webkit-align-items: flex-start;
		align-items: flex-start;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		box-sizing: border-box;
		overflow: hidden;

		.goods-title {
			white-space: normal;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			font-size: 26rpx;
			color: #333;
		}

		.goods-model {
			max-width: 100%;
			color: #333;
			background: #f2f2f2;
			border-radius: 40rpx;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 16rpx;
			box-sizing: border-box;
		}

		.model-text {
			transform-origin: 0 center;
			font-size: 26rpx;
			line-height: 32rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
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
</style>
