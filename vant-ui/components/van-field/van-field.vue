<template>
	<view class="van-cell van-field"
	:class="[
		disabled ? 'van-field--disabled': '',
		required ? 'van-cell--required' : '',
		error ? 'van-field--error':''
	]">
		
		<view class="van-field__left-icon" v-if="leftIcon">
			<van-icon :name="leftIcon" size="40rpx"></van-icon>
		</view>
	
	
		<view class="van-cell__title van-field__label">
			<text>{{label}}</text>
		</view>
		<view class="van-cell__value van-field__value">
			<view class="van-field__body">
				
				<textarea v-if="type == 'textarea'"
				class="van-field__control"
				:value="value"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly ? 'readonly' : false"
				auto-height
				@focus="focus"
				@blur="blur"
				@input="input"
				:maxlength="maxlength"
				/>
				
				<input :type="type" 
				 v-else
				 class="van-field__control"
				 :value="value"
				 :password="password"
				 :disabled="disabled"
				 :maxlength="maxlength"
				 :readonly="readonly ? 'readonly' : false"
				 :placeholder="placeholder"
				 @focus="focus"
				 @blur="blur"
				 @input="input"
				 @confirm="confirm"
				 @linechange="linechange"
				 />
				 
				 
				 <van-icon v-if="clearable && clearIconShow" 
				 class="van-field__clear" name="clear" size="38rpx"
				 @click.stop="clickClearIcon"></van-icon>
				 
				 <view class="van-field__button" v-if="$slots.button">
					 <slot name="button"></slot>
				 </view>
				 
				 <view class="van-field__right-icon" v-if="rightIcon" @click.stop="clickRightIcon">
					 <van-icon :name="rightIcon" size="40rpx"></van-icon>
				 </view>
				 
				 
				 
			</view>
			<view class="van-field__error-message" v-if="errorMessage">手机号格式错误</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: String,
			type: {
				type: String,
				default: 'text'
			},
			value: [String, Number],
			border: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false
			},
			readonly: {
				type: Boolean,
				default: false
			},
			password: {
				type: Boolean,
				default: false
			},
			required: {
				type: Boolean,
				default: false
			},
			error: {
				type: Boolean,
				default: false
			},
			clearable: {
				type: Boolean,
				default: false
			},
			placeholder: String,
			'errorMessage': String,
			'leftIcon': String,
			'rightIcon': String,
			maxlength: {
				type: Number,
				default: -1
			}
		},
		data(){
			return {
				clearIconShow: false
			}
		},
		methods: {
			focus(e){
				if(this.clearable && this.value){
					this.clearIconShow = true;
				}
				this.$emit('focus', e);
			},
			blur(e){
				if(this.clearable){
					this.clearIconShow = false;
				}
				this.$emit('blur', e);
			},
			input(e){
				if(this.clearable && e.detail.value){
					this.clearIconShow = true;
				}
				if(e.detail.value == ''){
					this.clearIconShow = false
				}
				
				this.$emit('input', e.detail.value);
				this.$emit('change', e.detail.value);
			},
			confirm(e){
				this.$emit('confirm',  e.detail.value);
			},
			linechange(e){
				this.$emit('linechange', e);
			},
			
			// 点击清空控件
			clickClearIcon(){
				this.value = '';
				this.$emit('clear');
			},
			// 尾部icon
			clickRightIcon(){
				this.$emit('click-icon');
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../libs/css/style.components.scss';
	
	@import '../van-cell/index.scss';
	
	
	//  van-field
	
	.van-field {
	  &__label {
	    flex: none;
	    box-sizing: border-box;
	    width: $field-label-width;
	    margin-right:$field-label-margin-right;
	    color: $field-label-color;
	    text-align: left;
	    word-wrap: break-word;
	
	    &--center {
	      text-align: center;
	    }
	
	    &--right {
	      padding-right: $padding-md;
	      text-align: right;
	    }
	  }
	
	  &--disabled {
	    .van-field__label {
	      color: $field-disabled-text-color;
	    }
	  }
	
	  &__value {
	    overflow: visible;
	  }
	
	  &__body {
	    display: flex;
	    align-items: center;
	  }
	
	  &__control {
	    display: block;
	    box-sizing: border-box;
	    width: 100%;
	    min-width: 0; // for flex-shrink in field__button
	    margin: 0;
	    padding: 0;
	    color: $field-input-text-color;
	    line-height: inherit;
	    text-align: left;
	    background-color: transparent;
	    border: 0;
	    resize: none;
	
	    &::placeholder {
	      color: $field-placeholder-text-color;
	    }
	
	    &:disabled {
	      color: $field-input-disabled-text-color;
	      background-color: transparent;
	      cursor: not-allowed;
	      opacity: 1;
	      -webkit-text-fill-color: currentColor; // fix disabled color in iOS
	    }
	
	    &:read-only {
	      cursor: default;
	    }
	
	    &--center {
	      justify-content: center;
	      text-align: center;
	    }
	
	    &--right {
	      justify-content: flex-end;
	      text-align: right;
	    }
	
	    &--custom {
	      display: flex;
	      align-items: center;
	      min-height: $cell-line-height;
	    }
	
	    // for ios wechat
	    &[type='date'],
	    &[type='time'],
	    &[type='datetime-local'] {
	      min-height: $cell-line-height;
	    }
	
	    // for safari
	    &[type='search'] {
	      -webkit-appearance: none;
	    }
	  }
	
	  &__clear,
	  &__icon,
	  &__button,
	  &__right-icon {
	    flex-shrink: 0;
	  }
	
	  &__clear,
	  &__right-icon {
	    margin-right: -$padding-xs;
	    padding: 0 $padding-xs;
	    line-height: inherit;
	  }
	
	  &__clear {
	    color: $field-clear-icon-color;
	    font-size:$field-clear-icon-size;
	    cursor: pointer;
	  }
	
	  &__left-icon .van-icon,
	  &__right-icon .van-icon {
	    display: block;
	    min-width: 1em;
	    font-size: $field-icon-size;
	    line-height: inherit;
	  }
	
	  &__left-icon {
	    margin-right: 5px;
	  }
	
	  &__right-icon {
	    color: $field-right-icon-color;
	  }
	
	  &__button {
	    padding-left: $padding-xs;
	  }
	
	  &__error-message {
	    color: $field-error-message-color;
	    font-size: $field-error-message-text-color;
	    text-align: left;
	
	    &--center {
	      text-align: center;
	    }
	
	    &--right {
	      text-align: right;
	    }
	  }
	
	  &__word-limit {
	    margin-top: $padding-base;
	    color: $field-word-limit-color;
	    font-size: $field-word-limit-font-size;
	    line-height: $field-word-limit-line-height;
	    text-align: right;
	  }
	
	  &--error {
	    .van-field__control {
	      &,
	      &::placeholder {
	        color: $field-input-error-text-color;
	        -webkit-text-fill-color: currentColor;
	      }
	    }
	  }
	
	  &--min-height {
	    .van-field__control {
	      min-height: $field-text-area-min-height;
	    }
	  }
	}
	
</style>
