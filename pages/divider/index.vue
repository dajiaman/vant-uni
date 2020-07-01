<template>
	<view class="van-doc-demo-section demo-divider">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基础用法</h2>
			<van-divider />
		</view>
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">展示文字</h2>
			<van-divider>文字</van-divider>
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义样式</h2>
			<van-divider content-position="left">文字</van-divider>
			<van-divider content-position="right">文字</van-divider>
		</view>
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">虚线</h2>
					<van-divider dashed>文字</van-divider>
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">虚线</h2>
			<van-divider
			  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
			>
			  文字
			</van-divider>
		</view>
		

	
	
		
		
	</view>
	
</template>

<script>
</script>

<style>
	
	.van-doc-demo-section {
	    box-sizing: border-box;
	    min-height: calc(100vh - 56px);
	    padding-bottom: 20px;
	}
	.demo-divider {
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
</style>
