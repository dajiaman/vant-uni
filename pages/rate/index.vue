<template>
	<view class="van-doc-demo-section demo-rate">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基础用法</h2>
			<van-rate v-model="value" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义图标</h2>
			<van-rate v-model="value" icon="like" void-icon="like-o" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义样式</h2>
			<van-rate v-model="value" :size="25" color="#ee0a24" void-icon="star" void-color="#eee" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">自定义数量</h2>
			<van-rate v-model="value" :count="6" />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">禁用状态</h2>

			<van-rate v-model="value" disabled />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">只读状态</h2>

			<van-rate v-model="value" readonly />
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">监听 change 事件</h2>

			<van-rate v-model="value" @change="onChange" />
		</view>
		
		
		<van-toast ref="toast"></van-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: 3
		};
	},
	methods: {
		onChange(value) {
			this.$refs.toast.show({
				message: '当前值：' + value ,
			});
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

.demo-rate {
	padding-bottom: 20px;
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

.demo-rate .van-rate {
	margin-left: 16px;
}
</style>
