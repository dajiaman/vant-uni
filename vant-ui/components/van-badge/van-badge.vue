<template>
  <view class="van-badge__wrapper">
    <slot name="default" v-if="$slots['default']"></slot>
    <view class="van-badge" :class="[
      dot ? 'van-badge--dot' : '',
      $slots['default'] ? 'van-badge--fixed': ''
    ]">
      {{ content }}
    </view>
  </view>
</template>

<script>
  import {
    isDef
  } from '../../libs/utils/index.js';

  export default {
    name: 'van-badge',
    props: {
      dot: Boolean,
      max: [Number, String],
      color: String,
      content: [Number, String]
    },
  }
</script>

<style lang="scss" scoped>
  .van-badge {
    display: inline-flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    min-width: $badge-size;
    padding: $badge-padding;
    color: $badge-color;
    line-height: 1.1;
    font-weight: $badge-font-weight;
    font-size: $badge-font-size;
    background-color: $badge-background-color;
    border: $badge-border-width solid $white;
    border-radius: $border-radius-max;

    &--fixed {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      transform-origin: 100%;
    }


    &--dot {
      width: $badge-dot-size;
      min-width: 0;
      height: $badge-dot-size;
      background-color: $badge-dot-color;
      border-radius: 100%;
    }

    &__wrapper {
      position: relative;
      display: inline-block;
    }
  }
</style>
