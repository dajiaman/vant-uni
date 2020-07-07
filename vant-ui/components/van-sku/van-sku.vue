<template>
	<van-popup v-model="show" @close="closeSkuBox" position="bottom" safe-area-inset-bottom class="van-sku-container" closeable round borderRadius="40">
		<view class="van-sku-header">
			<view class="tui-sku-header__img-wrap"><image :src="skuImg" class="tui-goods-img" @tap="previewImage"></image></view>
			<view class="tui-sku-header__goods-info">
				<view class="tui-sku__goods-price">
					<text class="tui-sku__price-symbol">￥</text>
					<text class="tui-sku__price-num">{{ price }}</text>
				</view>

				<view class="tui-sku-header-item">
					<span class="tui-sku__stock" v-if="!hideStock">
						剩余
						<span class="tui-sku__stock-num" :class="{ 'tui-sku__stock-num--highlight': stock < stockThreshold }">{{ stock }}</span>
						件
					</span>
				</view>

				<view class="tui-sku-header-item">{{ selectedText }}</view>
			</view>
		</view>

		<scroll-view scroll-y class="tui-sku-body" style="max-height: 550rpx;">
			<view class="tui-scrollview-box">
				<view class="tui-sku-group-container">
					<view class="tui-sku-row" v-for="(skuTreeItem, kIndex) in skuTree" :key="kIndex">
						<skuRow :skuRow="skuTreeItem">
							<slot>
								<block v-for="(skuValue, vIndex) in skuTreeItem.v" :key="vIndex">
									<skuRowItem :skuList="sku.list" :skuValue="skuValue" :selectedSku="selectedSku" :skuKeyStr="skuTreeItem.k_s"></skuRowItem>
								</block>
							</slot>
						</skuRow>
					</view>

					<skuStepper
						ref="skuStepper"
						:stock="stock"
						:quota="quota"
						:quotaUsed="quotaUsed"
						:startSaleNum="startSaleNum"
						:selectedNum="selectedNum"
						:stepperTitle="stepperTitle"
						:skuStockNum="sku.stock_num"
						:disableStepperInput="disableStepperInput"
						:customStepperConfig="customStepperConfig"
						:hideQuotaText="hideQuotaText"
						@change="onChange"
					></skuStepper>
				</view>
			</view>
		</scroll-view>

		<skuActions></skuActions>

		<van-toast ref="toast"></van-toast>
	</van-popup>
</template>

<script>
import skuRow from './skuRow.vue';
import skuRowItem from './skuRowItem.vue';
import skuStepper from './skuStepper.vue';
import skuActions from './skuActions.vue';

// import Vue from 'vue';

import { isAllSelected, getSkuComb, getSelectedProperties, getSelectedPropValues, getSelectedSkuValues } from './sku-helper.js';
import { LIMIT_TYPE, UNSELECTED_SKU_VALUE_ID } from './constants';
const { QUOTA_LIMIT } = LIMIT_TYPE;

export default {
	components: {
		skuRowItem,
		skuRow,
		skuStepper,
		skuActions
	},
	computed: {
		skuImg() {
			return this.getSkuImg(this.sku, this.selectedSku) || this.goods.picture;
		},

		isSkuCombSelected() {
			// sku 未选完
			if (this.hasSku && !isAllSelected(this.skuTree, this.selectedSku)) {
				return false;
			}
			// 属性未全选
			if (this.propList.some(it => (this.selectedProp[it.k_id] || []).length < 1)) {
				return false;
			}
			return true;
		},

		isSkuEmpty() {
			return Object.keys(this.sku).length === 0;
		},

		hasSku() {
			return !this.sku.none_sku;
		},

		hasSkuOrAttr() {
			return this.hasSku || this.propList.length > 0;
		},

		selectedSkuComb() {
			let skuComb = null;
			if (this.isSkuCombSelected) {
				if (this.hasSku) {
					skuComb = getSkuComb(this.sku.list, this.selectedSku);
				} else {
					skuComb = {
						id: this.sku.collection_id,
						price: Math.round(this.sku.price * 100),
						stock_num: this.sku.stock_num
					};
				}
				if (skuComb) {
					skuComb.properties = getSelectedProperties(this.propList, this.selectedProp);
					skuComb.property_price = this.selectedPropValues.reduce((acc, cur) => acc + (cur.price || 0), 0);
				}
			}
			return skuComb;
		},
		selectedSkuValues() {
			return getSelectedSkuValues(this.skuTree, this.selectedSku);
		},

		selectedPropValues() {
			return getSelectedPropValues(this.propList, this.selectedProp);
		},

		price() {
			if (this.selectedSkuComb) {
				return ((this.selectedSkuComb.price + this.selectedSkuComb.property_price) / 100).toFixed(2);
			}
			// sku.price是一个格式化好的价格区间
			return this.sku.price;
		},

		originPrice() {
			if (this.selectedSkuComb && this.selectedSkuComb.origin_price) {
				return ((this.selectedSkuComb.origin_price + this.selectedSkuComb.property_price) / 100).toFixed(2);
			}
			return this.sku.origin_price;
		},
		skuTree() {
			return this.sku.tree || {};
		},

		propList() {
			return this.properties || [];
		},

		imageList() {
			const imageList = [this.goods.picture];

			if (this.skuTree.length > 0) {
				this.skuTree.forEach(treeItem => {
					if (!treeItem.v) {
						return;
					}

					treeItem.v.forEach(vItem => {
						const img = vItem.previewImgUrl || vItem.imgUrl || vItem.img_url;
						if (img) {
							imageList.push(img);
						}
					});
				});
			}

			return imageList;
		},

		stock() {
			const { stockNum } = this.customStepperConfig;
			if (stockNum !== undefined) {
				return stockNum;
			}
			if (this.selectedSkuComb) {
				return this.selectedSkuComb.stock_num;
			}
			return this.sku.stock_num;
		},

		stockText() {
			const { stockFormatter } = this.customStepperConfig;

			if (stockFormatter) return stockFormatter(this.stock);

			return '剩余' + `<span class={('tui-stock-num', { highlight: this.stock < this.stockThreshold })}>${this.stock}</span>` + '件';
		},

		selectedText() {
			if (this.selectedSkuComb) {
				const values = this.selectedSkuValues.concat(this.selectedPropValues);
				return `已选 ${values.map(item => item.name).join('；')}`;
			}

			const unselectedSku = this.skuTree.filter(item => this.selectedSku[item.k_s] === UNSELECTED_SKU_VALUE_ID).map(item => item.k);
			const unselectedProp = this.propList.filter(item => (this.selectedProp[item.k_id] || []).length < 1).map(item => item.k);

			return `选择 ${unselectedSku.concat(unselectedProp).join('；')}`;
		}
	},
	props: {
		sku: {
			type: Object
		},

		goods: {
			type: Object
		},

		goodsId: [Number, String],

		properties: {
			type: Array,
			default: function() {
				return [];
			}
		},

		value: Boolean,
		customStepperConfig: {
			type: Object,
			default: () => ({})
		},
		quota: {
			type: Number,
			default: 0
		},
		quotaUsed: {
			type: Number,
			default: 0
		},
		stockThreshold: {
			type: Number,
			default: 50
		},

		startSaleNum: {
			type: Number,
			default: 1
		},

		initialSku: {
			type: Object,
			default: () => ({})
		},
		hideStock: Boolean,
		stepperTitle: String,
		hideQuotaText: Boolean,
		disableStepperInput: Boolean,
		resetStepperOnHide: Boolean,
		resetSelectedSkuOnHide: Boolean
	},

	data() {
		return {
			selectedSku: {},
			selectedProp: {},
			selectedNum: 1,

			skuEventBus: null,

			show: this.value
		};
	},

	watch: {
		show(val) {
			this.$emit('input', val);
			if (!val) {
				this.$emit('sku-close', {
					selectedSkuValues: this.selectedSkuValues,
					selectedNum: this.selectedNum,
					selectedSkuComb: this.selectedSkuComb
				});

				if (this.resetStepperOnHide) {
					this.resetStepper();
				}

				if (this.resetSelectedSkuOnHide) {
					this.resetSelectedSku();
				}
			}
		},

		value(val) {
			this.show = val;
		},

		skuTree: 'resetSelectedSku',

		initialSku() {
			this.resetStepper();
			this.resetSelectedSku();
		}
	},

	created() {
		// const skuEventBus = new Vue();
		// this.skuEventBus = skuEventBus;

		//eventbus 事件监听
		uni.$on('sku:select', this.onSelect);
		uni.$on('sku:propSelect', this.onPropSelect);
		uni.$on('sku:numChange', this.onNumChange);
		uni.$on('sku:stepperState', this.onStepperState);
		uni.$on('sku:overLimit', this.onOverLimit);
		uni.$on('sku:addCart', this.onAddCart);
		uni.$on('sku:buy', this.onBuy);
		// uni.$on('sku:previewImage', this.onPreviewImage);

		this.resetStepper();
		this.resetSelectedSku();

		// 组件初始化后的钩子，抛出skuEventBus
		// uni.$emit('after-sku-create', skuEventBus);
	},
	methods: {
		resetStepper() {
			// const skuStepper = this.$refs.skuStepper;

			const { selectedNum } = this.initialSku;
			const num = selectedNum !== undefined && selectedNum !== null ? selectedNum : this.startSaleNum;
			// 用来缓存不合法的情况
			this.stepperError = null;

			this.selectedNum = num;

			// if (skuStepper) {
			// 	skuStepper.setCurrentNum(num);
			// } else {
			// 	// 当首次加载（skuStepper 为空）时，传入数量如果不合法，可能会存在问题
			// 	this.selectedNum = num;
			// }
		},
		// @exposed-api
		resetSelectedSku() {
			this.selectedSku = {};

			// 重置 selectedSku
			this.skuTree.forEach(item => {
				this.selectedSku[item.k_s] = this.initialSku[item.k_s] || UNSELECTED_SKU_VALUE_ID;
			});

			const skuValues = this.selectedSkuValues;

			if (skuValues.length > 0) {
				this.$nextTick(() => {
					this.$emit('sku-selected', {
						skuValue: skuValues[skuValues.length - 1],
						selectedSku: this.selectedSku,
						selectedSkuComb: this.selectedSkuComb
					});
				});
			}

			// 重置商品属性
			this.selectedProp = {};
			const { selectedProp = {} } = this.initialSku;
			// 只有一个属性值时，默认选中，且选中外部传入信息
			this.propList.forEach(item => {
				if (item.v && item.v.length === 1) {
					this.selectedProp[item.k_id] = [item.v[0].id];
				} else if (selectedProp[item.k_id]) {
					this.selectedProp[item.k_id] = selectedProp[item.k_id];
				}
			});

			const propValues = this.selectedPropValues;
			if (propValues.length > 0) {
				this.$emit('sku-prop-selected', {
					propValue: propValues[propValues.length - 1],
					selectedProp: this.selectedProp,
					selectedSkuComb: this.selectedSkuComb
				});
			}

			// 抛出重置事件
			this.$emit('sku-reset', {
				selectedSku: this.selectedSku,
				selectedProp: this.selectedProp,
				selectedSkuComb: this.selectedSkuComb
			});
		},
		getSkuImg(sku, selectedSku) {
			let img;

			sku.tree.some(item => {
				const id = selectedSku[item.k_s];

				if (id && item.v) {
					const matchedSku = item.v.filter(skuValue => skuValue.id === id)[0] || {};
					img = matchedSku.previewImgUrl || matchedSku.imgUrl || matchedSku.img_url;
					return img;
				}
				return false;
			});

			return img;
		},

		closeSkuBox() {
			this.show = false;
		},

		validateSkuMessages() {
			return this.$refs.skuMessages ? this.$refs.skuMessages.validateMessages() : '';
		},

		validateSku() {
			if (this.selectedNum === 0) {
				return '商品已经无法购买啦';
			}

			if (this.isSkuCombSelected) {
				return;
				// return this.validateSkuMessages();
			}

			// 自定义sku校验
			if (this.customSkuValidator) {
				const err = this.customSkuValidator(this);
				if (err) return err;
			}

			return '请先选择商品规格';
		},

		// 规格值选中
		onSelect(skuValue) {
			// 点击已选中的sku时则取消选中
			this.selectedSku =
				this.selectedSku[skuValue.skuKeyStr] === skuValue.id
					? {
							...this.selectedSku,
							[skuValue.skuKeyStr]: ''
					  }
					: { ...this.selectedSku, [skuValue.skuKeyStr]: skuValue.id };

			this.$emit('sku-selected', {
				skuValue,
				selectedSku: this.selectedSku,
				selectedSkuComb: this.selectedSkuComb
			});
		},

		onPropSelect() {},

		// sku图片预览
		previewImage() {
			console.log('preview image');

			const indexImage = this.skuImg;

			// const { previewOnClickImage } = this;

			const index = this.imageList.findIndex(image => image === indexImage);

			const params = {
				index,
				imageList: this.imageList,
				indexImage
			};

			this.$emit('open-preview', params);

			// if (!previewOnClickImage) {
			// 	return;
			// }

			uni.previewImage({
				urls: this.imageList,
				current: index
			});
		},

		// stepper 变化
		onChange(event) {
			this.$emit('stepper-change', event);
		},

		onNumChange(num) {
			this.selectedNum = num;
		},

		onStepperState(data) {
			if (data.valid) {
				this.stepperError = null;
			} else {
				this.stepperError = {
					...data,
					action: 'plus'
				};
			}
		},

		onOverLimit(data) {
			const { action, limitType, quota, quotaUsed } = data;
			const { handleOverLimit } = this.customStepperConfig;

			if (handleOverLimit) {
				handleOverLimit(data);
				return;
			}

			if (action === 'minus') {
				if (this.startSaleNum > 1) {
						// this.$refs.toast({
						// 	message: this.startSaleNum + '件起售'
						// });
						this.$van.toast(this.startSaleNum + '件起售');
				} else {
					// this.$refs.toast.show({
					// 	message: '至少选择一件'
					// });
					this.$van.toast('至少选择一件');
				}
			} else if (action === 'plus') {
				if (limitType === QUOTA_LIMIT) {
					if (quotaUsed > 0) {
						// this.$refs.toast.show({
						// 	message: '每人限购' + quota + '件，你已购买' + quotaUsed + '件'
						// });
						this.$van.toast('每人限购' + quota + '件，你已购买' + quotaUsed + '件');
						// Toast(t('quotaUsedTip', quota, quotaUsed));
					} else {
						
						this.$van.toast('每人限购' + quota + '件');
						
						// this.$refs.toast.show({
						// 	message: '每人限购' + quota + '件'
						// });
						// Toast(t('quotaTip', quota));
					}
				} else {
					this.$van.toast("库存不足");
				}
			}
		},

		onAddCart() {
			this.onBuyOrAddCart('add-cart');
		},

		onBuy() {
			this.onBuyOrAddCart('buy-clicked');
		},

		onBuyOrAddCart(type) {
			// 有信息表示该sku根本不符合购买条件
			if (this.stepperError) {
				return this.onOverLimit(this.stepperError);
			}
			const error = this.validateSku();
			if (error) {
				console.log('validate error:', error);
					this.$van.toast(error);
				
			} else {
				this.$emit(type, this.getSkuData());
			}
		},
		// @exposed-api
		getSkuData() {
			return {
				goodsId: this.goodsId,
				selectedNum: this.selectedNum,
				selectedSkuComb: this.selectedSkuComb
			};
		}
	}
};
</script>

<style scoped lang="scss">
.van-sku-header {
	display: flex;
	flex-direction: row;
	margin: 0 32rpx;
}

.tui-sku-header__img-wrap {
	height: 220rpx;
	width: 220rpx;
	overflow: hidden;
	background: #f7f8fa;
	border-radius: 10rpx;
	margin: 24rpx 0;

	.tui-goods-img {
		max-width: 100%;
		max-height: 100%;
		margin: auto;
	}
}

.tui-sku-header__goods-info {
	display: flex;
	flex-direction: column;
	min-height: 96px;
	padding: 24rpx 40rpx 24rpx 30rpx;
	justify-content: flex-end;
}

.tui-sku__goods-price {
	color: #ee0a24;
}

.tui-sku__price-symbol {
	font-size: 34rpx;
}

.tui-sku__price-num {
	font-weight: 500;
	font-size: 50rpx;
	word-wrap: break-word;
}

.tui-sku-header-item {
	margin-top: 8px;
	color: #969799;
	font-size: 28rpx;
	line-height: 1.3;
}

.tui-sku-group-container {
	padding-top: 20rpx;
}

.tui-popup-scroll {
	height: 600rpx;
	font-size: 26rpx;
}

.tui-scrollview-box {
	box-sizing: border-box;
}

.tui-sku-row {
	margin: 0 30rpx 24rpx;
}

.tui-sku-row__title {
	padding: 20rpx 0;
	color: #323233;
	font-size: 28rpx;
}

.tui-attr-box {
	font-size: 0;
	padding: 20rpx 0;
}

.tui-sku__stock {
	.tui-sku__stock-num {
		padding: 0 8rpx;
	}

	.tui-sku__stock-num--highlight {
		color: #ee0a24;
	}
}

.tui-number-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 0 30rpx 0;
	box-sizing: border-box;
}

.tui-operation {
	width: 100%;
	height: 100rpx;
	background: rgba(255, 255, 255, 0.98);
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 10;
	bottom: 0;
	left: 0;
	padding-bottom: env(safe-area-inset-bottom);
}

.tui-safearea-bottom {
	width: 100%;
	height: env(safe-area-inset-bottom);
}

.tui-operation::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	border-top: 1rpx solid #eaeef1;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}

.tui-operation-left {
	display: flex;
	align-items: center;
}

.tui-operation-item {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: relative;
}

.tui-operation-text {
	font-size: 22rpx;
	color: #333;
}

.tui-opacity {
	opacity: 0.5;
}

.tui-scale-small {
	transform: scale(0.9);
	transform-origin: center center;
}

.tui-operation-right {
	height: 100rpx;
	padding-top: 0;
}

.tui-right-flex {
	display: flex;
	align-items: center;
	justify-content: center;
}

.tui-flex-1 {
	flex: 1;
	padding: 16rpx;
}

/*底部操作栏*/

/*底部选择弹层*/

.tui-popup-class {
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
	padding-bottom: env(safe-area-inset-bottom);
}

.tui-popup-box {
	position: relative;
	padding: 30rpx 0 100rpx 0;
}

.tui-popup-btn {
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
}

.tui-right {
	position: absolute;
	right: 30rpx;
	top: 30rpx;
}
</style>
