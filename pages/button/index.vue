<template>
	<view class="demo-button van-doc-demo-section">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">按钮类型</h2>

			<view class="demo-button-row">
				<van-button type="default" text="默认按钮"></van-button>
				<van-button type="primary" text="主要按钮"></van-button>
				<van-button type="info" text="信息按钮"></van-button>
			</view>

			<van-button type="warning" text="警告按钮"></van-button>
			<van-button type="danger" text="危险按钮"></van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">朴素按钮</h2>
			<van-button plain type="primary" text="朴素按钮">朴素按钮</van-button>
			<van-button plain type="info">朴素按钮</van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">细边框</h2>
			<van-button plain hairline type="primary">细边框按钮</van-button>
			<van-button plain hairline type="info">细边框按钮</van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">禁用状态</h2>
			<van-button disabled type="primary">禁用状态</van-button>
			<van-button disabled type="info">禁用状态</van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">加载状态</h2>
			<van-button loading type="primary" />
			<van-button loading type="primary" loading-type="spinner" />
			<van-button loading type="info" loading-text="加载中..." />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">按钮形状</h2>
			<van-button square type="primary">方形按钮</van-button>
			<van-button round type="info">圆形按钮</van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">图标按钮</h2>
			<van-button icon="star-o" type="primary" />
			<van-button icon="star-o" type="primary">按钮</van-button>
			<van-button icon="https://img.yzcdn.cn/vant/logo.png" type="info">按钮</van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">按钮尺寸</h2>

			<van-button type="primary" size="large">大号按钮</van-button>
			<van-button type="primary" size="normal">普通按钮</van-button>
			<van-button type="primary" size="small">小型按钮</van-button>
			<van-button type="primary" size="mini">迷你按钮</van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">块级元素</h2>
			<van-button type="primary" block>块级元素</van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义颜色</h2>
			<van-button color="#7232dd">单色按钮</van-button>
			<van-button color="#7232dd" plain>单色按钮</van-button>
			<van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变色按钮</van-button>
		</view>
	</view>
</template>

<script></script>

<style lang="scss">
.van-doc-demo-block {
	padding: 0 32rpx;
}

.demo-button-row {
	margin-bottom: 24rpx;
}
.van-button {
	margin-right: 20rpx !important;
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

.demo-button .van-button--large {
	margin-bottom: 16px;
}

.van-doc-demo-section {
	box-sizing: border-box;
	min-height: calc(100vh - 56px);
	padding-bottom: 20px;
}
</style>
