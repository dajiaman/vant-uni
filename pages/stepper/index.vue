<template>
	<view>
		
		<van-stepper v-model="value" />
		
		<van-cell center :title="'基本用法'"><van-stepper v-model="value" /></van-cell>

		<van-cell center :title="'步长设置'"><van-stepper v-model="value" step="2" /></van-cell>

		<van-cell center :title="'限制输入范围'"><van-stepper v-model="value" min="5" max="8" /></van-cell>

		<van-cell center :title="'限制输入整数'"><van-stepper v-model="value" integer /></van-cell>

		<van-cell center :title="'禁用状态'"><van-stepper v-model="value" disabled /></van-cell>
		
		<van-cell center :title="'禁用输入框'">
			
			<van-stepper v-model="value" disable-input />
			
			
		</van-cell>
		
		
		<van-cell center :title="'自定义大小'">
			
		<van-stepper v-model="value" input-width="40px" button-size="32px" />
		
		</van-cell>
		
		
	
		<van-cell center :title="'异步变更'"><van-stepper :value="value" async-change @change="onChange" /></van-cell>
		
		
		
		<van-toast ref="toast"></van-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: 1
		};
	},
	methods: {
		onChange(value) {
			this.$refs.toast.loading({ forbidClick: true });

			setTimeout(() => {
				// Toast.clear();

				// 注意此时修改 value 后会再次触发 change 事件
				this.value = value;
			}, 500);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f7f8fa;
}
</style>
