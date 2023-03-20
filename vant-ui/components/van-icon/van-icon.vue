<template>
  <view class="van-icon" :class="[
			name ? 'van-icon-' + name : '',
      customClass? customClass: ''
		]" :style="{
			fontSize: size,
			color: color
		}" @click="click">

    <van-info v-if="info && info !== null && info !== '' || dot" :dot="dot" :info="info" class="van-icon__info" />

    <image v-if="isImageName" :src="name" mode="aspectFit" class="van-icon__image" :style="{
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
      // 颜色
      color: String,
      // 尺寸
      size: {
        type: [Number, String],
        default: '32rpx'
      },
      customClass: {
        type: String
      }
    },
    watch: {
      size(val) {
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
