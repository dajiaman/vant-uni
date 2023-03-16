<template>
    <van-popup class="van-action-sheet" position="bottom" v-model="value" :overlay="overlay" :z-index="uZIndex"
        :popup="false" :safeAreaInsetBottom="safeAreaInsetBottom" :round="round" @close="popupClose">
        <view class="van-action-sheet__description">{{ description }}</view>

        <button class="van-action-sheet__item" v-for="(item, index) in actions" :key="index" @touchmove.stop.prevent
            @click.stop="actionClick(item, index)">
            <text class="van-action-sheet__name">{{ item.name }}</text>
            <text class="van-action-sheet__subname">{{ item.subname }}</text>
        </button>

        <view class="van-action-sheet__gap"></view>
        <view class="van-action-sheet__cancel" @click.stop="clickCancel">{{ cancelText }}</view>
    </van-popup>
</template>

<script>
    export default {
        props: {
            value: Boolean,
            // 菜单选项
            actions: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            // 标题
            title: String,
            // 取消按钮文字
            cancelText: String,
            // 选项上方的描述信息
            description: String,
            closeIcon: String,
            // 动画时长，单位秒，设置为 0 可以禁用动画
            duration: {
                type: [Number, String],
                default: 0.3
            },
            // 是否显示圆角
            round: {
                type: Boolean,
                default: true
            },
            // 弹出的z-index值
            zIndex: {
                type: [String, Number],
                default: 0
            },
            // 是否显示遮罩层
            overlay: {
                type: Boolean,
                default: true
            },
            // 是否开启底部安全区适配
            safeAreaInsetBottom: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            // 操作项目的样式
            itemStyle() {
                return index => {
                    let style = {};
                    if (this.list[index].color) style.color = this.list[index].color;
                    if (this.list[index].fontSize) style.fontSize = this.list[index].fontSize + 'rpx';
                    return style;
                };
            },
            uZIndex() {
                // 如果用户有传递z-index值，优先使用
                return this.zIndex ? this.zIndex : this.$van.zIndex.popup;
            }
        },
        methods: {
            clickCancel(e) {
                // 发送input事件，并不会作用于父组件，而是要设置组件内部通过props传递的value参数
                // 这是一个vue发送事件的特殊用法
                this.popupClose();
                this.$emit('cancel');
            },
            // 弹窗关闭
            popupClose() {
                this.$emit('input', false);
            },
            actionClick(item, index) {
                const {
                    disabled,
                    loading,
                    callback
                } = item;
                if (disabled || loading) {
                    return;
                }

                if (callback) {
                    callback(item);
                }

                if (this.closeOnClickAction) {
                    //
                }
                this.$emit('input', false);
                this.$emit('select', item, index);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .van-action-sheet {
        color: $action-sheet-item-text-color;

        &__item {
            &::after {
                border: none;
            }
        }

        &__item,
        &__cancel {
            height: $action-sheet-item-height;
            padding: 0;
            font-size: $action-sheet-item-font-size;
            background-color: $action-sheet-item-background;
            cursor: pointer;
            text-align: center;

            display: flex;
            line-height: 1;

            justify-content: center;

            align-items: center;

            &:active {
                background-color: $active-color;
            }
        }

        &__item {

            &--loading,
            &--disabled {
                color: $action-sheet-item-disabled-text-color;

                &:active {
                    background-color: $action-sheet-item-background;
                }
            }

            &--disabled {
                cursor: not-allowed;
            }

            &--loading {
                cursor: default;
            }
        }

        &__subname {
            margin-left: $padding-base;
            color: $action-sheet-subname-color;
            font-size: $action-sheet-subname-font-size;
        }

        &__gap {
            display: block;
            height: $action-sheet-cancel-padding-top;
            background-color: $action-sheet-cancel-padding-color;
        }

        &__header {
            font-weight: $font-weight-bold;
            font-size: $action-sheet-header-font-size;
            line-height: $action-sheet-header-height;
            text-align: center;
        }

        &__description {
            position: relative;
            padding: 40rpx $padding-md;
            color: $action-sheet-description-color;
            font-size: $action-sheet-description-font-size;
            line-height: $action-sheet-description-line-height;
            text-align: center;

            &::after {
                position: absolute;
                box-sizing: border-box;
                content: ' ';
                pointer-events: none;
                right: $padding-md;
                bottom: 0;
                left: $padding-md;
                border-bottom: 1px solid $cell-border-color;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);

                // .hairline-bottom($cell-border-color, $padding-md, $padding-md);
            }
        }

        &__close {
            position: absolute;
            top: 0;
            right: 0;
            padding: $action-sheet-close-icon-padding;
            color: $action-sheet-close-icon-color;
            font-size: $action-sheet-close-icon-size;
            line-height: inherit;

            &:active {
                color: $action-sheet-close-icon-active-color;
            }
        }
    }
</style>
