<template>
  <view class="van-doc-demo-section demo-icon">
    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">基础用法</h2>
      <van-row>
        <van-image width="200" height="200" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-row>
    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">填充模式</h2>
      <van-row>
        <van-col span="8">
          <van-image width="200" height="200" fit="contain" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>contain</span>
        </van-col>
        <van-col span="8">
          <van-image width="200" height="200" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </van-col>
        <van-col span="8">
          <van-image width="200" height="200" fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>fill</span>
        </van-col>

        <van-col span="8">
          <van-image width="200" height="200" fit="none" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>none</span>
        </van-col>

        <van-col span="8">
          <van-image width="200" height="200" fit="widthFix" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>scale-down</span>
        </van-col>
      </van-row>
    </view>


    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">圆形图片</h2>
      <van-row>
        <van-col span="8">
          <van-image round width="200" height="200" fit="contain" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>contain</span>
        </van-col>
        <van-col span="8">
          <van-image round width="200" height="200" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </van-col>
        <van-col span="8">
          <van-image round width="200" height="200" fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>fill</span>
        </van-col>

        <van-col span="8">
          <van-image round width="200" height="200" fit="none" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>none</span>
        </van-col>

        <van-col span="8">
          <van-image round width="200" height="200" fit="widthFix" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span>scale-down</span>
        </van-col>
      </van-row>
    </view>


    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">加载中提示</h2>
      <van-row>
        <van-col span="8">
          <van-image width="200" height="200">
            <van-loading size="50rpx" slot="loading" />
          </van-image>
        </van-col>
        <van-col span="8">
          <van-image width="200" height="200" src="wadwad">
            <text slot="error">加载失败</text>
          </van-image>
        </van-col>
      </van-row>
    </view>

  </view>
</template>

<script>
</script>

<style lang="scss">
  .van-doc-demo-block__title {
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  .van-row {
    padding: 0 16px;
  }

  .van-doc-demo-block:first-of-type .van-doc-demo-block__title {
    padding-top: 20px;
  }
</style>
