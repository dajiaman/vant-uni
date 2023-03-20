<template>
  <view class="van-loading">
    <view class="van-loading__spinner" :class="[
      type ? 'van-loading__spinner--' + type : '',
    ]" :style="spinnerStyle">
      <view class="van-loading__dot" v-if="type === 'spinner'" v-for="(item, index) in array12" :key="index">
      </view>
    </view>

    <view class="van-loading__text" :style="textStyle">
      <slot />
    </view>
  </view>
</template>

<script>
  import {
    addUnit,
    style
  } from '../../libs/utils/index.js';

  export default {
    name: "van-loading",
    props: {
      color: String,
      vertical: Boolean,
      type: {
        type: String,
        default: 'circular',
      },
      size: [Number, String],
      textSize: [Number, String]
    },
    data() {
      return {
        array12: Array.from({
          length: 12
        }),
      }
    },
    computed: {
      textStyle() {
        return style({
          'font-size': addUnit(this.textSize),
        });
      },
      spinnerStyle() {
        return style({
          color: this.color,
          width: addUnit(this.size),
          height: addUnit(this.size),
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../libs/css/style.components.scss";

  .van-loading {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: $loading-spinner-color;


    &__spinner {
      position: relative;
      box-sizing: border-box;
      width: $loading-spinner-size;
      // compatible for 0.x, users may set width or height in root element
      max-width: 100%;
      max-height: 100%;
      height: $loading-spinner-size;

      animation: van-rotate $loading-spinner-animation-duration linear infinite;

      &--spinner {
        animation-timing-function: steps(12);
      }

      &--circular {
        border: 1rpx solid transparent;
        border-top-color: currentColor;
        border-radius: 100%;
      }
    }

    &--vertical {
      flex-direction: column;

      .van-loading__text {
        margin: $padding-xs 0 0;
      }
    }

    &__text {
      margin-left: $padding-xs;
      color: $loading-text-color;
      font-size: $loading-text-font-size;
      line-height: $loading-text-line-height;

      &:empty {
        display: none;
      }
    }


    &__dot {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &::before {
        display: block;
        width: 2px;
        height: 25%;
        margin: 0 auto;
        background-color: currentColor;
        border-radius: 40%;
        content: ' ';
      }
    }
  }


  .van-loading__dot:nth-of-type(1) {
    transform: rotate(30deg);
    opacity: 1;
  }

  .van-loading__dot:nth-of-type(2) {
    transform: rotate(60deg);
    opacity: 0.9375;
  }

  .van-loading__dot:nth-of-type(3) {
    transform: rotate(90deg);
    opacity: 0.875;
  }

  .van-loading__dot:nth-of-type(4) {
    transform: rotate(120deg);
    opacity: 0.8125;
  }

  .van-loading__dot:nth-of-type(5) {
    transform: rotate(150deg);
    opacity: 0.75;
  }

  .van-loading__dot:nth-of-type(6) {
    transform: rotate(180deg);
    opacity: 0.6875;
  }

  .van-loading__dot:nth-of-type(7) {
    transform: rotate(210deg);
    opacity: 0.625;
  }

  .van-loading__dot:nth-of-type(8) {
    transform: rotate(240deg);
    opacity: 0.5625;
  }

  .van-loading__dot:nth-of-type(9) {
    transform: rotate(270deg);
    opacity: 0.5;
  }

  .van-loading__dot:nth-of-type(10) {
    transform: rotate(300deg);
    opacity: 0.4375;
  }

  .van-loading__dot:nth-of-type(11) {
    transform: rotate(330deg);
    opacity: 0.375;
  }

  .van-loading__dot:nth-of-type(12) {
    transform: rotate(360deg);
    opacity: 0.3125;
  }


  @keyframes van-rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
