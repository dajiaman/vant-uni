<template>
	<view>
		<goodsBanner :banner="banner" :bannerHeight="bannerHeight"></goodsBanner>
		
		<van-cell-group>
			<van-cell title="运费" value="剩余40">
				<view slot="title" class="van-cell__title">
				  <text class="van-cell-text">运费</text>
				  <text>￥5.00~15.00</text>
				</view>
			</van-cell>
			<van-cell title="优惠" isLink>
				<view slot="title" class="van-cell__title">
				  <text class="van-cell-text">优惠</text>
					<van-tag color="#ffe1e1" text-color="#ad0000">包邮</van-tag>
				  <text>满68元部分地区包邮</text>
				</view>
			</van-cell>
		</van-cell-group>
		
		
		<view class="goods-content-wrapper">
			<view class="goods-content-html">
			<wxParse :content="content"></wxParse>
		</view>
		</view>

		<van-goods-action>
		  <van-goods-action-icon icon="chat-o" text="客服" dot />
		  <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
		  <van-goods-action-icon icon="shop-o" text="店铺" info="12" />
		  <van-goods-action-button type="warning" text="加入购物车" @click="add2Cart"/>
		  <van-goods-action-button type="danger" text="立即购买" @click="quickBuy"/>
		</van-goods-action>
		
		
		<van-sku
			:sku="sku"
			v-model="skuShow"
			:goods="goods"
			:goodsId="goodsId"
			:quota="0"
			:quota-used="0"
			:stockThreshold="11"
			:resetStepperOnHide="true"
			:resetSelectedSkuOnHide="true"
			@buy-clicked="onBuyClicked"
			@sku-selected="onSkuSelected"
			@add-cart="onAddCartClicked"
			@stepper-change="onStepperChange"
		></van-sku>
		
	</view> 
</template>

<script>
import goodsBanner from './components/goodsBanner.vue';

import wxParse from '@/components/uni/uParse/src/wxParse.vue'

const skuData = require('@/static/sku.js');


export default {
	components: {
		goodsBanner,
		wxParse
	},

	data() {
		return {
			banner: [
				'https://www.thorui.cn/img/product/11.jpg',
				'https://www.thorui.cn/img/product/2.png',
				'https://www.thorui.cn/img/product/33.jpg',
				'https://www.thorui.cn/img/product/4.png',
				'https://www.thorui.cn/img/product/55.jpg',
				'https://www.thorui.cn/img/product/6.png',
				'https://www.thorui.cn/img/product/7.jpg',
				'https://www.thorui.cn/img/product/8.jpg'
			],

			bannerHeight: 0,
			
			content: '<div>富文本</div><p><img data-origin-width="640" data-origin-height="640" src="https://img.yzcdn.cn/upload_files/2017/06/19/Fna08FxNZDN37i6oxWOCK9KnQ8IQ.png!730x0.jpg"></p>',
			

			skuShow: false,
			
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
				picture: 'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg',
				
				goodsId: 1
				
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

	onLoad(options) {
		
		this.goodsId = options.goodsId;
		
		
		let obj = {};
		// #ifdef MP-WEIXIN
		obj = wx.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-BAIDU
		obj = swan.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-ALIPAY
		my.hideAddToDesktopMenu();
		// #endif

		setTimeout(() => {
			uni.getSystemInfo({
				success: res => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
					this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;

					this.bannerHeight = res.windowWidth;
				}
			});
		}, 0);
	},

	methods: {
		onClickIcon() {
			uni.showToast({
				title: "点击"
			});
		},
		onClickButton() {
			uni.showToast({
				title: "点击"
			});
		},
		// 加入购物车
		add2Cart(){
			this.skuShow = true;
		},
		// 立即购买
		quickBuy(){
			this.skuShow = true;
		},
		
		
		 // sku回调事件 /
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
		},
		
		onSkuSelected(event){
			console.log(event);
		}
		
		
	}
};
</script>

<style lang="scss">
	.goods-content-wrapper{
		margin-top: 30rpx;
		margin-bottom: 150rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		
		.goods-content-html{
			width: 100%;
		}
	}
</style>
