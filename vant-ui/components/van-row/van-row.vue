<template>
	<view class="van-row">
		<slot></slot>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.van-row {
	  &::after {
	    display: table;
	    clear: both;
	    content: '';
	  }
	
	  &--flex {
	    display: flex;
	
	    &::after {
	      display: none;
	    }
	  }
	
	  &--justify-center {
	    justify-content: center;
	  }
	
	  &--justify-end {
	    justify-content: flex-end;
	  }
	
	  &--justify-space-between {
	    justify-content: space-between;
	  }
	
	  &--justify-space-around {
	    justify-content: space-around;
	  }
	
	  &--align-center {
	    align-items: center;
	  }
	
	  &--align-bottom {
	    align-items: flex-end;
	  }
	}
</style>
