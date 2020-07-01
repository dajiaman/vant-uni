<template>
	<view class="van-divider"
	:class="[
		hairline ? 'van-divider--hairline' : '',
		dashed ? 'van-divider--dashed': '',
		'van-divider--content-' + contentPosition
	]">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'van-divider',
		props: {
			dashed: {
				type: Boolean,
				default: false
			},
			hairline: {
				type: Boolean,
				default: true
			},
			contentPosition: {
				type: String,
				default: 'center'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.van-divider {
	  display: flex;
	  align-items: center;
	  margin: $divider-margin;
	  color: $divider-text-color;
	  font-size: $divider-font-size;
	  line-height: $divider-line-height;
	  border-color: $divider-border-color;
	  border-style: solid;
	  border-width: 0;
	
	  &::before,
	  &::after {
	    display: block;
	    flex: 1;
	    box-sizing: border-box;
	    height: 1px;
	    border-color: inherit;
	    border-style: inherit;
	    border-width: $border-width-base 0 0;
	  }
	
	  &::before {
	    content: '';
	  }
	
	  &--hairline {
	    &::before,
	    &::after {
	      transform: scaleY(0.5);
	    }
	  }
	
	  &--dashed {
	    border-style: dashed;
	  }
	
	  &--content-center,
	  &--content-left,
	  &--content-right {
	    &::before {
	      margin-right: $divider-content-padding;
	    }
	
	    &::after {
	      margin-left: $divider-content-padding;
	      content: '';
	    }
	  }
	
	  &--content-left {
	    &::before {
	      max-width: $divider-content-left-width;
	    }
	  }
	
	  &--content-right {
	    &::after {
	      max-width: $divider-content-right-width;
	    }
	  }
	}
</style>
