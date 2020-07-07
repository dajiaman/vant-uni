<template>
	<view class="van-goods-action-icon" @click="onClick">
		
		<van-icon class="van-goods-action-icon__icon"
		:dot="dot"
		:info="info"
		:name="icon"
		size="36rpx"
		:color="color"></van-icon>
		
		<slot></slot>
		
		<block v-if="!$slots['default']">
			{{ text }}
		</block>
		
	</view>
</template>

<script>
export default {
	props: {
		dot: Boolean,
		text: String,
		icon: String,
		color: String,
		info: [Number, String],
		iconClass: null
	},
	methods:{
		onClick(event){
			  this.$emit('click', event);
		}
	}
};
</script>

<style lang="scss" scoped>
	.van-goods-action-icon {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  min-width: $goods-action-icon-width;
	  height: $goods-action-icon-height;
	  color: $goods-action-icon-text-color;
	  font-size: $goods-action-icon-font-size;
	  line-height: 1;
	  text-align: center;
	  background-color: $white;
	  cursor: pointer;
	
	  &:active {
	    background-color: $goods-action-icon-active-color; 
	  }
	
	  &__icon {
	    position: relative;
	    width: 1em;
	    margin: 0 auto 5px;
	    color: $goods-action-icon-color;
	    font-size: $goods-action-icon-size;
	  }
	}
</style>
