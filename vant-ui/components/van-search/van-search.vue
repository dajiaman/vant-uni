<template>
	<view class="van-search" :class="[showAction ? 'van-search--show-action' : '']"
	:style="{
		
	}">
		<view class="van-search__content" :class="[shape ? 'van-search__content--' + shape : '']">
			<view class="van-search__label" v-if="label">{{ label }}</view>

			<van-field
				type="search"
				:value="value"
				:border="false"
				:maxlength="maxlength"
				:clearable="clearable"
				:leftIcon="leftIcon"
				:inputAlign="inputAlign"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				:focus="focus"
				@change="onChange"
				@focus="onFocus"
				@confirm="onConfirm"
			></van-field>
		</view>

		<view class="van-search__action" v-if="showAction" @click="onCancel">{{ actionText }}</view>
	</view>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: ''
		},
		name: String,
		label: String,
		shape: {
			type: String,
			default: 'square'
		},
		background: {
			type: String,
			default: '#f2f2f2'
		},
		showAction: {
			type: Boolean,
			default: false
		},
		actionText: {
			type: String,
			default: '取消'
		},
		focus: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: false
		},
		maxlength: {
			type: Number,
			default: -1
		},
		placeholder: String,
		placeholderStyle: String,
		inputAlign: {
			type: String,
			default: 'left'
		},
		leftIcon: {
			type: String,
			default: 'search'
		}
	},
	computed: {
		style () {
			let style = {};
			if(this.background){
				style.background = background;
			}
			return style;
		}
	},
	methods: {
		onCancel() {
			this.$emit('input', '');
			this.$emit('cancel');
		},
		onChange(e) {
			this.$emit('change', e);
		},
		onFocus(e) {
			this.$emit('focus', e);
		},
		onConfirm(e) {
			this.$emit('search', e);
		}
	}
};
</script>

<style lang="scss">
.van-search {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: $search-padding;
	background-color: $search-background-color;

	&__content {
		display: flex;
		flex: 1;
		padding-left: $padding-xs;
		background-color: $search-content-background-color;
		border-radius: $border-radius-sm;

		&--round {
			border-radius: $border-radius-max;
		}
	}

	&__label {
		padding: $search-label-padding;
		color: $search-label-color;
		font-size: $search-label-font-size;
		line-height: $search-input-height;
	}

	.van-cell {
		flex: 1;
		padding: 10rpx $padding-xs 10rpx 0;
		background-color: transparent;

		&__left-icon {
			color: $search-left-icon-color;
		}
	}

	&--show-action {
		padding-right: 0;
	}

	input {
		&::-webkit-search-decoration,
		&::-webkit-search-cancel-button,
		&::-webkit-search-results-button,
		&::-webkit-search-results-decoration {
			display: none;
		}
	}

	&__action {
		padding: $search-action-padding;
		color: $search-action-text-color;
		font-size: $search-action-font-size;
		line-height: $search-input-height;
		cursor: pointer;
		user-select: none;

		&:active {
			background-color: $active-color;
		}
	}
}
</style>
