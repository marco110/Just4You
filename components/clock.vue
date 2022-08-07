<template>
	<canvas type="2d" id="myCanvas"></canvas>
	<!-- <canvas type="2d" canvas-id="myClock" id="clock" style="width: 400px; height: 400px;"></canvas> -->
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		this.initialize();
	},
	methods: {
		initialize() {
			this.$nextTick(() => {
				const query = wx.createSelectorQuery();
				query
					.select('#myCanvas')
					.fields({ node: true, size: true })
					.exec(res => {
						const canvas = res[0].node;
						const ctx = canvas.getContext('2d');

						const dpr = wx.getSystemInfoSync().pixelRatio;
						canvas.width = res[0].width * dpr;
						canvas.height = res[0].height * dpr;
						ctx.scale(dpr, dpr);

						ctx.fillRect(0, 0, 100, 100);
					});
			});

			// .exec(res => {
			// 	const canvas = res[0].node;
			// 	const ctx = canvas.getContext('2d');

			// 	// 画表盘
			// 	ctx.beginPath();
			// 	ctx.arc(0, 0, 100, 0, 2 * Math.PI);
			// 	ctx.strokeStyle = 'red';
			// 	ctx.stroke();
			// 	ctx.closePath();

			// 	// 画中心点
			// 	ctx.beginPath();
			// 	ctx.arc(0, 0, 5, 0, 2 * Math.PI);
			// 	ctx.strokeStyle = 'red';
			// 	ctx.stroke();
			// 	ctx.closePath();
			// });
			// const query = uni.createSelectorQuery().in(this);
			// const canvas = query.select('#clock');
			// const ctx = uni.createCanvasContext('clock');
			// const ctx = canvas.getContext('2d');
			// ctx.translate(200, 200);
			// ctx.save();

			// setInterval(() => {
			// 	ctx.save();
			// 	ctx.clearRect(0, 0, 400, 400);

			// 	ctx.translate(200, 200);
			// 	ctx.save();

			// 	// 画表盘
			// 	ctx.beginPath();
			// 	ctx.arc(0, 0, 100, 0, 2 * Math.PI);
			// 	ctx.stroke();
			// 	ctx.closePath();

			// 	// 画中心点
			// 	ctx.beginPath();
			// 	ctx.arc(0, 0, 5, 0, 2 * Math.PI);
			// 	ctx.stroke();
			// 	ctx.closePath();

			// 	let time = new Date();
			// 	const hour = time.getHours() % 12;
			// 	const minute = time.getMinutes();
			// 	const second = time.getSeconds();

			// 	// 画时针
			// 	// 以12点为起始点，坐标轴需要逆时针转90度，即需要减去90°
			// 	ctx.rotate(((2 * Math.PI) / 12) * hour + ((2 * Math.PI) / 12) * (minute / 60) - Math.PI / 2);
			// 	ctx.beginPath();
			// 	ctx.moveTo(0, 0);
			// 	ctx.lineTo(60, 0);
			// 	ctx.lineWidth = 8;
			// 	ctx.stroke();
			// 	ctx.closePath();

			// 	ctx.restore();
			// 	ctx.save();

			// 	// 画分针
			// 	// 以12点为起始点，坐标轴需要逆时针转90度，即需要减去90°
			// 	ctx.rotate(((2 * Math.PI) / 60) * minute + ((2 * Math.PI) / 60) * (second / 60) - Math.PI / 2);
			// 	ctx.beginPath();
			// 	ctx.moveTo(0, 0);
			// 	ctx.lineTo(75, 0);
			// 	ctx.lineWidth = 3;
			// 	ctx.stroke();
			// 	ctx.closePath();

			// 	ctx.restore();
			// 	ctx.save();

			// 	// 画秒针
			// 	// 以12点为起始点，坐标轴需要逆时针转90度，即需要减去90°
			// 	ctx.rotate(((2 * Math.PI) / 60) * second - Math.PI / 2);
			// 	ctx.beginPath();
			// 	ctx.moveTo(0, 0);
			// 	ctx.lineTo(85, 0);
			// 	ctx.lineWidth = 1;
			// 	ctx.stroke();
			// 	ctx.closePath();

			// 	ctx.restore();
			// 	ctx.save();

			// 	ctx.lineWidth = 1;
			// 	// 画刻度盘
			// 	for (let i = 0; i < 60; i++) {
			// 		ctx.rotate((2 * Math.PI) / 60);
			// 		ctx.beginPath();
			// 		ctx.moveTo(95, 0);
			// 		ctx.lineTo(100, 0);
			// 		ctx.stroke();
			// 		ctx.closePath();
			// 	}
			// 	ctx.restore();
			// 	ctx.save();

			// 	ctx.lineWidth = 3;
			// 	for (let i = 0; i < 12; i++) {
			// 		ctx.rotate((2 * Math.PI) / 12);
			// 		ctx.beginPath();
			// 		ctx.moveTo(90, 0);
			// 		ctx.lineTo(100, 0);
			// 		ctx.stroke();
			// 		ctx.closePath();
			// 	}
			// 	ctx.restore();
			// 	ctx.restore();
			// }, 1000);
		}
	}
};
</script>

<style lang="scss"></style>
