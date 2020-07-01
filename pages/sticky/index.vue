<template>
	<view class="container">
		<view class="tui-title">基本用法</view>

		<van-sticky :scrollTop="scrollTop" stickyHeight="80rpx">
			<template v-slot:header>
				<view class="tui-tag">基本用法</view>
			</template>
		</van-sticky>

		<view class="tui-title">吸顶距离</view>
		<van-sticky :scrollTop="scrollTop" :stickyTop="stickyTop" stickyHeight="80rpx">
			<template v-slot:header>
				<view class="tui-center"><view class="tui-tag tui-green">吸顶距离</view></view>
			</template>
		</van-sticky>

		<view class="tui-title">指定容器</view>
		<van-sticky :scrollTop="scrollTop" stickyHeight="80rpx" container>
			<template v-slot:header>
				<view class="tui-right"><view class="tui-tag tui-danger">指定容器</view></view>
			</template>
			<template v-slot:content>
				<view class="tui-box">容器内容</view>
			</template>
		</van-sticky>
		<view style="height: 800px;">
			
			<van-button @click="goTo('/pages/sticky/index2')">例子2</van-button>
			<van-button @click="goTo('/pages/sticky/wxs')">wxs</van-button>
			<van-button @click="goTo('/pages/sticky/async')">async</van-button>
			
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0,
			stickyTop: uni.upx2px(80)
		};
	},
	onLoad() {
		// #ifdef H5
		this.stickyTop += 44;
		// #endif
	},
	methods: {
		goTo(url){
			this.$van.route(url)
		}
	},
	//页面滚动执行方式
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	}
};
</script>

<style>
.tui-title {
	padding: 50rpx 30rpx 30rpx;
	color: #2c405a;
}
.tui-tag {
	width: 200rpx;
	height: 80rpx;
	margin-left: 30rpx;
	background-color: #5677fc;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6rpx;
}
.tui-green {
	background-color: #19be6b !important;
}
.tui-danger {
	background-color: #eb0909 !important;
}
.tui-center {
	display: flex;
	justify-content: center;
}
.tui-right {
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-end;
}
.tui-box {
	width: 100%;
	height: 300rpx;
	padding: 30rpx;
	box-sizing: border-box;
	background-color: #fff;
}
</style>
