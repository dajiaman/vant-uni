<template>
    <button class="van-button" :hover-class="getHoverClass" :class="[
			'van-button--' + type,
			'van-button--' + size,
			plain ? 'van-button--plain' : '',
			hairline ? 'van-button--hairline' : '',
			disabled ? 'van-button--disabled' : '',
			loading ? 'van-button--loading' : '',
			square ? 'van-button--square' : '',
			round ? 'van-button--round' : '',
			block ? 'van-button--block' : ''
		]" :disabled="disabled" :loading="loading" @click="click($event)" :style="baseStyle"
        :open-type="disabled ? '' : openType" :form-type="formType" :business-id="businessId"
        :session-from="sessionFrom" :app-parameter="appParameter" :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath" :send-message-img="sendMessageImg" :show-message-card="showMessageCard"
        @getphonenumber="getphonenumber" @getuserinfo="getuserinfo" @error="error" @opensetting="opensetting"
        @contact="contact" @launchapp="launchapp" @chooseavatar="chooseavatar" :dataset="dataset">
        <view class="van-button__content">
            <van-loading class="van-button__loading" v-if="loading" :size="loadingSize" color="#fff" />
            <text class="van-button__text" v-if="loading && loadingText">{{ loadingText }}</text>
            <van-icon class="van-button__icon" :name="icon" v-if="icon"></van-icon>

            <!-- #ifndef APP-NVUE -->
            <text class="van-button__text" v-if="$slots['default'] && !text">
                {{ text }}
                <slot></slot>
            </text>
            
            <text class="van-button__text" v-if="text">
                {{ text }}
            </text>
            <!-- #endif -->
            
            <!-- #ifdef APP-NVUE -->
            <text class="van-button__text" v-if="text ">
                {{ text }}
            </text>

            <!-- #endif -->
        </view>
    </button>
</template>

<script>
    export default {
        name: 'van-button',
        props: {
            // 按钮文字 
            // nvue中slot无法控制文字的样式, 使用text方式传入
            text: String,
            // 左侧图标名称或图片链接，等同于 Icon 组件的 name 属性
            icon: String,
            // 是否为块级元素
            block: Boolean,
            // 是否为朴素按钮
            plain: Boolean,
            // 是否为圆形按钮
            round: Boolean,
            square: Boolean,
            // 是否显示为加载状态
            loading: Boolean,
            // 加载状态提示文字
            loadingText: String,
            // 加载图标类型，可选值为 spinner
            loadingType: String,
            // 是否使用 0.5px 边框
            hairline: {
                type: Boolean,
                default: false
            },
            // 是否禁用按钮
            disabled: Boolean,
            iconPrefix: String,
            nativeType: String,
            // 按下的类名
            hoverClass: {
                type: String,
                default: ''
            },
            tag: {
                type: String,
                default: 'button'
            },
            // 可选值为 primary success warning danger
            type: {
                type: String,
                default: 'default'
            },
            // 尺寸，可选值为 large small mini
            size: {
                type: String,
                default: 'normal'
            },
            // 加载图标大小，默认单位为
            loadingSize: {
                type: Number,
                default: 32
            },
            // 按钮颜色，支持传入 linear-gradient 渐变色
            color: String,
            // 开放能力，具体请看uniapp稳定关于button组件部分说明
            // https://uniapp.dcloud.io/component/button
            openType: {
                type: String
            },
            // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
            // 取值为submit（提交表单），reset（重置表单）
            formType: {
                type: String,
                default: ''
            },
            // 客服消息子商户 id
            businessId: {
                type: [String]
            },
            // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
            // 只微信小程序、QQ小程序有效
            appParameter: {
                type: String,
                default: ''
            },
            // 会话来源，open-type="contact"时有效。只微信小程序有效
            sessionFrom: {
                type: String,
                default: ''
            },
            // 会话内消息卡片标题，open-type="contact"时有效
            // 默认当前标题，只微信小程序有效
            sendMessageTitle: {
                type: String,
                default: ''
            },
            // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
            // 默认当前分享路径，只微信小程序有效
            sendMessagePath: {
                type: String,
                default: ''
            },
            // 会话内消息卡片图片，open-type="contact"时有效
            // 默认当前页面截图，只微信小程序有效
            sendMessageImg: {
                type: String,
                default: ''
            },
            // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
            // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
            showMessageCard: {
                type: Boolean,
                default: false
            },
            // 额外传参参数
            // 按钮 dataset，open-type 为 share 时，可在 onShareAppMessage 事件的 event.target.dataset.detail 中看到传入的值
            dataset: null
        },
        data() {
            return {
                baseStyle: ''
            };
        },
        computed: {
            // 当没有传bgColor变量时，按钮按下去的颜色类名
            getHoverClass() {
                // 如果开启水波纹效果，则不启用hover-class效果
                if (this.loading || this.disabled || this.ripple) return '';
                let hoverClass = '';
                hoverClass = this.type ? 'van-button--' + this.type + '--hover' : '';
                return hoverClass;
            }
        },
        created() {
            var color = this.color;
            var style = '';
            if (color) {
                style += 'color: ' + (this.plain ? color : 'white') + ';';
                if (!this.plain) {
                    // Use background instead of backgroundColor to make linear-gradient work
                    style += 'background: ' + color + ';';
                }
                // hide border when color is linear-gradient
                if (color.indexOf('gradient') !== -1) {
                    style += 'border: 0;';
                } else {
                    style += 'border-color: ' + color + ';';
                }
            }
            if (style !== this.baseStyle) {
                this.baseStyle = style;
            }
        },
        methods: {
            click(event) {
                if (!this.disabled) {
                    this.$emit('click');
                }
            },
            // 下面为对接uniapp官方按钮开放能力事件回调的对接
            getphonenumber(res) {
                this.$emit('getphonenumber', res);
            },
            getuserinfo(res) {
                this.$emit('getuserinfo', res);
            },
            error(res) {
                this.$emit('error', res);
            },
            // 客服消息回调
            contact(res) {
                this.$emit('contact', res);
            },
            opensetting(res) {
                this.$emit('opensetting', res);
            },
            launchapp(res) {
                this.$emit('launchapp', res);
            },
            // 当 open-type 的值为 chooseAvatar 时，选择头像之后的回调
            chooseavatar(res) {
                a
                this.$emit('chooseavatar', res);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../libs/css/style.components.scss';

    .van-button {
        position: relative;
        display: inline-flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        height: $button-default-height;
        margin: 0;
        padding: 0;
        font-size: $button-default-font-size;
        line-height: $button-default-height;
        border: 0;
        border-radius: $button-border-radius;
        cursor: pointer;
        z-index: 1;
        transition: opacity $animation-duration-fast;
        -webkit-appearance: none;

        &:after {
            border: 1rpx solid transparent;
        }

        &:active::before {
            opacity: 0.1;
        }

        &--loading,
        &--disabled {
            &::before {
                display: none;
            }
        }

        &--default {
            color: $button-default-color;
            background-color: $button-default-background-color;
            border: $button-border-width solid $button-default-border-color;

            &--hover {
                background-color: rgba($button-default-border-color, 0.8);
                border: $button-border-width solid $button-default-border-color;
            }
        }

        &--primary {
            color: $button-primary-color;
            background-color: $button-primary-background-color;
            border: $button-border-width solid $button-primary-border-color;

            &--hover {
                background-color: rgba($button-primary-background-color, 0.8);
                border: $button-border-width solid $button-primary-border-color;
            }
        }

        &--info {
            color: $button-info-color;
            background-color: $button-info-background-color;
            border: $button-border-width solid $button-info-border-color;

            &--hover {
                background-color: rgba($button-info-background-color, 0.8);
                border: $button-border-width solid $button-info-border-color;
            }
        }

        &--danger {
            color: $button-danger-color;
            background-color: $button-danger-background-color;
            border: $button-border-width solid $button-danger-border-color;

            &--hover {
                background-color: rgba($button-danger-background-color, 0.8);
                border: $button-border-width solid $button-danger-border-color;
            }
        }

        &--warning {
            color: $button-warning-color;
            background-color: $button-warning-background-color;
            border: $button-border-width solid $button-warning-border-color;

            &--hover {
                background-color: rgba($button-warning-background-color, 0.8);
                border: $button-border-width solid $button-warning-border-color;
            }
        }

        &--plain {
            background-color: $button-plain-background-color;

            &.van-button--primary {
                color: $button-primary-background-color;
            }

            &.van-button--info {
                color: $button-info-background-color;
            }

            &.van-button--danger {
                color: $button-danger-background-color;
            }

            &.van-button--warning {
                color: $button-warning-background-color;
            }
        }

        &--large {
            width: 100%;
            height: $button-large-height;
        }

        &--normal {
            padding: 0 30rpx;
            font-size: $button-normal-font-size;
        }

        &--small {
            height: $button-small-height;
            padding: 0 $padding-xs;
            font-size: $button-small-font-size;
        }

        &__loading {
            color: inherit;
            font-size: inherit;
        }

        &--mini {
            height: $button-mini-height;
            padding: 0 $padding-base;
            font-size: $button-mini-font-size;

            &+.van-button--mini {
                margin-left: $padding-base;
            }
        }

        &--block {
            display: block;
            width: 100%;
        }

        &--disabled {
            cursor: not-allowed;
            // opacity: $button-disabled-opacity;
            border-color: transparent;
        }

        &--loading {
            cursor: default;
        }

        &--round {
            border-radius: $button-round-border-radius;
        }

        &--square {
            border-radius: 0;
        }

        // align-items are ignored when flex container is a button in legacy safari
        // see: https://bugs.webkit.org/show_bug.cgi?id=169700
        &__content {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;

            // fix icon vertical align
            // see: https://github.com/vant-ui/vant/issues/7617
            &::before {
                content: ' ';
            }
        }

        &__icon {
            min-width: 1em;
            font-size: 1.2em;
            line-height: inherit;
        }

        &__icon+&__text,
        &__loading+&__text {
            margin-left: 10rpx;
        }

        &--hairline {
            border-width: 0;

            &::after {
                border-color: inherit;
                border-radius: $button-border-radius * 2;
            }

            &.van-button--round::after {
                border-radius: $button-round-border-radius;
            }

            &.van-button--square::after {
                border-radius: 0;
            }
        }
    }
</style>
