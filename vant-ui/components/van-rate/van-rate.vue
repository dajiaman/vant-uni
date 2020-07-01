<template>
	<view class="van-rate" hover-class="" :class="[disabled ? 'van-rate--disabled' : '', readonly ? 'van-rate--readonly' : '']">
		<view class="van-rate__item" v-for="(status, index) in list">
			<van-icon
				:name="status === 'full' ? icon : voidIcon"
				class="van-rate__icon"
				:class="[disabled ? 'van-rate__icon--disabled' : '', status == 'full' ? 'van-rate__icon--full' : '']"
				size="size"
				:color="disabled ? disabledColor : status === 'full' ? color : voidColor"
				@click.stop="select(index + 1)"
			></van-icon>
		</view>
	</view>
</template>

<script>
function getRateStatus(value, index, allowHalf) {
	if (value >= index) {
		return 'full';
	}

	if (value + 0.5 >= index && allowHalf) {
		return 'half';
	}

	return 'void';
}

export default {
	props: {
		size: {
			type: [Number, String]
		},
		color: {
			type: String,
			default: '#ffd21e'
		},
		gutter: [Number, String],
		readonly: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		allowHalf: Boolean,
		voidColor: {
			type: String,
			default: '#c8c9cc'
		},
		iconPrefix: String,
		disabledColor: {
			type: String,
			default: '#c8c9cc'
		},
		value: {
			type: Number,
			default: 0
		},
		icon: {
			type: String,
			default: 'star'
		},
		voidIcon: {
			type: String,
			default: 'star-o'
		},
		count: {
			type: [Number, String],
			default: 5
		},
		touchable: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		list() {
			const list = [];
			for (let i = 1; i <= this.count; i++) {
				list.push(getRateStatus(this.value, i, this.allowHalf));
			}

			return list;
		},

		sizeWithUnit() {
			return this.size;
		},

		gutterWithUnit() {
			return this.gutter;
		}
	},

	methods: {
		select(index) {
			if (!this.disabled && !this.readonly && index !== this.value) {
				this.$emit('input', index);
				this.$emit('change', index);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.van-rate {
	display: inline-flex;
	cursor: pointer;
	user-select: none;

	&__item {
		position: relative;

		&:not(:last-child) {
			padding-right: $rate-icon-gutter;
		}
	}

	&__icon {
		display: block;
		width: 1em;
		color: $rate-icon-void-color;
		font-size: $rate-icon-size;

		&--half {
			position: absolute;
			top: 0;
			left: 0;
			width: 0.5em;
			overflow: hidden;
		}

		&--full {
			color: $rate-icon-full-color;
		}

		&--disabled {
			color: $rate-icon-disabled-color;
		}
	}

	&--disabled {
		cursor: not-allowed;
	}

	&--readonly {
		cursor: default;
	}
}
</style>
