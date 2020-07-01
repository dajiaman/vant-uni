<template>
	<view class="van-doc-demo-section demo-grid">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基本用法</h2>
			
			<van-grid background="white">
				<van-grid-item icon="https://b.yzcdn.cn/vant/icon-demo-1126.png" text="文字" badge="1"/>
				<van-grid-item icon="photo-o" text="文字" dot/>
				<van-grid-item icon="photo-o" text="跳转" link-type="navigateTo" url="/pages/index/index" />
				<van-grid-item icon="photo-o" text="文字" />
				
				<van-grid-item icon="photo-o" text="文字" />
			</van-grid>
		</view>
		
		
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">正方形</h2>
			<van-grid background="white" square :columnNum="columnNum">
				<van-grid-item icon="https://b.yzcdn.cn/vant/icon-demo-1126.png" text="文字" badge="99+"/>
				<van-grid-item icon="photo-o" text="文字" dot/>
				<van-grid-item icon="photo-o" text="跳转" link-type="navigateTo" url="/pages/index/index" />
				<van-grid-item icon="photo-o" text="文字" />
				
				<van-grid-item icon="photo-o" text="文字" />
			</van-grid>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				columnNum: 5
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
