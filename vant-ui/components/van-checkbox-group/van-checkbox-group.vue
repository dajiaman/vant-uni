<template>
  <view class="van-checkbox-group" :class="[
    direction ? 'van-checkbox-group--' + direction: ''
  ]">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: 'van-checkbox-group',
    model: {
      event: 'change'
    },
    props: {
      // 最多能选中多少个checkbox
      max: {
        type: [Number, String],
        default: 999
      },
      // 是否禁用所有复选框
      disabled: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: 'vertical'
      },
      checkedColor: {
        type: String,
        default: '#1989fa'
      },
      value: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    provide() {
      return {
        'checkboxGroup': this
      };
    },
    watch: {
      value(val) {
        this.$emit('change', val);
      },
    },
    data() {
      return {
        // 所有子组件
        children: []
      };
    },
  };
</script>
<style lang="scss" scoped>
  .van-checkbox-group {
    &--horizontal {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
