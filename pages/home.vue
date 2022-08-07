<template>
	<view class="page">
		<view class="header">
			<view class="title-countdown">在一起的第 {{ days }} 天</view>
			<view class="title-content"><jyf-parser :html="content"></jyf-parser></view>
		</view>

		<view class="clock-container"><canvas type="2d" id="clock" style="width: 360rpx; height: 360rpx;"></canvas></view>
		<!-- <button :class="'button-check ' + buttonClass" @tap="check">{{ checkContent }}</button> -->

		<button class="button-next" @tap="getLoveContent">换句情话听听</button>

		<button class="button-contact" open-type="contact" bindcontact="handleContact">
			<image class="img-dog" src="../static/dog.gif"></image>
		</button>
	</view>
</template>

<script>
import Http from '../utils/http.js';
import jyfParser from '../components/jyf-parser/jyf-parser.vue';

export default {
	components: { jyfParser },
	data() {
		return {
			checkContent: '打卡',
			content: '记录我们在一起的每一秒！',
			startTime: '2022/08/04',
			days: 99
		};
	},
	async onLoad() {
		// this.getLoveContent();
		// this.content = await Http.get('words/api.php');
		this.days = this.getLeftDays(new Date(this.startTime), new Date());
	},
	onReady() {
		this.drawClock();
	},
	computed: {
		buttonClass() {
			if (this.checkContent === '加油') {
				return 'button-check-rotate-X';
			}
			return '';
		}
	},
	methods: {
		check() {
			this.checkContent = this.checkContent === '打卡' ? '加油' : this.checkContent === '加油' ? 'fighting' : '加油';
		},
		async getLoveContent() {
			this.content = await Http.get('words/api.php');
		},
		getLeftDays(startTime, endTime) {
			const leftTime = new Date(endTime) - new Date(startTime);
			return parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
		},
		handleContact() {},
		drawClock() {
			const query = wx.createSelectorQuery();
			query
				.select('#clock')
				.fields({ node: true, size: true })
				.exec(res => {
					const canvas = res[0].node;
					const ctx = canvas.getContext('2d');

					const dpr = wx.getSystemInfoSync().pixelRatio;
					canvas.width = res[0].width * dpr;
					canvas.height = res[0].height * dpr;
					ctx.scale(dpr, dpr);

					const canvasWidth = res[0].width;
					const canvasHeight = res[0].height;

					setInterval(() => {
						ctx.save();
						ctx.clearRect(0, 0, canvasWidth, canvasHeight);

						ctx.translate(canvasWidth / 2, canvasHeight / 2);
						ctx.save();

						// 画表盘
						ctx.beginPath();
						ctx.arc(0, 0, canvasWidth / 2 - 14, 0, 2 * Math.PI);
						ctx.fillStyle = '#ffffff';
						ctx.fill();
						ctx.stroke();
						ctx.closePath();

						// // 画中心点
						// ctx.beginPath();
						// ctx.arc(0, 0, 2, 0, 2 * Math.PI);
						// ctx.stroke();
						// ctx.closePath();

						let time = new Date();
						const hour = time.getHours() % 12;
						const minute = time.getMinutes();
						const second = time.getSeconds();

						// 画时针
						// 以12点为起始点，坐标轴需要逆时针转90度，即需要减去90°
						ctx.rotate(((2 * Math.PI) / 12) * hour + ((2 * Math.PI) / 12) * (minute / 60) - Math.PI / 2);
						ctx.beginPath();
						ctx.moveTo(-2, 0);
						ctx.lineTo(canvasWidth / 2 - 50, 0);
						ctx.lineWidth = 6;
						ctx.stroke();
						ctx.closePath();

						ctx.restore();
						ctx.save();

						// 画分针
						// 以12点为起始点，坐标轴需要逆时针转90度，即需要减去90°
						ctx.rotate(((2 * Math.PI) / 60) * minute + ((2 * Math.PI) / 60) * (second / 60) - Math.PI / 2);
						ctx.beginPath();
						ctx.moveTo(-4, 0);
						ctx.lineTo(canvasWidth / 2 - 40, 0);
						ctx.lineWidth = 3;
						ctx.strokeStyle = '#008000';
						ctx.stroke();
						ctx.closePath();

						ctx.restore();
						ctx.save();

						// 画秒针
						// 以12点为起始点，坐标轴需要逆时针转90度，即需要减去90°
						ctx.rotate(((2 * Math.PI) / 60) * second - Math.PI / 2);
						ctx.beginPath();
						ctx.moveTo(-10, 0);
						ctx.lineTo(canvasWidth / 2 - 30, 0);
						ctx.lineWidth = 2;
						ctx.strokeStyle = 'red';
						ctx.stroke();
						ctx.closePath();

						ctx.restore();
						ctx.save();

						ctx.lineWidth = 1;
						// 画刻度盘
						for (let i = 0; i < 60; i++) {
							ctx.rotate((2 * Math.PI) / 60);
							ctx.beginPath();
							ctx.moveTo(canvasWidth / 2 - 18, 0);
							ctx.lineTo(canvasWidth / 2 - 14, 0);
							ctx.stroke();
							ctx.closePath();
						}

						ctx.lineWidth = 2;
						for (let i = 0; i < 12; i++) {
							ctx.rotate((2 * Math.PI) / 12);
							ctx.beginPath();
							ctx.moveTo(canvasWidth / 2 - 24, 0);
							ctx.lineTo(canvasWidth / 2 - 14, 0);
							ctx.stroke();
							ctx.closePath();

							ctx.fillStyle = 'black';
							ctx.font = '12px blod arial';
							if (i > 8) {
								ctx.fillText(i + 1, -5, -(canvasWidth / 2 - 10));
							} else {
								ctx.fillText(i + 1, -2, -(canvasWidth / 2 - 10));
							}
						}
						ctx.restore();
						ctx.restore();
					}, 1000);
				});
		}
	}
};
</script>

<style>
.page {
	height: 100%;
	background-color: #fffbe5;
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
	background-image: url('../static/time_bg.png');
	background-size: contain;
}

.title-countdown {
	width: 50%;
	text-align: center;
	font-family: 'Microsoft YaHei';
	font-size: 20px;
	color: #ffffff;
}

.title-content {
	margin-top: 30rpx;
	width: 50%;
	text-align: center;
	font-family: 'Microsoft YaHei';
	font-size: 14px;
	color: #ffffff;
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
	margin-top: 30rpx;
	width: 260rpx;
	font-size: 16px;
	border-radius: 20px;
	color: #ffffff;
	background-color: pink;
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
	float: right;
	width: 200rpx;
	height: 300rpx;
	margin: 0;
	padding: 0;
}

.img-dog {
	width: 200rpx;
	height: 300rpx;
}
</style>
