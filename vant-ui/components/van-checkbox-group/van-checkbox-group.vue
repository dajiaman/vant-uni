<template>
	<view class="van-checkbox-group"><slot></slot></view>
</template>

<script>
export default {
	name: 'van-checkbox-group',
	props: {
		// 最多能选中多少个checkbox
		max: {
			type: [Number, String],
			default: 999
		},
		// 是否禁用所有复选框
		disabled: {
			type: Boolean,
			default: false
		},
		checkedColor: {
			type: String,
			default: '#1989fa'
		},
		value: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	provide() {
		return {
			checkboxGroup: this
		};
	},
	data() {
		return {
			// 所有子组件
			// children: []
		};
	},
	created() {
		this.children = [];
	},
	methods: {
		emitEvent() {
			let values = [];
			this.children.map(val => {
				if (val.value) values.push(val.name);
			});
			this.$emit('change', values);
		}
	}
};
</script>

<style></style>
