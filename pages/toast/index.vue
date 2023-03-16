<template>
	<view class="van-doc-demo-section demo-toast">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">文字提示</h2>

			<van-button type="primary" @click="toast1">文字提示</van-button>

			<van-button type="primary" @click="toast2">长文字提示</van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">加载提示</h2>

			<van-button type="primary" @click="toast3">加载提示</van-button>

			<van-button type="primary" @click="toast4">自定义加载图标</van-button>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">成功/失败提示</h2>

			<van-button type="primary" @click="toast5">成功提示</van-button>

			<van-button type="primary" @click="toast6">失败提示</van-button>
		</view>

		<van-toast ref="toast"></van-toast>
	</view>
</template>

<script>
export default {
	methods: {
		toast1() {
			this.$refs.toast.show({
				message: '文字提示'
			});
		},

		toast2() {
			this.$refs.toast.show({
				message: '这是一条长文字提示，超过一定字数就会换行'
			});
		},

		toast3() {
			this.$refs.toast.show({
				type: 'loading',
				mask: true,
				message: '加载中...',
                duration: 1000000
			});
		},
		
		toast4() {
			this.$refs.toast.show({
				type: 'loading',
				mask: true,
				message: '加载中...'
			});
		},
		
		
		toast5() {
			this.$refs.toast.success('失败文案');
		},
		
		
		
		toast6() {
			this.$refs.toast.fail('失败文案');
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

.demo-toast {
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

.demo-toast .van-button {
	margin-left: 16px;
}
</style>
