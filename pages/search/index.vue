<template>
	<view>
		<van-search 
		v-model="value"
		:showAction="showAction" 
		placeholder="请输入"
		shape="round"
		inputAlign="center"
		:disabled="disabled"
		:clearable="clearable"
		@change="onChange"
		@search="onSearch"
		></van-search>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				showAction: true,
				disabled: false,
				clearable: true,
				value: ""
			}
		},
		methods: {
			onChange(e){
				console.log(e)
			},
			
			onSearch(e){
				console.log(e)
			}
		}
 	}
</script>

<style>
</style>
