<template>
    <view class="van-doc-demo-section demo-icon">
        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">基础用法</h2>
            <van-icon name="success" size="40rpx"></van-icon>
        </view>

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">使用url</h2>
            <van-icon size="40rpx" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
        </view>

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">徽标提示</h2>
            <van-icon size="40rpx" name="chat-o" dot />
            <van-icon size="40rpx" name="chat-o" info="9" />
            <van-icon size="40rpx" name="chat-o" info="99+" />
        </view>

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">图标颜色</h2>
            <van-icon size="40rpx" name="chat" color="red" />
        </view>

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">图标大小</h2>
            <van-icon name="chat" size="50rpx" />
        </view>
    </view>
</template>

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
</style>
