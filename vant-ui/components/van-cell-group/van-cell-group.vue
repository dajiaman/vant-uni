<template>
  <view>
    <view v-if="title" class="van-cell-group__title">{{ title }}</view>
    <view class="van-cell-group" :class="[
			border ? 'van-hairline--top-bottom' : '',
      inset ? 'van-cell-group--inset' : ''
		]">
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'van-cell-group',
    props: {
      // 分组标题
      title: String,
      // 是否显示外边框
      border: {
        type: Boolean,
        default: true
      },
      // 是否展示为圆角卡片风格
      inset: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .van-cell-group {
    background-color: $cell-group-background-color;

    &--inset {
      margin: $cell-group-inset-padding;
      border-radius: $cell-group-inset-border-radius;
      overflow: hidden;
    }

    &__title {
      padding: $cell-group-title-padding;
      color: $cell-group-title-color;
      font-size: $cell-group-title-font-size;
      line-height: $cell-group-title-line-height;
    }
  }
</style>
