<template>
  <view class="van-info" v-if="info !== null && info !='' || dot" :class="[
		dot ? 'van-info--dot' : ''
	]">
    {{ info ? info : badge }}
  </view>
</template>

<script>
  export default {
    props: {
      dot: Boolean,
      badge: [String, Number],
      info: [String, Number],
    }
  }
</script>

<style lang="scss" scoped>
  .van-info {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    min-width: $info-size;
    padding: $info-padding;
    color: $info-color;
    font-weight: $info-font-weight;
    font-size: $info-font-size;
    font-family: $info-font-family;
    line-height: $info-size - $info-border-width * 2;
    text-align: center;
    background-color: $info-background-color;
    border: $info-border-width solid $white;
    border-radius: $info-size;
    transform: translate(50%, -50%);
    transform-origin: 100%;

    &--dot {
      width: $info-dot-size;
      min-width: 0;
      height: $info-dot-size;
      background-color: $info-dot-color;
      border-radius: 100%;
    }
  }
</style>
