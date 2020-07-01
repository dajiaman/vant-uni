<template>
	<view class="van-doc-demo-section demo-col">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基本用法</h2>
			<van-row>
				<van-col span="8">span: 8</van-col>
				<van-col span="8">span: 8</van-col>
				<van-col span="8">span: 8</van-col>
			</van-row>
			
			<van-row>
			  <van-col span="4">span: 4</van-col>
			  <van-col span="10" offset="4">offset: 4, span: 10</van-col>
			</van-row>
			
			<van-row>
			  <van-col offset="12" span="12">offset: 12, span: 12</van-col>
			</van-row>
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">设置列元素间距</h2>
			
			<van-row gutter="20">
			  <van-col span="8">span: 8</van-col>
			  <van-col span="8">span: 8</van-col>
			  <van-col span="8">span: 8</van-col>
			</van-row>
			
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

.demo-col .van-col {
	margin-bottom: 10px;
	color: #fff;
	font-size: 13px;
	line-height: 30px;
	text-align: center;
	background-clip: content-box;
}

.demo-col .van-col:nth-child(odd) {
	background-color: #39a9ed;
}

.demo-col .van-col:nth-child(even) {
	background-color: #66c6f2;
}
</style>
