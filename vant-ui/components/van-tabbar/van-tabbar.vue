<template>
	<view
		class="van-tabbar"
		:class="[
			fixed ? 'van-tabbar--fixed' : 'van-tabbar--unfit', 
			border ? 'van-hairline--top-bottom' : ''
		]"
		:style="{
			zIndex: zIndex
		}"
	>
		<view
			class="van-tabbar-item"
			v-for="(item, index) in list"
			:key="index"
			:style="{
				color: value == index ? activeColor : ''
			}"
			:class="[ value == index ? 'van-tabbar-item--active' : '']"
			@click="onClick(index, item)"
		>
			<view class="van-tabbar-item__icon">
				<van-icon :name="item.icon"></van-icon>
				<van-info :dot="item.dot" :badge="item.badge" v-if="item.badge && item['badge']"></van-info>
			</view>
			<view class="van-tabbar-item__text">{{ item.text }}</view>
		</view>

		<!-- 		<van-tabbar-item
			v-for="(item, index) in list"
			:key="index"
			@click="onClick(index, item)"
			:dot="item.dot"
			:badge="item.badge"
			:icon="item.icon"
			:active="value === index ? true : false"
		>
			{{ item.text }}
		</van-tabbar-item> -->
	</view>
</template>

<script>
export default {
	props: {
		route: Boolean,
		zIndex: [Number, String],
		//固定在底部时，是否在标签位置生成一个等高的占位元素
		placeholder: Boolean,
		activeColor: {
			type: String,
			default: '#1989fa'
		},
		inactiveColor: {
			type: String,
			default: '7d7e80'
		},
		value: {
			type: [Number, String],
			default: 0
		},
		border: {
			type: Boolean,
			default: true
		},
		fixed: {
			type: Boolean,
			default: true
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: null
		},

		/**
		 * 	// item 数组
		 * dot: {
		// 	type: Boolean,
		// 	default: false
		// },
		// icon: { 
		// 	type :String
		// },
		// name: [Number, String],
		// badge:  { 
		// 	type: [Number, String],
		// },
		// active: {
		// 	type: Boolean,
		// 	default: false 
		// },
			// text: {
			// 	type: String
			// }
		 */
		list: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	provide() {
		return {
			parent: this
		};
	},
	methods: {
		onClick(index, item) {

			this.$emit('click', parseInt(index), item);
			
			this.$forceUpdate()
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.van-tabbar {
	z-index: $tabbar-z-index;
	display: flex;
	box-sizing: content-box;
	width: 100%;
	height: $tabbar-height;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	background-color: $tabbar-background-color;

	&--fixed {
		position: fixed;
		bottom: 0;
		left: 0;
	}

	&--unfit {
		padding-bottom: 0;
	}
}



.van-tabbar-item {
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: $tabbar-item-text-color;
	font-size: $tabbar-item-font-size;
	line-height: $tabbar-item-line-height;
	cursor: pointer;

	&__icon {
		position: relative;
		margin-bottom: $tabbar-item-margin-bottom;
		font-size: $tabbar-item-icon-size;

		.van-icon {
			display: block;
			min-width: 1em;
		}

		img {
			display: block;
			height: $tabbar-item-icon-size;
		}
	}

	&--active {
		color: $tabbar-item-active-color;
	}

	.van-info {
		margin-top: 2px;
	}
}
</style>
