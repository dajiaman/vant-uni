<template>
  <view class="van-image" :class="[
    round ? 'van-image--round': '',
  ]" :style="style">
    <image :src="src" :mode="mode" :lazy-load="lazyLoad" class="van-image__img" @load="onLoadHandler"
      @error="onErrorHandler"></image>

    <view v-if="showLoading && loading" class="van-image__loading">
      <slot name="loading" v-if="$slots['loading']"></slot>
      <van-icon name="loading" v-else custom-class="van-image__loading-icon" />
    </view>

    <view v-if="showError && error" class="van-image__error">
      <slot name="error" v-if="$slots['error']"></slot>
      <van-icon v-else name="photo-fail" custom-class="van-image__error-icon" />
    </view>
  </view>
</template>

<script>
  import {
    isDef,
    addUnit
  } from '../../libs/utils/index.js';

  var FIT_MODE_MAP = {
    none: 'center',
    fill: 'scaleToFill',
    cover: 'aspectFill',
    contain: 'aspectFit',
    widthFix: 'widthFix',
    heightFix: 'heightFix',
  };

  function mode(fit) {
    return FIT_MODE_MAP[fit];
  }

  export default {
    name: 'van-image',
    props: {
      src: String,
      // 图片填充模式
      // https://vant-contrib.gitee.io/vant-weapp/#/image
      fit: {
        type: String,
        value: 'fill',
      },
      alt: String,
      round: Boolean,
      width: [Number, String],
      height: [Number, String],
      radius: [Number, String],
      lazyLoad: Boolean,
      iconPrefix: String,
      showError: {
        type: Boolean,
        default: true
      },
      showLoading: {
        type: Boolean,
        default: true,
      },
      errorIcon: {
        type: String,
        default: 'photo-fail',
      },
      loadingIcon: {
        type: String,
        default: 'photo',
      },
    },
    computed: {
      style() {
        const style = {};

        if (isDef(this.width)) {
          style.width = addUnit(this.width);
        }

        if (isDef(this.height)) {
          style.height = addUnit(this.height);
        }

        if (isDef(this.radius)) {
          style.overflow = 'hidden';
          style.borderRadius = addUnit(this.radius);
        }

        return style;
      },
      mode() {
        return FIT_MODE_MAP[this.fit];
      }
    },
    data() {
      return {
        loading: true,
        error: false,
      }
    },
    methods: {
      onLoadHandler() {
        this.loading = false;
        this.error = false;
      },
      onErrorHandler() {
        this.error = true;
        this.loading = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .van-image {
    position: relative;
    display: inline-block;


    &--round {
      overflow: hidden;
      border-radius: 50%;

    }


    &__img,
    &__error,
    &__loading {
      display: block;
      width: 100%;
      height: 100%;
    }


    &__error,
    &__loading {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: $image-placeholder-text-color;
      font-size: $image-placeholder-font-size;
      background-color: $image-placeholder-background-color;
    }


    &__loading-icon {
      color: $image-loading-icon-color;
      font-size: $image-loading-icon-size;
    }
  }
</style>
