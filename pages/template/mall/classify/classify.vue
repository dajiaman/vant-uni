<template>
	<view class="container">
		<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-into-view="scrollViewId"  :style="{ height: height + 'px', top: top + 'px' }">
			<van-sidebar :active-key="currentTab" @change="onTabChange"><van-sidebar-item :title="item" v-for="(item, index) in tabbar" :key="index" /></van-sidebar>
		</scroll-view>

		<scroll-view scroll-y class="right-box"  :style="{ height: height + 'px', top: top + 'px' }">
			<block v-for="(item, index) in list" :key="index"><goodsItem :goodsInfo="item" @addCart="onAddCart"></goodsItem></block>
		</scroll-view>
	</view>
</template>

<script>
import goodsItem from './components/goods_item.vue';

export default {
	components: {
		goodsItem
	},
	data() {
		let list = [];

		const goods = {
			goodsId: 2,
			title: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
			image: 'https://img.yzcdn.cn/upload_files/2017/06/19/Fna08FxNZDN37i6oxWOCK9KnQ8IQ.png!small.webp',
			price: '750.68',
			sku: '440ml;10件;套装',
			selected: true
		};

		for (let i = 0; i < 20; i++) {
			goods.goodsId = i;

			list.push(goods);
		}

		return {
			tabbar: [
				'推荐分类',
				'进口超市',
				'国际名牌',
				'奢侈品',
				'海囤全球',
				'男装',
				'女装',
				'男鞋',
				'女鞋',
				'钟表珠宝',
				'手机数码',
				'电脑办公',
				'家用电器',
				'玩具乐器',
				'运动户外',
				'宠物生活',
				'特产馆'
			],
			height: 0, //scroll-view高度
			top: 0,
			currentTab: 0, //预设当前项的值
			scrollViewId: 'id_0',

			list: list
		};
	},
	onLoad: function(options) {
		setTimeout(() => {
			uni.getSystemInfo({
				success: res => {
					let header = 0;
					let top = 0;
					//#ifdef H5
					top = 44;
					//#endif
					this.height = res.windowHeight - uni.upx2px(header);
					this.top = top + uni.upx2px(header);
				}
			});
		}, 50);
	},

	methods: {
		onTabChange(index) {
			this.currentTab = index;

			// 获取 商品数据
		},
		
		onAddCart(goodsId, goodsInfo){
			
		}
		
	}
};
</script>

<style lang="scss">

.container{
}

.tab-view {
	width: 170rpx;
	position: fixed;
	left: 0;
	z-index: 10;
}

.right-box {
	width: 100%;
	position: fixed;
	padding-left: 170rpx;
	box-sizing: border-box;
	left: 0;
}
</style>
