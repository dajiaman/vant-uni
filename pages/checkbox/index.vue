<template>
  <view class="van-doc-demo-section demo-checkbox">
    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">基础用法</h2>

      <van-checkbox v-model="checked1">复选框</van-checkbox>

    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">禁用状态</h2>
      <van-checkbox-group>
        <van-checkbox v-model="checked" disabled>复选框</van-checkbox>
        <van-checkbox v-model="checked1" disabled>复选框</van-checkbox>
      </van-checkbox-group>
    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">自定义形状</h2>
      <van-checkbox-group>
        <van-checkbox v-model="checked" shape="square">复选框</van-checkbox>
      </van-checkbox-group>
    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">自定义颜色</h2>
      <van-checkbox-group>
        <van-checkbox v-model="checked1" checked-color="#07c160">复选框</van-checkbox>
      </van-checkbox-group>
    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">禁用文本点击</h2>
      <van-checkbox-group>
        <van-checkbox v-model="checked1" label-disabled>复选框</van-checkbox>
      </van-checkbox-group>
    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">复选框组</h2>
      <van-checkbox-group v-model="checked3">
        <van-checkbox name="a">复选框 a</van-checkbox>
        <van-checkbox name="b">复选框 b</van-checkbox>
      </van-checkbox-group>
    </view>


    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">水平排列</h2>
      <van-checkbox-group v-model="checked3" direction="horizontal">
        <van-checkbox name="a">复选框 a</van-checkbox>
        <van-checkbox name="b">复选框 b</van-checkbox>
      </van-checkbox-group>
    </view>

    <view class="van-doc-demo-block2">
      <h2 class="van-doc-demo-block__title">搭配单元格</h2>
      <van-checkbox-group v-model="result2">
        <van-cell-group>
          <van-cell v-for="(item, index) in list" clickable :key="item" :title="`复选框 ${item}`" @click="toggle(index)">
            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        checked1: false,

        checked: false,

        checked3: ['a'],

        list: ['a', 'b'],
        result2: [],

        result: [{
            name: 'apple',
            checked: false,
            disabled: false
          },
          {
            name: 'banner',
            checked: false,
            disabled: false
          }
        ]
      };
    },
    methods: {
      checkboxGroupChange(e) {
        console.log('checkboxGroup', e)
      },
      checkboxChange(e) {
        console.log(e);
      },

      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      },
    }
  };
</script>

<style>
  .van-doc-demo-section {
    box-sizing: border-box;
    min-height: calc(100vh - 56px);
    padding-bottom: 20px;
  }

  .demo-checkbox {
    background: #fff;
  }

  .van-doc-demo-block__title {
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  .demo-checkbox .van-doc-demo-block__title {
    margin-top: -8px;
  }

  .van-doc-demo-block:first-of-type .van-doc-demo-block__title {
    padding-top: 20px;
  }

  .demo-checkbox .van-checkbox {
    margin: 0 0 8px 20px;
  }
</style>
