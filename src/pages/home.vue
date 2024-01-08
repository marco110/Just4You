<template>
  <view class="page">
    <view class="home-title" :style="{ paddingTop: titleTop + 'px' }"
      >Just For You</view
    >

    <view class="header">
      <view class="title-countdown"
        >与小孙相识第{{ days }}天，相恋第{{ loveDay }}天</view
      >
      <!-- <view class="title-countdown">爱意随风起，爱已随风去...</view> -->
      <view class="title-content"
        ><jyf-parser :html="content"></jyf-parser
      ></view>
    </view>

    <view class="button-container">
      <button class="button-next" @tap="getLoveContent">换句情话</button>
      <button class="button-next" @tap="showPasswordBox">美好回忆</button>
    </view>

    <view class="clock-container"><clock></clock></view>

    <button
      class="button-contact"
      open-type="contact"
      bindcontact="handleContact"
    >
      <image class="img-dog" src="../static/cat-flower.png"></image>
    </button>

    <box
      :value="showBox"
      :is_scroll="false"
      :type="'2000'"
      @change="onBoxChange"
    >
      <view style="background-color: #ffffff; padding: 40rpx 60rpx">
        <span>请输入查看密码：</span>
        <mypOneInput
          ref="password"
          :value="password"
          @input="onPWChange"
          :autoFocus="showBox"
        ></mypOneInput>
      </view>
    </box>
  </view>
</template>

<script>
import config from '../config/index.js';
import Http from '../utils/http.js';
import jyfParser from '../components/jyf-parser/jyf-parser.vue';
import clock from '../components/clock.vue';
import mypOneInput from '../components/myp-one.vue';
import box from '../components/d-tan.vue';
const baseUrl = config.loveliveServerHost;

export default {
  components: { jyfParser, clock, mypOneInput, box },
  data() {
    return {
      content: '希望我们永不分开，共创未来！',
      startTime: '2023/08/12',
      startLoveTime: '2023/10/15',
      days: 99, // 相识
      loveDay: 99, // 相恋
      titleTop: 0,
      showBox: false,
      password: ''
    };
  },
  async onLoad() {
    // 计算标题位置
    uni.getSystemInfo({
      success: (res) => {
        let { top, height } = uni.getMenuButtonBoundingClientRect();
        this.titleTop = top;
      }
    });

    this.days = this.getLeftDays(new Date(this.startTime), new Date()) + 1;
    this.loveDay =
      this.getLeftDays(new Date(this.startLoveTime), new Date()) + 1;
  },
  methods: {
    async getLoveContent() {
      this.content = await Http.get(baseUrl + 'words/api.php');
    },
    getLeftDays(startTime, endTime) {
      const leftTime = new Date(endTime) - new Date(startTime);
      return parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
    },
    handleContact() {},
    showPasswordBox() {
      this.showBox = true;
    },
    onBoxChange(visible) {
      this.showBox = visible;
    },
    onPWChange(value) {
      this.password = value;
      if (value == '1007') {
        this.password = '';
        this.showBox = false;

        uni.navigateTo({
          url: './memory'
        });
      } else if (value.length === 4) {
        setTimeout(() => {
          this.password = '';
        }, 1000);
        uni.showToast({ title: '密码错误', icon: 'error' });
      }
    }
  }
};
</script>

<style>
.page {
  height: 100%;
  background-color: #c8c1ff;
  /* background-image: linear-gradient(to bottom,  pink, #ffe15d); */
}

.home-title {
  width: 100%;
  padding-bottom: 20rpx;
  background-color: #c8c1ff;
  text-align: center;
  color: red;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-size: 18px;
  font-weight: 600;
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
  width: 70%;
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 16px;
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

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30rpx;
}

.button-next {
  width: 300rpx;
  font-size: 16px;
  border-radius: 20px;
  color: cornsilk;
  background-color: #ebb7ce;
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
}

.button-contact {
  width: 250rpx;
  height: 250rpx;
  margin: 10rpx auto;
  padding: 0;
}

.img-dog {
  width: 250rpx;
  height: 250rpx;
}
</style>
