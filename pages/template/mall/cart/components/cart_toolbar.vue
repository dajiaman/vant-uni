<template>
	<!--tabbar-->
			<view class="fixbar">
				<view class="tui-checkAll">
					<van-checkbox-group @change="checkAll">
						<label class="tui-checkbox">
							<van-checkbox v-model="select" @change="checkAll" color="#fff">全选</van-checkbox> 
						</label>
					</van-checkbox-group>
					<view class="tui-total-price" v-if="!isEdit">合计:<text class="tui-bold">￥{{totalPrice}}</text> </view>
				</view>
				<view>
					
					<van-button width="200rpx" height="70rpx"  type="danger" round v-if="!isEdit" @click="btnPay">去结算({{ buyNum }})</van-button>
					<van-button width="200rpx" height="70rpx" round v-else @click="selectDelete">删除</van-button>
				</view>
			</view>
</template>

<script>
	export default {
		props: {
			isAllSelect: {
				type: Boolean,
				default: false
			},
			totalPrice: String,
			isEdit: Boolean,
			
			buyNum: Number
		},
		data() {
			return {
				select: this.isAllSelect
			}
		},
		methods: {
			checkAll(){
				// 全选事件
				console.log('select-all')
				this.$emit('select-all');
			},
			
			btnPay(){
				this.$emit('order-pay');
			},
			
			// 选中删除
			selectDelete() {
				
			}
		}
	}
</script>

<style lang="scss">
	.fixbar {
			width: 100%;
			height: 100rpx;
			background: #fff;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			z-index: 99999;
		}
		.tui-tabbar::before {
			content: '';
			width: 100%;
			border-top: 1rpx solid #d9d9d9;
			position: absolute;
			top: 0;
			left: 0;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
		.tui-checkAll {
			display: flex;
			align-items: center;
		}
		.tui-checkbox-pl {
			padding-left: 12rpx;
		}
		.tui-total-price {
			padding-left: 30rpx;
			font-size: 30rpx !important;
		}
		/*猜你喜欢*/
		.tui-youlike {
			padding-left: 12rpx
		}
		.tui-product-list {
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: wrap;
			box-sizing: border-box;
		}
		.tui-product-container {
			flex: 1;
			margin-right: 2%;
		}
		.tui-product-container:last-child {
			margin-right: 0;
		}
		.tui-pro-item {
			width: 100%;
			margin-bottom: 4%;
			background: #fff;
			box-sizing: border-box;
			border-radius: 12rpx;
			overflow: hidden;
		}
		.tui-pro-img {
			width: 100%;
			display: block;
		}
		.tui-pro-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 20rpx;
		}
		.tui-pro-tit {
			color: #2e2e2e;
			font-size: 26rpx;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.tui-pro-price {
			padding-top: 18rpx;
		}
		.tui-sale-price {
			font-size: 34rpx;
			font-weight: 500;
			color: #e41f19;
		}
		.tui-factory-price {
			font-size: 24rpx;
			color: #a0a0a0;
			text-decoration: line-through;
			padding-left: 12rpx;
		}
		.tui-pro-pay {
			padding-top: 10rpx;
			font-size: 24rpx;
			color: #656565;
		}
</style>
