<template>
	<view>
		<button @tap="test">点击</button>
		<van-sku
			:sku="sku"
			v-model="show"
			:goods="goods"
			:quota="0"
			:quota-used="0"
			:stockThreshold="11"
			:resetStepperOnHide="true"
			:resetSelectedSkuOnHide="true"
			@buy-clicked="onBuyClicked"
			@add-cart="onAddCartClicked"
			@stepper-change="onStepperChange"
		></van-sku>
	</view>
</template>

<script>

const skuData = require('@/static/sku.js');

export default {
	data() {
		return {
			show: false,

			initialSku: {
				// 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
				// 值：skuValueId（规格值 id） 
				s1: '2',
				s2: '3',
				// 初始选中数量
				selectedNum: 3,
				// 初始选中的商品属性
				// 键：属性id
				// 值：属性值id列表
				selectedProp: {
					123: [1222]
				}
			},

			goods: {
				picture: 'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg'
			},
			sku: skuData,

			resetStepperOnHide: true,
			resetSelectedSkuOnHide: true,

			properties: [
				// 商品属性
				{
					k_id: 123, // 属性id
					k: '加料', // 属性名
					is_multiple: true, // 是否可多选
					v: [
						{
							id: 1222, // 属性值id
							name: '珍珠', // 属性值名
							price: 1 // 属性值加价
						},
						{
							id: 1223,
							name: '椰果',
							price: 1
						}
					]
				}
			]
		};
	},

	methods: {
		test() {
			this.show = !this.show;
		},

		// stepper变化
		onStepperChange(number) {
			console.log(event);

			// 可以重新获取一下数据，校验库存
		},

		onBuyClicked(skuData) {
			uni.showToast({
				title: '点击购买'
			})
			console.log('立即购买', skuData);
		},

		onAddCartClicked() {
			uni.showToast({
				title: '加入购物车'
			})
			console.log('加入购物车');
		}
	}
};
</script>

<style></style>
