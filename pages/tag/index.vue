<template>
	<view class="van-doc-demo-section demo-tag">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基础用法</h2>
			<van-tag>标签</van-tag>
			<van-tag type="primary">标签</van-tag>
			<van-tag type="success">标签</van-tag>
			<van-tag type="danger">标签</van-tag>
			<van-tag type="warning">标签</van-tag>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">空心样式</h2>
			<van-tag plain>标签</van-tag>
			<van-tag plain type="primary">标签</van-tag>
			<van-tag plain type="success">标签</van-tag>
			<van-tag plain type="danger">标签</van-tag>
			<van-tag plain type="warning">标签</van-tag>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">圆角</h2>

			<van-tag round>标签</van-tag>
			<van-tag round type="primary">标签</van-tag>
			<van-tag round type="success">标签</van-tag>
			<van-tag round type="danger">标签</van-tag>
			<van-tag round type="warning">标签</van-tag>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">标记样式</h2>
			<van-tag mark>标签</van-tag>
			<van-tag mark type="primary">标签</van-tag>
			<van-tag mark type="success">标签</van-tag>
			<van-tag mark type="danger">标签</van-tag>
			<van-tag mark type="warning">标签</van-tag>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义样式</h2>
			<van-tag color="#f2826a">标签</van-tag>
			<van-tag color="#f2826a" plain>标签</van-tag>
			<van-tag color="#7232dd">标签</van-tag>
			<van-tag color="#7232dd" plain>标签</van-tag>
			<van-tag color="#ffe1e1" text-color="#ad0000">标签</van-tag>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">标签大小</h2>
			<van-tag type="danger">标签</van-tag>
			<van-tag type="danger" size="medium">标签</van-tag>
			<van-tag type="danger" size="large">标签</van-tag>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">可关闭</h2>

			<van-tag closeable size="medium" type="primary" id="primary" @close="onClose">标签</van-tag>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		onClose(e) {
			console.log(e);
		}
	}
};
</script>

<style>
.van-doc-demo-section {
	box-sizing: border-box;
	min-height: calc(100vh - 56px);
	padding-bottom: 20px;
}

.demo-tag {
	background-color: #fff;
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
.demo-tag .van-tag + .van-tag {
	margin-left: 8px;
}

.demo-tag .van-tag:first-of-type {
	margin-left: 16px;
}
</style>
