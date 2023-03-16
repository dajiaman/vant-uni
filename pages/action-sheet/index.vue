<template>
    <view class="van-doc-demo-section demo-action-sheet">

        <view class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">基础用法</h2>
            <van-cell title="基础用法" is-link @click="click1"></van-cell>
        </view>


        <van-action-sheet v-model="show" cancel-text="取消" description="这是一段描述信息" :actions="actions" @select="onSelect"
            @cancel="onCancel"></van-action-sheet>


        <van-toast ref="toast"></van-toast>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                actions: [{
                        name: '选项一'
                    }, {
                        name: '选项二'
                    }, {
                        name: '选项三',
                        subname: '描述信息'
                    },
                    {
                        name: '选项四'
                    }
                ],
            };
        },
        methods: {
            onSelect(item) {
                // 默认情况下点击选项时不会自动收起
                // 可以通过 close-on-click-action 属性开启自动收起
                this.show = false;


                this.$refs.toast.show({
                    type: 'text',
                    message: "点击" + item.name
                })

            },

            onCancel() {

                this.show = false;

                this.$refs.toast.show({
                    type: 'text',
                    message: "取消"
                })
            },

            click1() {
                this.show = true;
            }

        },
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
