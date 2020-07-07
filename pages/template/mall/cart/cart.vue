<template>
	<view>
		<view class="topbar">
			<view>
				购物车共
				<text class="tui-goods-num">2</text>
				件商品
			</view>
			<view>
				<text @click="editGoods">{{ isEdit ? '完成' : '编辑商品' }}</text>
			</view>
		</view>

		<view style="margin-top: 15rpx">
				<van-checkbox-group @change="onCheckboxGroupChange">
			<GoodsCell v-for="(item, index) in list" :key="item.goodsId" :goodsInfo="item"></GoodsCell>
				</van-checkbox-group>
		</view>

		<CartToolbar :isEdit="isEdit" @selectAll="onSelectAll"></CartToolbar>
	</view>
</template>

<script>
import GoodsCell from './components/GoodsCell.vue';

import CartToolbar from './components/cart_toolbar.vue';

export default {
	components: {
		GoodsCell,
		CartToolbar
	},
	data() {
		return {
			list: [
				{
					goodsId: 12,
					title: '商品标题1',
					image: 'https://img.yzcdn.cn/upload_files/2017/06/19/Fna08FxNZDN37i6oxWOCK9KnQ8IQ.png!small.webp',
					price: '750.68',
					sku: '440ml;10件;套装',
					selected: true
				},
				{
					goodsId: 13,
					title: '商品标题1',
					image: 'https://img.yzcdn.cn/upload_files/2017/06/19/Fna08FxNZDN37i6oxWOCK9KnQ8IQ.png!small.webp',
					price: '750.68',
					sku: '440ml;10件;套装',
					selected: true
				}
			],

			isEdit: false
		};
	},
	methods: {
		editGoods() {
			this.isEdit = !this.isEdit;
		},
		
		onCheckboxGroupChange(e){
			// console.log('onCheckboxGroupChange', e);
			// this.$emit('sku-selected-change', e);
		},
		// 全选事件
		onSelectAll(){
			
		}
	}
};
</script>

<style lang="scss">
.topbar {
	background-color: #ffffff;

	width: 100%;
	border-radius: 12rpx;
	overflow: hidden;
	padding: 24rpx 30rpx 24rpx 30rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #333;
	font-size: 24rpx;
}
</style>
