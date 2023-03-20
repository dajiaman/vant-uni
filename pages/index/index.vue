<template>
  <view class="container">
    <van-cell-group title="基础组件">
      <van-cell title="Button 按钮" is-link url="/pages/button/index"></van-cell>
      <van-cell title="Cell 单元格" is-link url="/pages/cell/index"></van-cell>
      <van-cell title="icon 图标" is-link url="/pages/icon/index"></van-cell>
      <van-cell title="Image 图片" is-link url="/pages/image/index"></van-cell>
      <van-cell title="Layout 布局" is-link url="/pages/layout/index"></van-cell>
      <van-cell title="popup 弹出层" is-link url="/pages/popup/index"></van-cell>
    </van-cell-group>

    <van-cell-group title="表单组件">
      <van-cell title="Checkbox 复选框" is-link url="/pages/checkbox/index"></van-cell>
      <van-cell title="Field 输入框" is-link url="/pages/field/index"></van-cell>
      <van-cell title="NumberBoxBoard 数字键盘" is-link url="/pages/keyboard/index"></van-cell>
      <van-cell title="Rate 评分" is-link url="/pages/rate/index"></van-cell>
      <van-cell title="stepper 步进器" is-link url="/pages/stepper/index"></van-cell>
      <van-cell title="switch 开关" is-link url="/pages/switch/index"></van-cell>
      <van-cell title="uploader 文件上传" is-link url="/pages/uploader/index"></van-cell>
    </van-cell-group>

    <van-cell-group title="反馈组件">
      <van-cell title="actionsheet 动作面板" is-link url="/pages/action-sheet/index"></van-cell>
      <van-cell title="Loading 加载" is-link url="/pages/loading/index"></van-cell>
      <van-cell title="Dialog" is-link url="/pages/dialog/index"></van-cell>
      <van-cell title="Overlay 遮罩层" is-link url="/pages/overlay/index"></van-cell>
      <van-cell title="SwipeCell 滑动菜单" is-link url="/pages/swipe-cell/index"></van-cell>
      <van-cell title="Toast 轻提示" is-link url="/pages/toast/index"></van-cell>
    </van-cell-group>

    <van-cell-group title="展示组件">
      <van-cell title="Badge 徽标" is-link url="/pages/badge/index"></van-cell>
      <van-cell title="countdown 倒计时" is-link url="/pages/count-down/index"></van-cell>
      <van-cell title="Divider 分割线" is-link url="/pages/divider/index"></van-cell>
      <van-cell title="Empty 空状态" is-link url="/pages/empty/index"></van-cell>
      <van-cell title="NoticeBar 通知栏" is-link url="/pages/notice-bar/index"></van-cell>
      <van-cell title="Progress 进度条" is-link url="/pages/progress/index"></van-cell>
      <van-cell title="sticky 粘性布局" is-link url="/pages/sticky/index"></van-cell>
      <van-cell title="Tag 标记" is-link url="/pages/tag/index"></van-cell>
    </van-cell-group>

    <van-cell-group title="导航组件">
      <van-cell title="Grid 宫格" is-link url="/pages/grid/index"></van-cell>
      <van-cell title="Tab 标签页" is-link url="/pages/tab/index"></van-cell>
      <van-cell title="TabBar 标签栏" is-link url="/pages/tabbar/index"></van-cell>
    </van-cell-group>

    <van-cell-group title="业务组件">
      <van-cell title="Sku" is-link url="/pages/sku/index"></van-cell>
      <van-cell title="Lazyload 懒加载" is-link url="/pages/lazyload/index"></van-cell>
      <van-cell title="Waterfall 瀑布流" is-link url="/pages/waterfall/index"></van-cell>
    </van-cell-group>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello'
      };
    },
    onLoad() {},
    methods: {}
  };
</script>

<style>
  page {
    background-color: #e3e3e3;
  }
</style>
