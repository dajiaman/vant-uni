<template>
	<view>
		<van-picker v-model="show" mode="time"></van-picker>
		<van-button @click="show = true">打开</van-button>
		<van-button @click="show1 = true">时间</van-button>
		<van-button @click="show2 = true">地区</van-button>
		
		
		<van-picker mode="time" v-model="show1"  default-time="2025-07-02 13:01"></van-picker>
			
		<van-picker mode="region" v-model="show2"  :area-code='["13", "1303", "130304"]' @confirm="confirm"></van-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				show1: false,
				show2: false
			}
		},
		methods: {
			confirm(e){
				console.log(e)
			}
		}
	}
</script>