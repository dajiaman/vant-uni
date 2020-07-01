<template>
	<view class="van-doc-demo-section demo-notice-bar">
		<van-notice-bar left-icon="https://img.yzcdn.cn/1.png" text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"></van-notice-bar>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">通知栏模式</h2>

			<van-notice-bar mode="closeable" text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" />

			<!-- link 模式，在右侧显示链接箭头 -->
			<van-notice-bar mode="link" text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">多行展示</h2>
			<van-notice-bar wrapable :scrollable="false" text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义样式</h2>
			<van-notice-bar :text="shortText" 
			color="#1989fa" 
			background="#ecf9ff" left-icon="info-o" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			shortText: '技术是开发它的人的共同灵魂。'
		};
	}
};
</script>

<style lang="scss">
.van-doc-demo-section {
	box-sizing: border-box;
	min-height: calc(100vh - 56px);
	padding-bottom: 20px;
}
.demo-notice-bar {
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
</style>
