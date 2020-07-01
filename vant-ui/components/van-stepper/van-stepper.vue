<template>
	<view class="van-stepper">
		<button v-show="showMinus" class="van-stepper__minus" :class="[minusDisabled ? 'van-stepper__minus--disabled' : '']" :style="buttonStyle" @click.stop="miusClick"></button>
		<input
			ref="input"
			:type="integer ? 'tel' : 'text'"
			class="van-stepper__input"
			:value="currentValue"
			:disabled="disableInput || disabled"
			:readonly="disableInput"
			:placeholder="placeholder"
			:inputmode="integer ? 'numeric' : 'decimal'"
			:aria-valuemax="max"
			:aria-valuemin="min"
			:aria-valuenow="currentValue"
			:style="inputStyle"
			@input="onInput"
			@focus="onFocus"
			@blur="onBlur"
		/>
		<button v-show="showPlus" class="van-stepper__plus" :class="[plusDisabled ? 'van-stepper__plus--disabled' : '']" :style="buttonStyle" @click.stop="plusClick"></button>
	</view>
</template>

<script>
import { isDef, formatNumber } from '../../libs/utils/index.js';

function equal(value1, value2) {
	return String(value1) === String(value2);
}

// add num and avoid float number
function add(num1, num2) {
	const cardinal = 10 ** 10;
	return Math.round((num1 + num2) * cardinal) / cardinal;
}

export default {
	name: 'van-stepper',
	props: {
		value: null,
		integer: Boolean,
		disabled: Boolean,
		inputWidth: [Number, String],
		buttonSize: [Number, String],
		asyncChange: {
			type: Boolean,
			default: false
		},
		placeholder: String,
		disablePlus: Boolean,
		disableMinus: Boolean,
		disableInput: Boolean,
		decimalLength: [Number, String],
		name: {
			type: [Number, String],
			default: ''
		},
		min: {
			type: [Number, String],
			default: 1
		},
		max: {
			type: [Number, String],
			default: Infinity
		},
		step: {
			type: [Number, String],
			default: 1
		},
		defaultValue: {
			type: [Number, String],
			default: 1
		},
		showPlus: {
			type: Boolean,
			default: true
		},
		showMinus: {
			type: Boolean,
			default: true
		},
		longPress: {
			type: Boolean,
			default: true
		}
	},

	computed: {
		minusDisabled() {
			return this.disabled || this.disableMinus || this.currentValue <= this.min;
		},

		plusDisabled() {
			return this.disabled || this.disablePlus || this.currentValue >= this.max;
		},

		inputStyle() {
			const style = {};

			if (this.inputWidth) {
				style.width = this.inputWidth;
			}

			if (this.buttonSize) {
				style.height = this.buttonSize;
			}

			return style;
		},

		buttonStyle() {
			if (this.buttonSize) {
				const size = this.buttonSize;

				return {
					width: size,
					height: size
				};
			}
		}
	},

	data() {
		const defaultValue = isDef(this.value) ? this.value : this.defaultValue;
		const value = this.format(defaultValue);

		if (!equal(value, this.value)) {
			this.$emit('input', value);
		}

		return {
			currentValue: value
		};
	},

	methods: {
		// formatNumber illegal characters
		formatNumber(value) {
			return formatNumber(String(value), !this.integer);
		},

		format(value) {
			value = this.formatNumber(value);

			// format range
			value = value === '' ? 0 : +value;
			value = isNaN(value) ? this.min : value;
			value = Math.max(Math.min(this.max, value), this.min);

			// format decimal
			if (isDef(this.decimalLength)) {
				value = value.toFixed(this.decimalLength);
			}

			return value;
		},

		onInput(event) {
			const { value } = event.target;

			let formatted = this.formatNumber(value);

			// limit max decimal length
			if (isDef(this.decimalLength) && formatted.indexOf('.') !== -1) {
				const pair = formatted.split('.');
				formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`;
			}

			if (!equal(value, formatted)) {
				event.target.value = formatted;
			}

			this.emitChange(formatted);
		},

		emitChange(value) {
			if (this.asyncChange) {
				this.$emit('input', value);
				this.$emit('change', value, { name: this.name });
			} else {
				this.currentValue = value;
			}
		},

		onChange() {
			const { type } = this;

			if (this[`${type}Disabled`]) {
				this.$emit('overlimit', type);
				return;
			}

			const diff = type === 'minus' ? -this.step : +this.step;

			const value = this.format(add(+this.currentValue, diff));

			this.emitChange(value);
			this.$emit(type);
		},

		onFocus(event) {
			// readonly not work in lagacy mobile safari
			if (this.disableInput && this.$refs.input) {
				this.$refs.input.blur();
			} else {
				this.$emit('focus', event);
			}
		},

		onBlur(event) {
			const value = this.format(event.target.value);
			event.target.value = value;
			this.currentValue = value;
			this.$emit('blur', event);
		},

		miusClick(e) {
			this.type = 'minus';
			this.onChange();
		},

		plusClick(e) {
			this.type = 'plus';
			this.onChange();
		}
	}
};
</script>

<style lang="scss" scoped>
.van-stepper {
	font-size: 0;
	user-select: none;
	display: inline-flex;

	&__minus,
	&__plus {
		position: relative;
		box-sizing: border-box;
		width: $stepper-input-height;
		height: $stepper-input-height;
		margin: 0;
		padding: 0;
		color: $stepper-button-icon-color;
		vertical-align: middle;
		background-color: $stepper-background-color;
		border: 0;
		cursor: pointer;

		&::before {
			width: 50%;
			height: 2rpx;
		}

		&::after {
			width: 2rpx;
			height: 50%;
		}

		&::before,
		&::after {
			position: absolute;
			top: 50%;
			left: 50%;
			background-color: currentColor;
			transform: translate(-50%, -50%);
			content: '';
		}

		&:active {
			background-color: $stepper-active-color;
		}

		&--disabled {
			color: $stepper-button-disabled-icon-color;
			background-color: $stepper-button-disabled-color;
			cursor: not-allowed;

			&:active {
				background-color: $stepper-button-disabled-color;
			}
		}
	}

	&__minus {
		border-radius: $stepper-border-radius 0 0 $stepper-border-radius;

		&::after {
			display: none;
		}
	}

	&__plus {
		border-radius: 0 $stepper-border-radius $stepper-border-radius 0;
	}

	&__input {
		box-sizing: border-box;
		width: $stepper-input-width;
		height: $stepper-input-height;
		margin: 0 2px;
		padding: 0;
		color: $stepper-input-text-color;
		font-size: $stepper-input-font-size;
		line-height: $stepper-input-line-height;
		text-align: center;
		vertical-align: middle;
		background-color: $stepper-background-color;
		border: 0;
		border-width: 2rpx 0;
		border-radius: 0;
		-webkit-appearance: none;

		&:disabled {
			color: $stepper-input-disabled-text-color;
			background-color: $stepper-input-disabled-background-color;
			-webkit-text-fill-color: currentColor; // fix disabled color in iOS
			opacity: 1;
		}

		&:read-only {
			cursor: default;
		}
	}

	&--round {
		.van-stepper__input {
			background-color: transparent;
		}

		.van-stepper__plus,
		.van-stepper__minus {
			border-radius: 100%;

			&:active {
				opacity: $active-opacity;
			}

			&--disabled {
				&,
				&:active {
					opacity: 0.3;
				}
			}
		}

		.van-stepper__plus {
			color: $white;
			background-color: $stepper-button-round-theme-color;
		}

		.van-stepper__minus {
			color: $stepper-button-round-theme-color;
			background-color: $white;
			border: 2rpx solid $stepper-button-round-theme-color;
		}
	}
}
</style>
