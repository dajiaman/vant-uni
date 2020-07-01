<template>
	<view
		class="van-notice-bar"
		:class="[wrapable ? 'van-notice-bar--wrapable' : '']"
		:style="{
			backgroundColor: background,
			color: color
		}"
		@click.stop="click"
	>
		<van-icon :name="leftIcon" v-if="leftIcon" class="van-notice-bar__left-icon"></van-icon>

		<view class="van-notice-bar__wrap" id="van-notice-wrap">
			<view
				class="van-notice-bar__content"
				id="van-notice-content"
				:style="{
					animationDuration: duration,
					animationPlayState: animationPlayState
				}"
				@animationend="onTransitionEnd"
			>
				{{ text }}
			</view>
		</view>

		<van-icon class="van-notice-bar__right-icon" v-if="mode" :name="rightIcon" @click.stop="onClickIcon"></van-icon>
	</view>
</template>

<script>
import { isDef } from '../../libs/utils/index.js';

export default {
	props: {
		leftIcon: String,
		text: String,
		wrapable: {
			type: Boolean,
			default: false
		},
		scrollable: {
			type: Boolean,
			default: true
		},
		color: {
			type: String,
			default: '#ed6a0c'
		},
		background: {
			type: String,
			default: '#fffbe8'
		},
		//通告栏模式，可选值为 closeable link
		mode: {
			type: String
		},

		delay: {
			type: [Number, String],
			default: 1
		},
		speed: {
			type: [Number, String],
			default: 50
		}
	},
	data() {
		return {
			show: true,
			offset: 0,
			duration: 0,
			wrapWidth: 0,
			contentWidth: 0,

			contentStyle: {},

			animationDuration: '10s', // 动画执行时间
			animationPlayState: 'paused' // 动画的开始和结束执行
		};
	},

	watch: {
		playState(val) {
			if (val == 'play') this.animationPlayState = 'running';
			else this.animationPlayState = 'paused';
		},
		speed(val) {
			this.initSize();
		}
	},

	mounted() {
		this.$nextTick(() => {
			this.initSize();
		});
	},
	computed: {
		rightIcon() {
			if (this.mode === 'closeable') {
				return 'cross';
			} else if (this.mode == 'link') {
				return 'arrow';
			}
		}
	},
	methods: {
		onClickIcon(event) {
			if (this.mode === 'closeable') {
				this.show = false;
				this.$emit('close', event);
			}
		},

		click(e) {
			this.$emit('click', e);
		},

		onTransitionEnd() {
			this.duration = 0;

			// wait for Vue to render offset
			this.$nextTick(() => {
				this.$emit('replay');
			});
		},

		reset() {
			this.offset = 0;
			this.duration = 0;
			this.wrapWidth = 0;
			this.contentWidth = 0;
		},

		initSize() {
			this.reset();

			if (this.scrollable === false) {
				return;
			}

			let query = [];
			let wrapWidth = 0;
			let contentWidth = 0;

			let textQuery = new Promise((resolve, reject) => {
				uni
					.createSelectorQuery()
					.in(this)
					.select(`#van-notice-content`)
					.boundingClientRect()
					.exec(ret => {
						this.contentWidth = ret[0].width;
						resolve();
					});
			});

			let wrapQuery = new Promise((resolve, reject) => {
				uni
					.createSelectorQuery()
					.in(this)
					.select(`#van-notice-wrap`)
					.boundingClientRect()
					.exec(ret => {
						this.wrapWidth = ret[0].width;
						resolve();
					});
			});

			query.push(textQuery);
			query.push(wrapQuery);

			Promise.all(query).then(() => {
				// 根据t=s/v(时间=路程/速度)，这里为何不需要加上#u-notice-box的宽度，因为中设置了.u-notice-content样式中设置了padding-left: 100%
				// 恰巧计算出来的结果中已经包含了#u-notice-box的宽度
				this.duration = `${this.contentWidth / uni.upx2px(this.speed)}s`;

				// 这里必须这样开始动画，否则在APP上动画速度不会改变(HX版本2.4.6，IOS13)
				this.animationPlayState = 'paused';
				setTimeout(() => {
					if (this.contentWidth > this.wrapWidth) {
						this.animationPlayState = 'running';
					}
				}, 10);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.van-notice-bar {
	position: relative;
	display: flex;
	align-items: center;
	height: $notice-bar-height;
	padding: $notice-bar-padding;
	color: $notice-bar-text-color;
	font-size: $notice-bar-font-size;
	line-height: $notice-bar-line-height;
	background-color: $notice-bar-background-color;

	&__left-icon,
	&__right-icon {
		min-width: $notice-bar-icon-min-width;
		font-size: $notice-bar-icon-size;
	}

	&__right-icon {
		text-align: right;
		cursor: pointer;
	}

	&__wrap {
		position: relative;
		display: flex;
		flex: 1;
		align-items: center;
		height: 100%;
		overflow: hidden;
	}

	&__content {
		position: absolute;
		white-space: nowrap;
		// transition-timing-function: linear;

		animation: u-loop-animation 10s linear infinite both;

		&.van-ellipsis {
			max-width: 100%;
		}
	}

	&--wrapable {
		height: auto;
		padding: $notice-bar-wrapable-padding;

		.van-notice-bar {
			&__wrap {
				height: auto;
			}

			&__content {
				position: relative;
				white-space: normal;
				word-wrap: break-word;
			}
		}
	}
}

@keyframes u-loop-animation {
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(-100%, 0, 0);
	}
}
</style>
