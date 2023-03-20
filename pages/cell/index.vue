<template>
  <view class="demo-cell van-doc-demo-section">
    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">基础用法</h2>

      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>

    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">单元格大小</h2>

      <van-cell-group>
        <van-cell title="单元格" value="内容" size="large" />
        <van-cell title="单元格" value="内容" size="large" label="描述信息" />
      </van-cell-group>
    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">展示图标</h2>
      <van-cell-group>
        <van-cell title="单元格" icon="location-o" />
      </van-cell-group>
    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">展示箭头</h2>

      <van-cell-group>
        <van-cell title="单元格" is-link />
        <van-cell title="单元格" is-link value="内容" />
        <van-cell title="单元格" is-link label="内容" />

        <van-cell title="单元格" is-link value="内容" arrow-direction="down" />
      </van-cell-group>

    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">卡片风格</h2>

      <van-cell-group inset>
        <van-cell title="单元格" is-link />
        <van-cell title="单元格" is-link value="内容" />
        <van-cell title="单元格" is-link label="内容" />


      </van-cell-group>

    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">分组标题</h2>

      <van-cell-group title="分组1">
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
      <van-cell-group title="分组2">
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
    </view>

    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">使用插槽</h2>

      <van-cell value="内容" icon="shop-o" is-link>
        <view slot="title" class="van-cell__title">
          <text class="van-cell-text">单元格</text>
          <van-tag type="danger">标签</van-tag>
        </view>
      </van-cell>

      <van-cell title="单元格">
        <van-icon slot="right-icon" name="search" class="custom-icon" />
      </van-cell>
    </view>


    <view class="van-doc-demo-block">
      <h2 class="van-doc-demo-block__title">垂直居中</h2>

      <van-cell center title="单元格" value="内容" label="描述信息" />
    </view>

    <view class="van-doc-demo-block" style="height: 200rpx;"></view>

  </view>
</template>

<script></script>

<style lang="scss">
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

  .van-doc-demo-section {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
  }
</style>
