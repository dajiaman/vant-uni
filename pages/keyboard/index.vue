<template>
	<view>
		
		{{val}}
		
			<van-cell title="数字键盘" is-link @click="show1 = true"></van-cell>
			
			<van-cell title="身份证键盘" is-link @click="show2 = true"></van-cell>
					
			<van-cell title="车牌键盘" is-link @click="show3 = true"></van-cell>
					
			
		
			<van-keyboard ref="uKeyboard" mode="number" v-model="show1" @change="change"></van-keyboard>
			<van-keyboard ref="uKeyboard" mode="card" v-model="show2"></van-keyboard>
			<van-keyboard ref="uKeyboard" mode="car" v-model="show3"></van-keyboard>
			
			
	</view>
</template>

<script>
	export default{
		data(){
			return {
				show1: false,
				show2: false,
				show3: false,
				
				val: ''
			}
			
		},
		methods: {
			change(val){
				this.val = val;
			}
		}
	}
</script>

<style>
</style>
