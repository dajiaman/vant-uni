<template>
	<view class="van-doc-demo-section demo-action-sheet">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基础用法</h2>

			<van-switch v-model="checked" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">禁用状态</h2>

			<van-switch v-model="checked" disabled />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">加载状态</h2>
			<van-switch v-model="checked" loading />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义大小</h2>
			<van-switch v-model="checked" size="24rpx" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义颜色</h2>
			<van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">异步控制</h2>
			<van-switch :value="checked" @input="onInput" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checked: true
		};
	},
	methods: {
		onInput(checked) {
			console.log(checked);
			// this.checked = checked;
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
