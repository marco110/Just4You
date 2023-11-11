<template>
	<view class="page">
		<!-- <view class="home-title" :style="{ paddingTop: titleTop + 'px' }">Just For You</view> -->
		<image src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a3d405d4c6c48d794849dd491710e29~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1706&h=1280&s=238209&e=jpg&b=807167"></image>
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
	height: 220px;
}
</style>
