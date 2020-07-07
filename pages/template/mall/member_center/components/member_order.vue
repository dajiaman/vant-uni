<template>
	<view class="member-center__order">
		<van-cell title="我的订单" value="查看全部订单" is-link :titleStyle="titleStyle"></van-cell>
		<van-tabbar class="tabbar" active-color="#333" inactive-color="#333" size="48rpx" :list="list" :fixed="fixed"></van-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fixed: false,
			list: [
				{
					icon: 'https://b.yzcdn.cn/public_files/2019/04/28/1be3ce61d72286c7ac6e56fbb7d0735c.svg',
					text: '待付款',
					badge: '2'
				},
				{
					icon: 'https://b.yzcdn.cn/public_files/2019/04/28/72cc80f8b65eae45862cafe0d27e78f7.svg',
					text: '待发货',
					badge: '2'
				},
				{
					icon: 'setting-o',
					text: '待收货',
					badge: '2'
				},
				{
					icon: 'setting-o',
					text: '待评价',
					badge: '2'
				},
				{
					icon: 'setting-o',
					text: '退款/售后',
					badge: '2'
				}
			],
			
			titleStyle: {
				'font-weight': 'bold'
			}
		};
	}
};
</script>

<style lang="scss">
.member-center__order {
	width: 94%;
	margin: 0 auto 20rpx;
	background: #fff;
	border-radius: 16rpx;

	.tabbar {
		position: relative;
		padding: 40rpx 0;
		border-radius: 16rpx;
	}
}
</style>
