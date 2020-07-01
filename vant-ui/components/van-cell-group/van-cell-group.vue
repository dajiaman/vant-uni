<template>
	<view>
	<view v-if="title" class="van-cell-group__title">{{ title }}</view>
	<view  class="van-cell-group"
		:class="[ 
			border ? 'van-hairline--top-bottom' : '' 
		]">
		<slot></slot>
	</view>
	</view>
</template>

<script>
export default {
	name: 'van-cell-group',
	props: {
		title: String,
		border: {
			type: Boolean,
			default: true
		}
	}
};
</script>

<style lang="scss" scoped>
.van-cell-group {
  background-color:$cell-group-background-color;

  &__title {
    padding: $cell-group-title-padding;
    color: $cell-group-title-color;
    font-size: $cell-group-title-font-size;
    line-height: $cell-group-title-line-height;
  }
}
</style>
