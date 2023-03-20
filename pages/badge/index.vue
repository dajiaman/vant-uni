<template>
  <view class="demo-badge van-doc-demo-section">
    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">基础用法</h2>

      <view class="demo-button-row">
        <van-badge :content="5">
          <div class="child" />
        </van-badge>
        <van-badge :content="10">
          <div class="child" />
        </van-badge>
        <van-badge content="Hot">
          <div class="child" />
        </van-badge>
        <van-badge dot>
          <div class="child" />
        </van-badge>
      </view>
    </view>
  </view>
</template>

<script></script>

<style lang="scss">
  .van-doc-demo-block {
    padding: 0 32rpx;
  }

  .demo-button-row {
    margin-bottom: 24rpx;
  }

  .van-button {
    margin-right: 20rpx !important;
  }

  .van-doc-demo-block__title {
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  .van-doc-demo-block:first-of-type .van-doc-demo-block__title {
    padding-top: 20px;
  }

  .demo-badge {
    .van-badge__wrapper {
      margin-left: 16px;
    }

    .child {
      width: 40px;
      height: 40px;
      background: #f2f3f5;
      border-radius: 4px;
    }
  }

  .van-doc-demo-section {
    box-sizing: border-box;
    min-height: calc(100vh - 56px);
    padding-bottom: 20px;
  }
</style>
