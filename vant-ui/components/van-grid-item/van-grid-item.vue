<template>
	<view
		class="van-grid-item"
		:style="{
			'flex-basis': width,
			'width': width,
		  'padding-top' : square ? width : '0'
		}"
		@click.stop="onClick"
		:class="[
			square ? 'van-grid-item--square' : ''
		]"
	>
		<view class="van-grid-item__content" :class="[
			square ? 'van-grid-item__content--square' : '',
			center ? 'van-grid-item__content--center' : ''
		]">
			<van-icon :name="icon" class="van-grid-item__icon" size="48rpx">
					<van-info :dot="dot" :badge="badge"></van-info>
			</van-icon>
			<text class="van-grid-item__text">{{ text }}</text>
		</view>

	</view>
</template>

<script>
export default {
	name: 'van-grid-item',
	props: {
		icon: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		},
		dot: {
			type: Boolean,
			default: false
		},
		badge: {
			type: [Number, String],
		},
		//链接跳转类型，可选值为 navigateTo redirectTo switchTab reLaunch
		linkType: {
			type: String
		},
		url: {
			type: String,
			default: ''
		}
	},
	inject: ['parent'],
	data(){
		return {
		 square: this.parent.square,
		 center: this.parent.center
		}
	},
	computed: {
		// 每个grid-item的宽度
		width() {
			return 100 / Number(this.parent.columnNum) + '%';
		}
	},
	methods: {
		onClick(e){
			if(this.linkType && this.url){
				this.$van.route({
					type: this.linkType,
					url: this.url
				})
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.van-grid-item {
	box-sizing: border-box;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	flex-direction: column;

	/* #ifdef MP */
	position: relative;
	float: left;
	/* #endif */
}

.van-grid-item--square {
	height: 0;
}

.van-grid-item__content {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	height: 100%;
	padding: 32rpx 16rpx;
	background-color: #fff;
}

.van-grid-item__content--square {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}

.van-grid-item__content--center {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}


.van-grid-item__text {
	color: $grid-item-text-color;
	font-size: $grid-item-text-font-size;
	line-height: 1.5;
	word-wrap: break-word;
}
</style>
