<template>
	<view class="van-count-down">
		{{ formattedTime }}
	</view>
</template>

<script>
import { isSameSecond, parseTimeData, parseFormat } from './utils.js';

export default {
	name: 'van-count-down',
	props: {
		millisecond: Boolean,
		time: {
			type: [Number, String],
			default: 0
		},
		format: {
			type: String,
			default: 'HH:mm:ss'
		},
		autoStart: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			remain: 0
		};
	},

	computed: {
		timeData() {
			return parseTimeData(this.remain);
		},

		formattedTime() {
			return parseFormat(this.format, this.timeData);
		}
	},
	watch: {
		time: {
			immediate: true,
			handler: 'reset'
		}
	},
	methods: {
		// @exposed-api
		start() {
			if (this.counting) {
				return;
			}

			this.counting = true;
			this.endTime = Date.now() + this.remain;
			this.tick();
		},

		// @exposed-api
		pause() {
			this.counting = false;
			// cancelRaf(this.rafId);
		},

		// @exposed-api
		reset() {
			this.pause();
			this.remain = +this.time;

			if (this.autoStart) {
				this.start();
			}
		},

		tick() {
			if (this.millisecond) {
				this.microTick();
			} else {
				this.macroTick();
			}
		},

		microTick() {
			this.rafId = setTimeout(() => {

				/* istanbul ignore if */
				// in case of call reset immediately after finish
				if (!this.counting) {
					return;
				}

				this.setRemain(this.getRemain());

				if (this.remain > 0) {
					this.microTick();
				}
			});
		},

		macroTick() {
			this.rafId = setTimeout(() => {
				/* istanbul ignore if */
				// in case of call reset immediately after finish
				if (!this.counting) {
					return;
				}

				const remain = this.getRemain();

				if (!isSameSecond(remain, this.remain) || remain === 0) {
					this.setRemain(remain);
				}

				if (this.remain > 0) {
					this.macroTick();
				}
			});
		},

		getRemain() {
			return Math.max(this.endTime - Date.now(), 0);
		},

		setRemain(remain) {
			this.remain = remain;
			this.$emit('change', this.timeData);

			if (remain === 0) {
				this.pause();
				this.$emit('finish');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.van-count-down {
	color: $count-down-text-color;
	font-size: $count-down-font-size;
	line-height: $count-down-line-height;
}
</style>
