<template>
	<view style="width: 330rpx; height: 330rpx;"><canvas type="2d" id="clock" style="width: 330rpx; height: 330rpx;"></canvas></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		this.$nextTick(() => {
			this.drawClock();
		});
	},
	methods: {
		drawClock() {
			const query = wx.createSelectorQuery().in(this);
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
						ctx.strokeStyle = 'white';
						ctx.fillStyle = 'pink';
						ctx.fill();
						ctx.stroke();
						ctx.closePath();

						// 画中心爱心
						let loveImgPath = '/static/love.png';
						let loveImg = canvas.createImage(); //canvas 2d 通过此函数创建一个图片对象
						loveImg.src = loveImgPath;
						loveImg.onload = () => {
							ctx.drawImage(loveImg, canvasWidth / 2 - 25, canvasHeight / 2 - 25, 50, 50); // drawImage(imageResource, dx, dy, dWidth, dHeight) 缩放图片
						};

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
						ctx.lineWidth = 5;
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
							ctx.strokeStyle = 'white';
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

							ctx.fillStyle = 'white';
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

<style lang="scss"></style>
