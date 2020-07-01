<template>
	<view class="van-doc-demo-section demo-col">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基本用法</h2>

			<van-empty description="描述文字" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">图片类型</h2>

			<!-- 通用错误 -->
			<van-empty image="error" description="描述文字" />
			<!-- 网络错误 -->
			<van-empty image="network" description="描述文字" />
			<!-- 搜索提示 -->
			<van-empty image="search" description="描述文字" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义图片</h2>

			<van-empty class="custom-image" image="https://img.yzcdn.cn/vant/custom-empty-image.png" description="自定义" />
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">底部内容</h2>
		
		<van-empty description="描述文字">
		  <van-button round type="danger" class="bottom-button">
		    按钮
		  </van-button>
		</van-empty>
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


.custom-image .van-empty__image {
	width: 90px;
	height: 90px;
}

 .bottom-button {
    width: 160px;
    height: 40px;
  }
</style>
