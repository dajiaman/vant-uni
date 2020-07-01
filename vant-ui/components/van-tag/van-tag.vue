<template>
	<view
		class="van-tag"
		:class="[
			type ? 'van-tag--' + type : '',
			plain ? 'van-tag--plain  van-hairline--surround' : '',
			round ? 'van-tag--round' : '',
			mark ? 'van-tag--mark' : '',
			size ? 'van-tag--' + size : ''
		]"
		:style="style"
	>
		<slot></slot>
		<van-icon v-if="closeable" name="cross" 
		class="van-tag__close" @click="close"></van-icon>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'default'
		},
		size: String,
		color: String,
		plain: Boolean,
		round: Boolean,
		mark: Boolean,
		textColor: String,
		closeable: Boolean
	},
	data() {
		return {
			style: {}
		};
	},
	created() {
		const key = this.plain ? 'color' : 'backgroundColor';
		const style = { [key]: this.color };

		if (this.textColor) {
			style.color = this.textColor;
		}

		this.style = style;
	},
	methods: {
		close(event) {
			console.log(event);
			this.$emit('close', event);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';
@import '../../libs/css/hairline.scss';

.van-tag {
	display: inline-flex;
	align-items: center;
	padding: $tag-padding;
	color: $tag-text-color;
	font-size: $tag-font-size;
	line-height: normal;
	border-radius: $tag-border-radius;

	&::after {
		border-color: currentColor;
		border-radius: $tag-border-radius * 2;
	}

	&--default {
		background-color: $tag-default-color;

		&.van-tag--plain {
			color: $tag-default-color;
		}
	}

	&--danger {
		background-color: $tag-danger-color;

		&.van-tag--plain {
			color: $tag-danger-color;
		}
	}

	&--primary {
		background-color: $tag-primary-color;

		&.van-tag--plain {
			color: $tag-primary-color;
		}
	}

	&--success {
		background-color: $tag-success-color;

		&.van-tag--plain {
			color: $tag-success-color;
		}
	}

	&--warning {
		background-color: $tag-warning-color;

		&.van-tag--plain {
			color: $tag-warning-color;
		}
	}

	&--plain {
		background-color: $tag-plain-background-color;
	}

	&--mark {
		padding-right: 0.7em;

		&,
		&::after {
			border-radius: 0 $tag-round-border-radius $tag-round-border-radius 0;
		}
	}

	&--round {
		&,
		&::after {
			border-radius: $tag-round-border-radius;
		}
	}

	&--medium {
		font-size: $tag-medium-font-size;
	}

	&--large {
		font-size: $tag-large-font-size;
	}

	&__close {
		min-width: 1em;
		margin-left: 4rpx;
		cursor: pointer;
	}
}
</style>
