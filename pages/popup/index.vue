<template>
	<view class="van-doc-demo-section demo-popup">
		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">基本用法</h2>
			<van-cell title="展示弹出层" is-link @click="show1 = true"></van-cell>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">弹出位置</h2>
			<van-cell title="顶部弹出" is-link @click="click(2)"></van-cell>
			<van-cell title="底部弹出" is-link @click="click(3)"></van-cell>
			<van-cell title="左侧弹出" is-link @click="click(4)"></van-cell>
			<van-cell title="右侧弹出" is-link @click="click(5)"></van-cell>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">关闭图标</h2>
			<van-cell title="关闭图标" is-link @click="click(6)"></van-cell>
			<van-cell title="自定义图标" is-link @click="click(7)"></van-cell>
			<van-cell title="自定义图标位置" is-link @click="click(8)"></van-cell>
		</view>

		<view class="van-doc-demo-block">
			<h2 class="van-doc-demo-block__title">圆角弹窗</h2>
			<van-cell title="圆角弹窗" is-link @click="click(9)"></van-cell>
		</view>

		<van-popup v-model="show1" :position="position" 
		:closeable="closeable" :round="round" 
		 
		 :close-icon="closeIcon" 
		:close-icon-position="closeIconPosition"
		@close="close" @open="open">
            <view style="height: 200rpx">这是里面的内容这是里面的内容这是里面的内容这是里面的内容</view>
        </van-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show1: false,
			position: 'center',
			closeable: false,
			round: false,
			closeIcon: '',
			closeIconPosition: 'top-right'
		};
	},
	methods: {
		click(type) {
			switch (type) {
				case 2:
					this.position = 'top';
					break;
				case 3:
					this.position = 'bottom';
					break;
				case 4:
					this.position = 'left';
					break;
				case 5:
					this.position = 'right';
					break;
				case 6:
					this.position = 'bottom';
					this.closeIcon = 'cross';
					this.closeable = true;
					break;
				case 7:
					this.closeable = true;
					this.position = 'bottom';
					this.closeIcon = 'close';
					break;
				case 8:
					this.closeable = true;
					this.position = 'bottom';
					this.closeIcon = 'close';
					this.closeIconPosition = 'top-left';
					break;
				case 9:
					this.position = 'bottom';
					this.round = true;
					break;
			}

			this.show1 = true;
		},
		close() {
			this.show1 = false;
		},
		open() {
			this.show1 = true;
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
