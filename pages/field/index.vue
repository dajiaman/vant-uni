<template>
    <view class="van-doc-demo-section demo-field">
        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">基础用法</h2>
            <van-cell-group>
                <van-field :value="value" label="文本" placeholder="请输入用户名" bind:change="onChange" />
            </van-cell-group>
        </view>

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">自定义类型</h2>

            <van-field v-model="text" :label="textLabel" :placeholder="textPlaceholder" />
            <van-field v-model="phone" type="tel" :label="phoneLabel" :placeholder="phonePlaceholder" />
            <van-field v-model="digit" type="digit" :label="digitLabel" :placeholder="digitPlaceholder" />
            <van-field v-model="number" type="number" :label="numberLabel" :placeholder="numberPlaceholder" />
            <van-field v-model="password" type="password" :label="passwordLabel" :placeholder="passwordPlaceholder" />
        </view>

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">禁用类型</h2>

            <van-field :value="inputReadonly" :label="text" readonly />
            <van-field :value="inputDisabled" :label="text" disabled />
        </view>

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">错误</h2>

            <van-field v-model="username" error required :label="username" :placeholder="usernamePlaceholder" />
            <van-field v-model="phone" required :label="phone" :placeholder="phonePlaceholder"
                :error-message="phoneError" />
        </view>

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">插入按钮</h2>

            <van-field v-model="sms" center clearable label="短信验证码" :placeholder="smsPlaceholder">
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
        </view>

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">插入按钮</h2>

            <van-field v-model="value" autosize rows="1" type="textarea" :label="message" :placeholder="placeholder" />
        </view>



        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">显示图标</h2>

            <van-field :label="text" left-icon="smile-o" right-icon="warning-o" :placeholder="showIcon" />
            <van-field clearable :label="text" left-icon="music-o" :placeholder="showClearIcon" />

        </view>



    </view>
</template>

<script>
    export default {
        data() {
            return {
                value: 'xx',

                password: '密码',
                passwordLabel: "密码",
                text: '文本',
                textLabel: "文本",
                digit: '',
                digitLabel: "整数",
                phone: '手机号',
                phoneLabel:"手机号",
                number: '数字',
                numberLabel: "数字",
                customType: '自定义类型',
                smsPlaceholder: '请输入短信验证码',
                textPlaceholder: '请输入文本',
                digitPlaceholder: '请输入整数',
                phonePlaceholder: '请输入手机号',
                numberPlaceholder: '请输入数字（支持小数）',
                passwordPlaceholder: '请输入密码',

                inputReadonly: '输入框只读',
                inputDisabled: '输入框已禁用',

                username: '用户名',
                usernamePlaceholder: '请输入用户名',
                phone: '手机号',
                errorInfo: '错误提示',
                phoneError: '手机号格式错误',
                phonePlaceholder: '请输入手机号',

                sms: '短信验证码',
                sendSMS: '发送验证码',
                insertButton: '插入按钮',
                smsPlaceholder: '请输入短信验证码',

                message: '留言',
                autosize: '高度自适应',
                placeholder: '请输入留言',


                showIcon: '显示图标',
                showClearIcon: '显示清除图标',
            };
        }
    };
</script>

<style>
    page {
        background-color: #f7f8fa;
    }

    .van-doc-demo-section {
        box-sizing: border-box;
        min-height: calc(100vh - 56px);
        padding-bottom: 20px;
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
</style>
