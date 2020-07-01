<template>
	<view class="van-empty">
		<view class="van-empty__image"><image :src="imageUrl"></image></view>
		<view class="van-empty__description" v-if="description">{{ description }}</view>
		
		
		<view class="van-empty__bottom">
			<slot >
			</slot>
		</view>
		
	</view>
</template>

<script>
export default {
	props: {
		description: {
			type: String
		},
		image: {
			type: String,
			default: 'default'
		}
	},
	data(){
		return {
			imageUrl: ''
		}
	},
	created() {
		const PRESETS = ['error', 'search', 'default'];
		
		let { image } = this;

		if (PRESETS.indexOf(image) !== -1) {
			this.imageUrl = `https://img.yzcdn.cn/vant/empty-image-${image}.png`;
		}else{
			
			this.imageUrl = image;
		}
		

		
		
	}
};
</script>

<style lang="scss" scoped>
.van-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: $empty-padding;

	&__image {
		width: $empty-image-size;
		height: $empty-image-size;

		image {
			width: 100%;
			height: 100%;
		}
	}

	&__description {
		margin-top: $empty-description-margin-top;
		padding: $empty-description-padding;
		color: $empty-description-color;
		font-size: $empty-description-font-size;
		line-height: $empty-description-line-height;
	}

	&__bottom {
		margin-top: $empty-bottom-margin-top;
	}
	
}
</style>
