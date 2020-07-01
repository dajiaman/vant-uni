<template>
	<view class="tui-sku-stepper-stock tui-padding">
		<text class="van-sku__stepper-title">{{ stepperTitle || '购买数量' }}</text>
		<van-stepper 
		:value="currentNum" 
		:min="stepperMinLimit" :max="stepperLimit" :disabled="disableStepperInput" @change="onChange" class="stepper"></van-stepper>
	</view>
</template>

<script>

import { LIMIT_TYPE } from './constants.js';
const { QUOTA_LIMIT, STOCK_LIMIT } = LIMIT_TYPE;


export default {
	props: {
		stock: Number,
		skuStockNum: Number,
		selectedNum: Number,
		stepperTitle: String,
		disableStepperInput: Boolean,
		customStepperConfig: Object,
		hideQuotaText: Boolean,
		quota: {
			type: Number,
			default: 0
		},
		quotaUsed: {
			type: Number,
			default: 0
		},
		startSaleNum: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			currentNum: this.selectedNum,
			// 购买限制类型: 限购/库存
			limitType: STOCK_LIMIT
		};
	},
	watch: {
		currentNum(num) {
			const intValue = parseInt(num, 10);
			if (intValue >= this.stepperMinLimit && intValue <= this.stepperLimit) {
				uni.$emit('sku:numChange', intValue);
			}
		},

		stepperLimit(limit) {
			if (limit < this.currentNum && this.stepperMinLimit <= limit) {
				this.currentNum = limit;
			}
			this.checkState(this.stepperMinLimit, limit);
		},

		stepperMinLimit(start) {
			if (start > this.currentNum || start > this.stepperLimit) {
				this.currentNum = start;
			}
			this.checkState(start, this.stepperLimit);
		}
	},

	computed: {
		stepperLimit() {
			const quotaLimit = this.quota - this.quotaUsed;
			let limit;

			// 无限购时直接取库存，有限购时取限购数和库存数中小的那个
			if (this.quota > 0 && quotaLimit <= this.stock) {
				// 修正负的limit
				limit = quotaLimit < 0 ? 0 : quotaLimit;
				this.limitType = QUOTA_LIMIT;
			} else {
				limit = this.stock;
				this.limitType = STOCK_LIMIT;
			}
			return limit;
		},
		stepperMinLimit() {
			return this.startSaleNum < 1 ? 1 : this.startSaleNum;
		},
		quotaText() {
			const { quotaText, hideQuotaText } = this.customStepperConfig;
			if (hideQuotaText) return '';

			let text = '';

			if (quotaText) {
				text = quotaText;
			} else {
				const textArr = [];
				if (this.startSaleNum > 1) {
					textArr.push(this.startSaleNum + '件起售');
				}
				if (this.quota > 0) {
					textArr.push( '限购' +  this.quota + '件');
				}
				text = textArr.join('，');
			}

			return text;
		}
	},
	created() {
		this.checkState(this.stepperMinLimit, this.stepperLimit);
	},
	methods: {
		setCurrentNum(num) {
			this.currentNum = num;
			this.checkState(this.stepperMinLimit, this.stepperLimit);
		},
		onOverLimit(action) {
			uni.$emit('sku:overLimit', {
				action,
				limitType: this.limitType,
				quota: this.quota,
				quotaUsed: this.quotaUsed,
				startSaleNum: this.startSaleNum
			});
		},
		onChange(e) {
			const intValue = parseInt(e.value, 10);
			this.currentNum = intValue;
			const { handleStepperChange } = this.customStepperConfig;
			handleStepperChange && handleStepperChange(intValue);
			this.$emit('change', intValue);
		},
		checkState(min, max) {
			// 如果选择小于起售，则强制变为起售
			if (this.currentNum < min || min > max) {
				this.currentNum = min;
			} else if (this.currentNum > max) {
				// 当前选择数量大于最大可选时，需要重置已选数量
				this.currentNum = max;
			}
			
			uni.$emit('sku:stepperState', {
				valid: min <= max,
				min,
				max,
				limitType: this.limitType,
				quota: this.quota,
				quotaUsed: this.quotaUsed,
				startSaleNum: this.startSaleNum
			});
		}
	}
};
</script>

<style scoped>
.tui-sku-stepper-stock {
	display: flex;
	margin-bottom: 20rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
}
.stepper {
	flex: 1;
	display: flex;
	justify-content: flex-end;
}

.van-sku__stepper-title{
	color: #323233;
	font-size: 30rpx;
}
</style>
