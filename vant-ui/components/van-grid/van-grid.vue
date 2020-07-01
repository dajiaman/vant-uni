<template>
	<view class="van-grid" :style="style">
			<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'van-grid',
	props: {
		columnNum: {
			type: Number,
			default: 4
		},
		background: {
			type: String
		},
		square: {
			type: Boolean,
			default: false
		},
		center: {
			type: Boolean,
			default: true
		},
	},
	computed: {
		style () {
			let style = {};
			
			if(this.backgroud){
				style.backgroundColor = this.background;
			}
			return style;
		}
	},
	provide() {
		return {
			parent: this
		}
	}
};
</script>

<style lang="scss" scoped>
.van-grid {
	width: 100%;
	/* #ifdef MP */
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	/* #endif */

	/* #ifndef MP */
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	/* #endif */
}
</style>
