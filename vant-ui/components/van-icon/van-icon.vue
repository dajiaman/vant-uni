<template>
	<view
		class="van-icon"
		:class="[
			name ? 'van-icon-' + name : ''
		]"
		:style="{
			fontSize: size,
			color: color
		}"
		@click="click"
	>	
	
		<image v-if="isImageName" :src="name" mode="aspectFit" class="van-icon__image" 
		 :style="{
			 width: size,
			 height: size
		 }" />
		 	<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'van-icon',
	props: {
		name: {
			type: String
		},
		dot: {
			type: Boolean,
			default: false
		},
		info: [String, Number],
		color: String,
		size: {
			type: [Number, String],
			default: '32rpx'
		}
	},
	watch: {
		size(val){
			return isNaN(val) ? val : val + 'rpx';
		}
	},
	computed: {
		isImageName() {
			if (this.name) {
				return this.name.indexOf('/') !== -1; 
			}
			return false;
		}
	},
	methods: {
		click(e) {
			this.$emit('click', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
@import '../../iconfont.css';

.van-icon {
	text-align: center;
	
	 &__image {
	    object-fit: contain;
	  }

}
</style>
