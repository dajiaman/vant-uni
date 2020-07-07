<template>
	<view>
		<van-button type="primary" @click="show = true">显示</van-button>
		
		<van-dialog v-model="show" :title="title" :message="message"
		:showCancelButton="showCancelButton"
		:messageAlign="messageAlign"
		:confirmButtonOpenType="confirmButtonOpenType"
		></van-dialog>
			
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			title: "标题",
			message: '代码是写出来给人看的，附带能在机器上运行',
			showCancelButton: false,
			messageAlign: 'left',
			confirmButtonOpenType: "getUserInfo"
		};
	}
};
</script>

<style></style>
