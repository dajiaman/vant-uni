<template>
	<view class="van-doc-demo-section demo-count-down">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基础用法</h2>
			<van-count-down :time="time" />
		</view>
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">分隔符</h2>
			<van-count-down :time="time" :showDays="false" separator="zh" />
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义样式</h2> 
			<van-count-down  :time="time" height="40" :show-border="true" bgColor="#000" 
			font-size="28" color="#fff" ></van-count-down>
		</view>
		
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			time: 30 * 60 * 60,
		};
	}
};
</script>

<style>
.van-doc-demo-section {
	box-sizing: border-box;
	min-height: calc(100vh - 56px);
	padding-bottom: 20px;
}

.demo-count-down {
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

.demo-count-down .van-count-down {
    margin-left: 16px;
}


.colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #ee0a24;
  }
</style>
