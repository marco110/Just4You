<template>
	<view class="page">
		<view class="header">
			<view class="title-countdown">在一起的第 {{ days }} 天</view>
			<view class="title-content"><jyf-parser :html="content"></jyf-parser></view>
		</view>

		<view class="clock-container"><clock></clock></view>

		<button class="button-next" @tap="getLoveContent">换句情话听听</button>

		<button class="button-contact" open-type="contact" bindcontact="handleContact">
			<image class="img-dog" src="../static/dog.gif"></image>
		</button>
	</view>
</template>

<script>
import Http from '../utils/http.js';
import jyfParser from '../components/jyf-parser/jyf-parser.vue';
import clock from '../components/clock.vue';

export default {
	components: { jyfParser, clock },
	data() {
		return {
			content: '记录我们在一起的每一秒！',
			startTime: '2022/08/04',
			days: 99
		};
	},
	async onLoad() {
		this.days = this.getLeftDays(new Date(this.startTime), new Date());
	},
	methods: {
		async getLoveContent() {
			this.content = await Http.get('words/api.php');
		},
		getLeftDays(startTime, endTime) {
			const leftTime = new Date(endTime) - new Date(startTime);
			return parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
		},
		handleContact() {}
	}
};
</script>

<style>
.page {
	height: 100%;
	background-color: pink;
	/* background-image: linear-gradient(to bottom,  pink, #ffe15d); */
}

.clock-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 450rpx;
}

.header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 375rpx;
	background-image: url(../static/header_bg.png);
	background-size: contain;
}

.title-countdown {
	width: 50%;
	text-align: center;
	font-family: 'Microsoft YaHei';
	font-size: 20px;
	color: red;
}

.title-content {
	margin-top: 30rpx;
	width: 50%;
	text-align: center;
	font-family: 'Microsoft YaHei';
	font-size: 14px;
	color: red;
}

.button-check {
	margin-top: 50rpx;
	color: #ff0000;
	padding: 0;
	width: 150rpx;
	height: 150rpx;
	background-color: #ffe15d;
	border-radius: 50%;
	font-size: 15px;
	font-weight: 600;
	line-height: 150rpx;
	transition: 0.5s all;
	transform: rotateX(0);
	border: none;
}

.button-check-rotate-X {
	transform: rotateX(360deg);
}

.qinghua {
	margin-top: 50rpx;
	padding: 20rpx;
	text-align: center;
	color: pink;
	font-size: 17px;
	font-weight: 600;
}

.button-next {
	width: 260rpx;
	font-size: 16px;
	border-radius: 20px;
	color: #ffffff;
	background-color: #ebb7ce;
	border-color: #ebb7ce;
}

button::after {
	border: none;
}

.button-service {
	float: right;
	margin: 0;
	padding: 0;
	width: 150rpx;
	height: 200rpx;
	background-color: transparent;
	border: none;
}

.button-contact {
	width: 200rpx;
	height: 300rpx;
	margin: 10rpx auto;
	padding: 0;
}

.img-dog {
	width: 200rpx;
	height: 300rpx;
}
</style>
