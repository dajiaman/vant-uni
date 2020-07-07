<template>
	<view class="van-sidebar"><slot></slot></view>
</template>

<script>
import { ParentMixin } from '../mixins/relation';
	
export default {
	props: {
		activeKey: {
			type: [Number, String],
			default: 0
		}
	},
	mixins: [ParentMixin('vanSidebar')],
	data() {
		return {
			index: +this.activeKey,
		};
	},
	watch: {
		activeKey() {
			this.setIndex(+this.activeKey);
		}
	},
	methods: {
		setIndex(index) {
			if (index !== this.index) {
				this.index = index;
				this.$emit('change', index);
			}
		}
	}
};
</script>

<style lang="scss">
.van-sidebar {
	width: $sidebar-width;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}
</style>
