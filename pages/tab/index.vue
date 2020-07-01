<template>
	<view class="van-doc-demo-section demo-tab">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基础用法</h2>
			<van-tabs :list="list" :is-scroll="false" :current="current" @change="change">

			</van-tabs>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基础用法</h2>
			<van-tabs scrollable>
	
			</van-tabs>
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					list: [{
						name: '待收货'
					}, {
						name: '待付款'
					}, {
						name: '待评价'
					}],
					current: 0
				}
			},
			methods: {
				change(index) {
					this.current = index;
				}
			}
		}
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

.demo-tab {
	margin-bottom: 80vh;
}

.van-doc-demo-block__title {
	margin: 0;
	padding: 32px 16px 16px;
	color: rgba(69, 90, 100, 0.6);
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
}

.van-doc-demo-block:first-of-type .van-doc-demo-block__title {
	padding-top: 20px;
}
</style>
