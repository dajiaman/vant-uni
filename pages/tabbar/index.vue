<template>
	<view class="van-doc-demo-section demo-tabbar">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基本用法</h2>

			<van-tabbar v-model="active" 
			active-color="#07c160" inactive-color="#000" :zIndex="2" :list="list"
			:safe-area-inset-bottom="true"
			@click="onClick"
			>
				<!-- 		  <van-tabbar-item icon="home-o" active="true">标签</van-tabbar-item>
		  <van-tabbar-item icon="search">标签</van-tabbar-item>
		  <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
		  <van-tabbar-item icon="setting-o">标签</van-tabbar-item> -->
			</van-tabbar>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			active: 1,

			fixed: false,

			list: [
				{
					dot: false,
					icon: 'home-o',
					badge: '',
					text: '标签'
				},
				{
					dot: false,
					icon: 'search',
					badge: '',
					text: '标签'
				},
				{
					dot: false,
					icon: 'friends-o',
					badge: '99',
					text: '标签'
				},
				{
					dot: false,
					icon: 'setting-o',
					badge: '55',
					text: '标签'
				}
			]
		};
	},
	methods: {
		onClick(index){
		 this.active = index;
		}
	}
};
</script>

<style>
page {
	background-color: #f7f8fa;
}

.van-doc-demo-section {
	box-sizing: border-box;
	min-height: calc(100vh - 56px);
	padding-bottom: 20px;
}

.demo-col {
	background: #fff;
}

.demo-col .van-doc-demo-block {
	padding: 0 16px;
}

.van-doc-demo-block__title {
	margin: 0;
	padding: 32px 16px 16px;
	color: rgba(69, 90, 100, 0.6);
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
}

.demo-col .van-doc-demo-block__title {
	padding-left: 0;
}

.van-doc-demo-block:first-of-type .van-doc-demo-block__title {
	padding-top: 20px;
}

.demo-tabbar .van-tabbar {
	position: relative;
	padding-bottom: 0;
}
</style>
