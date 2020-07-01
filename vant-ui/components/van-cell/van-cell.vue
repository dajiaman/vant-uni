<template>
	<view class="van-cell"
	:hover-class="hoverClass" 
	:class="[
		size ? 'van-cell--'+ size: '',
		hasBorder ? 'van-hairline--top-bottom': 'van-hairline--borderless',
		center ? 'van-cell--center': ''
	]"
	@tap.stop="click">
		
		<slot name="title" v-if="$slots['title']"></slot>
		
		<van-icon class="van-cell__left-icon" v-if="icon && !$slots['title']" :name="icon" size="38rpx"></van-icon>
		
		<view v-if="!$slots['title']" class="van-cell__title">
			<text>{{ title }}</text>
			<view class="van-cell__label">{{label}}</view>
		</view>
		
		<view class="van-cell__value">
			<text v-if="!$slots['default']">{{ value }}</text>
			<slot></slot>
		</view>
				
		<slot name="right-icon" v-if="$slots['right-icon']">
		</slot> 
		
		<van-icon class="van-cell__right-icon" v-if="isLink && !$slots['right-icon']" :name="arrowName" size="38rpx"></van-icon>
		
		
	</view>
</template>

<script>
export default {
	name: 'van-cell',
	props: {
		icon: String,
		title: String,
		label: String,
		value: String,
		extra: String,
		rightIcon: String,
		border: {
			type: Boolean,
			default: true
		},
		size: String,
		center: {
			type: Boolean,
			default: false
		},
		isLink: {
			type: Boolean,
			default: false
		},
		// 链接跳转类型，可选值为 navigateTo redirectTo switchTab reLaunch
		linkType: {
			type: String,
			default: 'navigateTo'
		},
		// 跳转链接
		url: {
			type: String,
			default: ''
		},
		clickable:{
			type: Boolean,
			default: false
		},
		// 箭头方向，可选值为 left up down
		arrowDirection: {
			type: String,
			default: ''
		},
		hoverClass: {
			type: String,
			default: 'van-cell--clickable'
		}
	},
	data () {
		return {
			hasBorder: this.border
		}
	},
	created() {
		if(this.$parent){
			this.hasBorder = false;
		}
	},
	computed: {
		arrowName () {
			return this.arrowDirection ? 'arrow-' + this.arrowDirection: 'arrow';
		}
	},
	methods: {
		click(event){
			
			if(this.url && this.linkType){
				this.$van.route({
					url: this.url,
					type: this.linkType
				})
			}
		
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

@import './index.scss';
</style>
