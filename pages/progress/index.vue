<template>
	<view class="van-doc-demo-section demo-progress">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title"></h2>
			<van-row style="padding: 30rpx">
				<van-progress percent="50" stroke-width="8"></van-progress></van-row>
		</view>
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">线条粗细</h2>
		
			<van-row style="padding: 30rpx">
				<van-progress percent="50" stroke-width="18" />
			</van-row>
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">置灰</h2>
		
			<van-row style="padding: 30rpx">
				<van-progress inactive percent="50" />
			</van-row>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">样式定制</h2>

			<van-row style="padding: 30rpx">
				<van-progress pivot-text="橙色" activeColor="#f2826a" percent="25" />

				<van-progress pivot-text="红色" activeColor="#ee0a24" percent="50" />

				<van-progress percent="75" 
				activeColor="linear-gradient(to right, #be99ff, #7232dd)" />
			</van-row>
		</view>
		
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">圆角</h2>
		
			<van-row style="padding: 30rpx">
				
				<van-circle-progress  activeColor="#f2826a" percent="25" >25%</van-circle-progress>
				
				
				<van-circle-progress  inactive activeColor="#f2826a" percent="50" >50%</van-circle-progress>

			</van-row>
		</view>
		
	</view>
</template>

<script>
export default {};
</script>

<style>
.van-doc-demo-section {
	box-sizing: border-box;
	min-height: calc(100vh - 56px);
	padding-bottom: 20px;
}

.demo-progress {
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

.demo-progress .van-progress {
	/* margin: 20px; */
}

.demo-progress .van-progress:first-of-type {
	margin-top: 5px;
}
</style>
