<template>
    <view class="wrap">
        <van-waterfall v-model="flowList" ref="uWaterfall">
            <template v-slot:left="{ leftList }">
                <view class="demo-warter" v-for="(item, index) in leftList" :key="index">
                    <!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
                    <!-- #ifndef MP-WEIXIN -->
                    <van-lazyload threshold="-450" border-radius="10" :image="item.image" :index="index"></van-lazyload>
                    <!-- #endif -->

                    <!-- #ifdef MP-WEIXIN -->
                    <view class="demo-img-wrap">
                        <image class="demo-image" :src="item.image" mode="widthFix"></image>
                    </view>
                    <!-- #endif -->

                    <view class="demo-title">{{ item.title }}</view>
                    <view class="demo-price">{{ item.price }}元</view>
                    <view class="demo-tag">
                        <view class="demo-tag-owner">自营</view>
                        <view class="demo-tag-text">放心购</view>
                    </view>
                    <view class="demo-shop">{{ item.shop }}</view>
                    <!-- 微信小程序无效，因为它不支持在template中引入组件 -->
                    <van-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close"
                        @click="remove(item.id)"></van-icon>
                </view>
            </template>
            <template v-slot:right="{ rightList }">
                <view class="demo-warter" v-for="(item, index) in rightList" :key="index">
                    <!-- #ifndef MP-WEIXIN -->
                    <van-lazyload threshold="-450" border-radius="10" :image="item.image" :index="index"></van-lazyload>
                    <!-- #endif -->
                    <!-- #ifdef MP-WEIXIN -->
                    <view class="demo-img-wrap">
                        <image class="demo-image" :src="item.image" mode="widthFix"></image>
                    </view>
                    <!-- #endif -->
                    <view class="demo-title">{{ item.title }}</view>
                    <view class="demo-price">{{ item.price }}元</view>
                    <view class="demo-tag">
                        <view class="demo-tag-owner">自营</view>
                        <view class="demo-tag-text">放心购</view>
                    </view>
                    <view class="demo-shop">{{ item.shop }}</view>
                    <!-- 微信小程序无效，因为它不支持在template中引入组件 -->
                    <van-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close"
                        @click="remove(item.id)"></van-icon>
                </view>
            </template>
        </van-waterfall>
        <van-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></van-loadmore>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                loadStatus: 'loadmore',
                flowList: [],
                list: [{
                        price: 35,
                        title: '北国风光，千里冰封，万里雪飘',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg'
                    },
                    {
                        price: 75,
                        title: '望长城内外，惟余莽莽',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg'
                    },
                    {
                        price: 385,
                        title: '大河上下，顿失滔滔',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
                    },
                    {
                        price: 784,
                        title: '欲与天公试比高',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
                    },
                    {
                        price: 7891,
                        title: '须晴日，看红装素裹，分外妖娆',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg'
                    },
                    {
                        price: 2341,
                        shop: '李白杜甫白居易旗舰店',
                        title: '江山如此多娇，引无数英雄竞折腰',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg'
                    },
                    {
                        price: 661,
                        shop: '李白杜甫白居易旗舰店',
                        title: '惜秦皇汉武，略输文采',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg'
                    },
                    {
                        price: 1654,
                        title: '唐宗宋祖，稍逊风骚',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
                    },
                    {
                        price: 1678,
                        title: '一代天骄，成吉思汗',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
                    },
                    {
                        price: 924,
                        title: '只识弯弓射大雕',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
                    },
                    {
                        price: 8243,
                        title: '俱往矣，数风流人物，还看今朝',
                        shop: '李白杜甫白居易旗舰店',
                        image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
                    }
                ]
            };
        },
        onLoad() {
            this.addRandomData();
        },
        onReachBottom() {
            this.loadStatus = 'loading';
            // 模拟数据加载
            setTimeout(() => {
                this.addRandomData();
                this.loadStatus = 'loadmore';
            }, 1000);
        },
        methods: {
            addRandomData() {
                for (let i = 0; i < 10; i++) {
                    let index = this.$van.random(0, this.list.length - 1);
                    // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
                    let item = JSON.parse(JSON.stringify(this.list[index]));
                    item.id = this.$van.guid();
                    this.flowList.push(item);
                }
            },
            remove(id) {
                this.$refs.uWaterfall.remove(id);
            },
            clear() {
                this.$refs.uWaterfall.clear();
            }
        }
    };
</script>

<style>
    /* page不能写带scope的style标签中，否则无效 */
    page {
        background-color: rgb(240, 240, 240);
    }
</style>

<style lang="scss" scoped>
    .demo-warter {
        border-radius: 8px;
        margin: 5px;
        background-color: #ffffff;
        padding: 8px;
        position: relative;
    }

    .u-close {
        position: absolute;
        top: 32rpx;
        right: 32rpx;
    }

    .demo-img-wrap {}

    .demo-image {
        width: 100%;
        border-radius: 4px;
    }

    .demo-title {
        font-size: 30rpx;
        margin-top: 5px;
        // color: $u-main-color;
    }

    .demo-tag {
        display: flex;
        margin-top: 5px;
    }

    .demo-tag-owner {
        background-color: red;
        color: #ffffff;
        display: flex;
        align-items: center;
        padding: 4rpx 14rpx;
        border-radius: 50rpx;
        font-size: 20rpx;
        line-height: 1;
    }

    .demo-tag-text {
        border: 1px solid red;
        margin-left: 10px;
        border-radius: 50rpx;
        line-height: 1;
        padding: 4rpx 14rpx;
        display: flex;
        align-items: center;
        border-radius: 50rpx;
        font-size: 20rpx;
    }

    .demo-price {
        font-size: 30rpx;
        color: red;
        margin-top: 5px;
    }

    .demo-shop {
        font-size: 22rpx;
        // color: $u-tips-color;
        margin-top: 5px;
    }
</style>
