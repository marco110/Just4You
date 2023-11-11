<template>
	<view class="page">
		<!-- <view class="home-title" :style="{ paddingTop: titleTop + 'px' }">Just For You</view> -->
		<image src="../static/2.jpg"></image>
	</view>
</template>

<script>
import Http from '../utils/http.js';

export default {
	components: { },
	data() {
		return {
			titleTop: 0,
			pic1:''
		};
	},
	async onLoad() {
		// 计算标题位置
		uni.getSystemInfo({
			success: res => {
				let { top, height } = uni.getMenuButtonBoundingClientRect();
				this.titleTop = top;
			}
		});
	},
	methods: {
		
	}
};
</script>

<style>
.page {
	display: flex;
	height: 100%;
	background-color: pink;
	/* background-image: linear-gradient(to bottom,  pink, #ffe15d); */
}

image {
	margin:0 20px 20px;
	width: 500px;
	height: 250px;
}
</style>
