<template>
	<view>
		<memberInfo :avatar="userInfo.avatar" :nickname="userInfo.nickname" 
		position="left"></memberInfo>
		
		<memberOrder></memberOrder>
		
	</view>
</template>

<script>
	import memberInfo from './components/member_info.vue'
	import memberOrder from './components/member_order.vue'
	
	
	export default {
		components: {
			memberInfo,
			memberOrder
		},
		data () {
			
			return {
				userInfo: {
					avatar: '//b.yzcdn.cn/showcase/membercenter/2018/08/06/default_avatar@2x.png',
					nickname: '用户昵称'
				}
			}
			
		}
	}
</script>

<style>

</style>
