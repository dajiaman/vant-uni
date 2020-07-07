<template>
	<view class="member-center__user-info-wrapper">
		<image mode="scaleToFill" class="background-img" :src="background"></image>
		<view
			class="member-center__user-info"
			:class="[positionClass]"
			:style="{
				height: '344rpx'
			}"
		>
			<view class="user-info__avatar"><image class="avatar" :src="avatar"></image></view>
			<view class="user-info__info">
				<view class="user-info__username">{{ nickname }}</view>
			</view>
			<view class="user-info__code">
				<van-icon name="qr" class="user-info__code-img"></van-icon>
				<text>会员码</text>
			</view>
			<view class="user-info__level-wrapper"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'member-info',
	props: {
		position: {
			type: String,
			default: 'left'
		},
		avatar: {
			type: String,
			default: '//b.yzcdn.cn/showcase/membercenter/2018/08/06/default_avatar@2x.png'
		},
		nickname: {
			type: String
		},
		background: {
			type: String,
			default: 'http://img.yzcdn.cn/upload_files/2019/01/31/Fp3kIohim8ZiB1yLepoMMW8is_qY.png'
		}
	},
	computed: {
		positionClass() {
			if (this.position == 'left') {
				return 'avatar-at-left';
			} else if (this.position == 'center') {
				return 'avatar-at-top';
			}
			return '';
		}
	}
};
</script>

<style lang="scss">
.user-info__level-wrapper {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
}

.user-info__level-1 {
	position: absolute;
	bottom: 0;
	left: 3%;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: justify;
	justify-content: space-between;
	width: 94%;
	height: 40px;
	color: #fff;
	background: url(https://img.yzcdn.cn/public_files/2019/01/07/2a995b38e57f128e430d17629da437d9.png);
	background-size: cover;
	border-radius: 8px 8px 0 0;
	box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.2);
}

.user-info__level-1 .name {
	display: block;
	-ms-flex: 1;
	flex: 1;
	-ms-flex-item-align: start;
	align-self: flex-start;
	padding-left: 10px;
	overflow: hidden;
	font-size: 12px;
	line-height: 40px;
	white-space: nowrap;
	text-overflow: ellipsis;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	color: #ffdea0;
}

.user-info__level-1 .name:before {
	background-image: url(https://b.yzcdn.cn/member-center/free-icon-1.png);
}

.user-info__level-1 .name--vip:before,
.user-info__level-1 .name:before {
	display: inline-block;
	width: 16px;
	height: 12px;
	margin-right: 5px;
	vertical-align: -1px;
	background-size: cover;
	content: ' ';
}

.user-info__level-1 .name--vip:before {
	background-image: url(https://b.yzcdn.cn/member-center/vip-icon-1.png);
}

.user-info__level-1 .become-member,
.user-info__level-1 .level {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	margin-right: 10px;
	font-size: 12px;
	line-height: 12px;
}

.user-info__level-1 .become-member .van-icon,
.user-info__level-1 .level .van-icon {
	margin-left: 2px;
	font-size: 12px;
}

.user-info__level-2 {
	position: absolute;
	top: -90px;
	right: -60px;
	width: 179px;
	height: 99px;
	overflow: hidden;
	color: #e3c86f;
	background-image: linear-gradient(147deg, #414653, #373b44 74%);
	border-radius: 4px;
	box-shadow: 2px 2px 16px 0 rgba(0, 0, 0, 0.2);
	transform: rotate(15deg);
	transform-origin: left;
}

.user-info__level-2 .level2-header {
	height: 25px;
	padding-left: 10px;
}

.user-info__level-2 .level2-header .shop-name {
	display: block;
	max-width: 80px;
	overflow: hidden;
	font-size: 10px;
	line-height: 10px;
	white-space: nowrap;
	text-overflow: ellipsis;
	vertical-align: text-bottom;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.user-info__level-2 .level2-header .shop-name:before {
	display: inline-block;
	width: 14px;
	height: 10px;
	margin-top: 8px;
	margin-right: 5px;
	vertical-align: -2px;
	background-image: url(https://img.yzcdn.cn/public_files/2019/02/18/9c5e867bf80c7de1f7a7d58586a88753.png);
	background-size: cover;
	content: ' ';
}

.user-info__level-2 .level2-body {
	height: 74px;
	margin: 0 0.5px 0.5px;
	padding: 5px 0 0 9px;
	background-image: linear-gradient(134deg, #4d525e, #343841 79%);
}

.user-info__level-2 .level2-body .level {
	height: 16px;
	padding: 0 2px 0 8px;
	color: #e3c86f;
	font-size: 10px;
	background: #646875;
	border: 0.5px solid #e3c86f;
}

.user-info__level-2 .level2-body .level .van-button__text {
	line-height: 15px;
}

.user-info__level-2 .level2-body .level-name {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
}

.user-info__level-2 .level2-body .level-name span {
	display: block;
	max-width: 80px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.user-info__level-2 .level2-body .level-name .van-icon-arrow {
	margin-left: 2px;
	font-weight: 700;
	transform: scale(0.7);
	transform-origin: 0;
}

.user-info__level-2 .level2-vip {
	position: absolute;
	top: 53px;
	left: 4px;
	width: 82px;
	height: 50px;
}

.user-info__level-3 {
	position: absolute;
	right: 3%;
	bottom: -35px;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: justify;
	justify-content: space-between;
	width: 94%;
	height: 70px;
	color: #886c11;
	background: url(https://img.yzcdn.cn/public_files/2019/02/20/9a0bb2c59bf55531f2dbfddd2b2ce0da.png);
	background-size: 100% 100%;
	border-radius: 8px;
}

.user-info__level-3 .name {
	display: block;
	-ms-flex: 1;
	flex: 1;
	-ms-flex-item-align: start;
	align-self: flex-start;
	padding-left: 10px;
	overflow: hidden;
	font-size: 12px;
	line-height: 40px;
	white-space: nowrap;
	text-overflow: ellipsis;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.user-info__level-3 .name:before {
	background-image: url(https://b.yzcdn.cn/member-center/free-icon-3.png);
}

.user-info__level-3 .name--vip:before,
.user-info__level-3 .name:before {
	display: inline-block;
	width: 16px;
	height: 12px;
	margin-right: 5px;
	vertical-align: -1px;
	background-size: cover;
	content: ' ';
}

.user-info__level-3 .name--vip:before {
	background-image: url(https://b.yzcdn.cn/member-center/vip-icon-3.png);
}

.user-info__level-3 .become-member,
.user-info__level-3 .level {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	height: 22px;
	margin-right: 10px;
	padding: 0 4px 0 10px;
	color: #9e8329;
	font-size: 12px;
	background: hsla(0, 0%, 100%, 0.6);
	border-radius: 12px;
	box-shadow: 0 2px 8px 0 rgba(185, 157, 51, 0.2);
}

.user-info__level-3 .become-member .van-icon,
.user-info__level-3 .level .van-icon {
	margin-top: 1px;
	font-size: 12px;
	transform: scale(0.5);
}

.user-info__level-3 .level {
	background: hsla(0, 0%, 100%, 0.6);
	box-shadow: 0 2px 8px 0 rgba(187, 157, 51, 0.2);
}

.user-info__level-3 .level3-member {
	position: absolute;
	bottom: 10px;
	left: 14px;
	width: 126px;
	height: 19px;
}

.member-center__user-info {
	position: relative;
	display: flex;
}

.member-center__user-info-wrapper {
	margin-bottom: 20rpx;
	background: #fff;
}

.member-center__user-info .user-info__avatar {
	width: 120rpx;
	height: 120rpx;
	overflow: hidden;
	border: 1rpx solid #fff;
	border-radius: 50%;
}

.member-center__user-info .user-info__avatar .avatar {
	width: 100%;
	height: 100%;
}

.member-center__user-info .user-info__info {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-direction: column;
	flex-direction: column;
	-ms-flex-align: start;
	align-items: flex-start;
}

.member-center__user-info .user-info__info .member-center__become-member,
.member-center__user-info .user-info__info .member-grade {
	margin-top: 10rpx;
}

.member-center__user-info .user-info__username {
	max-width: 400rpx;
	overflow: hidden;
	font-weight: 700;
	font-size: 40rpx;
	line-height: 60rpx;
	white-space: nowrap;
	text-align: left;
	text-overflow: ellipsis;
	color: #333333;
}

.member-center__user-info .user-info__growth {
	padding: 4rpx 16rpx;
	color: #fddda5;
	font-size: 22rpx;
	line-height: 32rpx;
	letter-spacing: 0;
	background-image: radial-gradient(circle at 2% 85%, #444039 0, #37332c 82%);
	border: 1rpx solid #171717;
	border-radius: 20rpx;
}

.member-center__user-info .user-info__sign {
	position: absolute;
	top: 40rpx;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: distribute;
	justify-content: space-around;
	box-sizing: border-box;
	width: auto;
	height: 44rpx;
	padding: 0 20rpx;
	color: #fff;
	font-size: 24rpx;
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 22rpx;
	right: 180rpx;
}

.member-center__user-info .user-info__sign-img {
	width: 24rpx;
	height: 24rpx;
	margin-right: 10rpx;
}

.member-center__user-info .user-info__code {
	position: absolute;
	top: 40rpx;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: distribute;
	justify-content: space-around;
	box-sizing: border-box;
	width: auto;
	height: 44rpx;
	padding: 0 20rpx;
	color: #fff;
	font-size: 24rpx;
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 22rpx;
	right: 24rpx;
}

.member-center__user-info .user-info__code-img {
	width: 24rpx;
	height: 24rpx;
	margin-right: 10rpx;
}

.member-center__user-info .user-info__bind-wrapper {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 200rpx;
}

.member-center__user-info.avatar-at-top {
	-ms-flex-direction: column;
	flex-direction: column;
}

.member-center__user-info.avatar-at-top,
.member-center__user-info.avatar-at-top .user-info__info {
	-ms-flex-align: center;
	align-items: center;
}

.member-center__user-info.avatar-at-top .user-info__info {
	-ms-flex-direction: row;
	flex-direction: row;
}

.member-center__user-info.avatar-at-top .user-info__info .user-info__growth {
	margin-left: 20rpx;
}

.member-center__user-info.avatar-at-top .user-info__username {
	font-size: 40rpx;
	line-height: 1;
}

.member-center__user-info.avatar-at-top .member-center__become-member,
.member-center__user-info.avatar-at-top .member-grade {
	transform-origin: center;
}

.member-center__user-info.avatar-at-right {
	-ms-flex-direction: row-reverse;
	flex-direction: row-reverse;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: justify;
	justify-content: space-between;
	padding: 0 30rpx;
}

.member-center__user-info.avatar-at-right .user-info__info {
	-ms-flex-align: start;
	align-items: flex-start;
}

.member-center__user-info.avatar-at-left {
	-ms-flex-align: center;
	align-items: center;
	padding: 0 30rpx;
}

.member-center__user-info.avatar-at-left .user-info__avatar {
	margin-bottom: 68rpx;
}

.member-center__user-info.avatar-at-left .user-info__info {
	-ms-flex-align: start;
	align-items: flex-start;
	margin-bottom: 68rpx;
	margin-left: 30rpx;
}

.member-center__become-member {
	display: -ms-inline-flexbox;
	display: inline-flex;
	-ms-flex-align: center;
	align-items: center;
	height: 40rpx;
	padding: 0 8rpx 0 20rpx;
	color: #fff;
	font-size: 24rpx;
	background: #c7c7c7;
	border-radius: 24rpx;
	transform: scale(0.8);
	transform-origin: 0;
}

.member-center__become-member .van-icon {
	margin-left: 8px;
	font-size: 24rpx;
}

.user-info__bind {
	display: -ms-flexbox;
	display: flex;
	-ms-flex-direction: row;
	flex-direction: row;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: justify;
	justify-content: space-between;
	height: 100rpx;
	margin-bottom: 20rpx;
	padding: 0 30rpx;
	color: #111;
	font-size: 24rpx;
	background: #fff;
}

.background-img {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 344rpx;
}
</style>
