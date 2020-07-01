<template>
	<view class="van-doc-demo-section demo-loading">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">加载类型</h2>

			<van-loading />
			<van-loading type="spinner" />
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义大小</h2>
		
			<van-loading size="50rpx"/>
			<van-loading />
			<van-loading size="120rpx" />
		</view>
		
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义颜色</h2>
		
			<van-loading color="#1989fa" /> <van-loading type="spinner" color="#1989fa" />
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">加载文案</h2>
		
			<van-loading size="24px">加载中...</van-loading>
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">垂直排列</h2>
		
			<van-loading size="24px" vertical>加载中...</van-loading>
		</view>
		
		
	</view>
</template>

<script></script>

<style>
.van-doc-demo-section {
	box-sizing: border-box;
	min-height: calc(100vh - 56px);
	padding-bottom: 20px;
}

.demo-loading {
	background: #fff;
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

.demo-loading .van-loading {
	display: inline-block;
	margin: 5px 0 5px 20px;
}

.demo-loading .van-loading--vertical {
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: inline-flex;
}

</style>
