<template>
	<view class="goods-banner-swiper">
		<swiper :autoplay="true" :interval="5000" :duration="150" :circular="true" :style="{ height: bannerHeight + 'px' }" @change="bannerChange">
			<block v-for="(item, index) in banner" :key="index">
				<swiper-item :data-index="index" @tap.stop="previewImage"><image :src="item" class="banner-img" :style="{ height: bannerHeight + 'px' }" /></swiper-item>
			</block>
		</swiper>
		<view class="banner-tag">
			<van-tag>{{ bannerIndex + 1 }}/{{ banner.length }}</van-tag>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		banner: Array,
		bannerHeight: [String, Number]
	},
	data() {
		return {
			bannerIndex: 0
		};
	},
	methods: {
		bannerChange(e){
			this.bannerIndex = e.detail.current;
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-banner-swiper {
	position: relative;
}

.banner-img {
	width: 100%;
	display: block;
}

.banner-tag {
	position: absolute;
	right: 0;
	bottom: 30rpx;
}
</style>
