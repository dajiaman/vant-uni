<template>
    <view class="van-toast" :class="[
            isShow ? 'van-toast-show' : '', 
            'van-toast--' + config.type, 
            'van-toast--' + config.position   
        ]" style="z-index: 2009;">

        <van-loading v-if="showIcon" mode="flower" size="74" />
    
        <view class="van-toast__text">{{ config.message }}</view>
    </view>
</template>

<script>
    import deepMerge from '../../libs/function/deepMerge.js';

    export default {
        name: 'van-toast',
        data() {
            return {
                config: {
                    message: '',
                    // 提示类型，可选值为 loading success fail html , 默认 text
                    type: 'text',
                    //top middle bottom middle
                    position: 'middle',
                    duration: 2000 // 显示的时间，毫秒
                },
                isShow: false,
                timer: null // 定时器
            };
        },
        computed: {
            showIcon() {
                if (['loading', 'success', 'fail'].indexOf(this.config.type) > -1) {
                    return true;
                }
                return false;
            }
        },
        methods: {
            show(options) {
                const defaultConfig = {
                    message: '',
                    // 提示类型，可选值为 loading success fail html , 默认 text
                    type: 'text',
                    //top middle bottom middle
                    position: 'middle',
                    duration: 2000 // 显示的时间，毫秒
                };

                this.config = deepMerge(defaultConfig, options);

                if (this.timer) {
                    // 清除定时器
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.isShow = true;
                this.timer = setTimeout(() => {
                    // 倒计时结束，清除定时器，隐藏toast组件
                    this.isShow = false;
                    clearTimeout(this.timer);
                    this.timer = null;
                    // 判断是否存在callback方法，如果存在就执行
                    typeof this.config.callback === 'function' && this.config.callback();
                    this.timeEnd();
                }, this.config.duration);
            },
            // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
            hide() {
                this.isShow = false;
                if (this.timer) {
                    // 清除定时器
                    clearTimeout(this.timer);
                    this.timer = null;
                }
            },
            // 倒计时结束之后，进行的一些操作
            timeEnd() {},


            loading(options) {
                this.show({
                    type: 'loading',
                    ...options
                });
            },

            success(message) {
                this.show({
                    type: 'success',
                    message: message
                });
            },
            fail(message) {
                this.show({
                    type: 'fail',
                    message: message
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../libs/css/style.components.scss';

    .van-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: content-box;

        // hack for avoid max-width when use left & fixed
        width: $toast-default-width;
        max-width: $toast-max-width;
        min-height: $toast-default-min-height;
        padding: $toast-default-padding;
        color: $toast-text-color;
        font-size: $toast-font-size;
        line-height: $toast-line-height;

        // allow newline charactor
        white-space: pre-wrap;
        text-align: center;
        word-wrap: break-word;
        background-color: $toast-background-color;
        border-radius: $toast-border-radius;
        transform: translate3d(-50%, -50%, 0);

        opacity: 0;

        &--unclickable {
            // lock scroll
            overflow: hidden;

            // should not add pointer-events: none directly to body tag
            // that will cause unexpected tap-highlight-color in mobile safari
            * {
                pointer-events: none;
            }
        }

        &--text,
        &--html {
            width: fit-content;
            min-width: $toast-text-min-width;
            min-height: 0;
            padding: $toast-text-padding;

            .van-toast__text {
                margin-top: 0;
            }
        }

        &--top {
            top: $toast-position-top-distance;
        }

        &--bottom {
            top: auto;
            bottom: $toast-position-bottom-distance;
        }

        &__icon {
            font-size: $toast-icon-size;
        }

        &__loading {
            padding: $padding-base;
            color: $toast-loading-icon-color;
        }

        &__text {
            margin-top: $padding-xs;
        }
    }

    .van-toast-show {
        opacity: 1;
    }
</style>
