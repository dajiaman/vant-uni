<template>
  <view class="van-checkbox">
    <view v-if="labelPosition == 'left'" class="van-checkbox__label" :class="[
      disabled ? 'van-checkbox__label--disabled': ''
    ]" @click="onClickLabel">
      <slot />
    </view>

    <view class="van-checkbox__icon" :class="[
        shape ? 'van-checkbox__icon--' + shape : '',
        disabled ? 'van-checkbox__icon--disabled': '',
        checked ? 'van-checkbox__icon--checked' : '',
      ]" @click="toggle">
      <slot name="icon" v-if="$slots['icon']" />

      <van-icon v-else name="success" class="van-checkbox__icon" :style="iconStyle" />
    </view>

    <view v-if="labelPosition === 'right'" class="van-checkbox__label" :class="[
      disabled ? 'van-checkbox__label--disabled': ''
    ]" @click="onClickLabel">
      <slot />
    </view>
  </view>
</template>

<script>
  import {
    addUnit,
    style,
    sortChildren
  } from '../../libs/utils/index.js'
  export default {
    name: 'van-checkbox',
    model: {
      event: 'change'
    },
    props: {
      name: null,
      value: null,
      disabled: Boolean,
      checkedColor: String,
      labelPosition: {
        type: String,
        default: 'right'
      },
      labelDisabled: Boolean,
      shape: {
        type: String,
        default: 'round'
      },
      iconSize: {
        type: null,
        default: 30
      },
      bindGroup: {
        type: Boolean,
        default: true
      }
    },
    inject: {
      'checkboxGroup': {
        default: null,
      },
    },
    data() {
      return {
        parentDisabled: false,
        direction: 'vertical',
      }
    },
    watch: {
      value(val) {
        this.$emit('change', val);
      }
    },
    computed: {
      parent() {
        if (this.disableBindRelation) {
          return null;
        }
        return this.checkboxGroup;
      },
      index() {
        this.bindRelation();

        if (this.parent) {
          return this.parent.children.indexOf(this);
        }

        return null;
      },
      disabledBindRelation() {
        return !this.bindGroup
      },
      isDisabled() {
        return (this.parent && this.parent.disabled) || this.disabled;
      },
      checked: {
        get() {
          if (this.parent) {
            return this.parent.value.indexOf(this.name) !== -1;
          }
          return this.value;
        },
        set(val) {
          if (this.parent) {
            this.setParentValue(val);
          } else {
            this.$emit('change', val);
          }
        },
      },
      iconStyle() {
        var styles = {
          'font-size': addUnit(this.iconSize),
        };

        if (this.checkedColor && this.value && !this.disabled && !this.parentDisabled) {
          styles['border-color'] = this.checkedColor;
          styles['background-color'] = this.checkedColor;
        }

        return style(styles);
      }
    },
    mounted() {
      this.bindRelation();
    },
    beforeDestroy() {
      if (this.parent) {
        this.parent.children = this.parent.children.filter(
          (item) => item !== this
        );
      }
    },
    methods: {
      // 绑定父子关系
      bindRelation() {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return;
        }

        const children = [...this.parent.children, this];
        sortChildren(children, this.parent);

        this.parent.children = children;
      },
      setChange(val) {
        console.log('我在emit change', val);
        this.$emit('change', val);
      },
      // label点击事件
      onClickLabel() {
        const {
          labelDisabled,
          parentDisabled,
          disabled,
          checked
        } = this;
        if (!disabled && !labelDisabled && !parentDisabled) {
          this.emitChange(!checked);
        }
      },
      emitChange(value) {
        if (this.parent) {
          this.setParentValue(this.parent, value);
        } else {
          this.$emit('change', value);
        }
      },
      toggle() {
        const {
          parentDisabled,
          disabled,
          checked
        } = this;
        if (!disabled && !parentDisabled) {
          this.emitChange(!checked);
        }
      },
      setParentValue(parent, value) {
        const parentValue = parent.value.slice();
        const {
          name
        } = this;
        const {
          max
        } = parent;

        if (value) {
          if (max && parentValue.length >= max) {
            return;
          }
          if (parentValue.indexOf(name) === -1) {
            parentValue.push(name);
            parent.$emit('change', parentValue);
          }
        } else {
          const index = parentValue.indexOf(name);
          console.log('index', index);
          if (index !== -1) {
            parentValue.splice(index, 1);
            parent.$emit('change', parentValue);
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../libs/css/style.components.scss";

  .van-checkbox {
    display: flex;
    align-items: center;
    overflow: hidden;
    user-select: none;

    &--horizontal {
      margin-right: $padding-sm;
    }


    &__label {
      line-height: $checkbox-size;
    }

    &__icon {

      .van-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 1em;
        height: 1em;
        color: transparent;
        text-align: center;
        transition-property: color, border-color, background-color;
        font-size: $checkbox-size;
        border: 1rpx solid $checkbox-border-color;
        transition-duration: $checkbox-transition-duration;
      }


      &--round {
        .van-icon {
          border-radius: 100%;
        }
      }

      &--checked {
        .van-icon {
          color: $white;
          background-color: $checkbox-checked-icon-color;
          border-color: $checkbox-checked-icon-color;
        }
      }


      &--disabled {
        color: $checkbox-disabled-icon-color;

        .van-icon {
          background-color: $checkbox-disabled-background-color;
          border-color: $checkbox-disabled-icon-color;
        }
      }
    }

    &__label {
      word-wrap: break-word;
      padding-left: $checkbox-label-margin;
      color: $checkbox-label-color;

      &--left {
        float: left;
        margin: 0 $checkbox-label-margin 0 0;
      }

      &--disabled {
        color: $checkbox-disabled-label-color;
      }

      &:empty {
        margin: 0;
      }
    }
  }
</style>
