<template>
  <view class="page">
    <view class="home-title" :style="{ paddingTop: titleTop + 'px' }"
      >Just For You</view
    >

    <view class="header">
      <text>我们在一起已经</text>
      <text>{{ loveDays }} <text style="margin-left: 10rpx"> 天</text></text>
      <view class="avatar-container">
        <view class="imag-avatar"><span>M</span></view>
        <view class="imag-avatar"><span>S</span></view>
      </view>
    </view>

    <view class="love-words">
      <view class="love-words-title">
        <text>每天一句情话</text>
        <view class="refresh" @tap="getLoveContent"></view>
      </view>
      <view class="title-content"
        ><jyf-parser :html="content"></jyf-parser
      ></view>
    </view>

    <view class="diary-container" @tap="showPasswordBox">
      <view class="diary-container-text">
        <text>恋爱日记</text>
      </view>
      <image class="img-diary" src="../static/diary.png"></image>
    </view>

    <view class="clock-container">
      <text>记录相恋的每一秒钟</text>
      <clock></clock>
    </view>

    <view class="love-calendar">
      <view class="love-calendar-header">
        <view class="header-circle"><view class="circle-content"></view></view>
        <text class="header-text">纪念我们曾经的相恋</text>
        <view class="header-circle"><view class="circle-content"></view></view>
      </view>
      <view class="love-calendar-content">
        <view class="love-calendar-content-title">
          <text>M</text>
          <image src="../static/love2.png"></image>
          <text>S</text>
        </view>

        <view style="width: 85%; border: 2px dashed pink; border-radius: 20px">
          <view class="love-calendar-content-des">
            <text>2023年10月15日</text>
            <text>从这天开始，我们一起度过了</text>
          </view>

          <view class="love-calendar-content-time">
            <text>{{ loveDays }}天</text>
            <text>{{ loveHours }}小时</text>
            <text>{{ loverMinutes }}分钟</text>
            <text>{{ loveSeconds }}秒钟</text>
          </view>
        </view>
      </view>
    </view>

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
      content: '',
      //   content: '希望我们永不分开，共创未来！',
      startTime: '2023/08/12',
      startLoveTime: '2023/10/15',
      days: 99, // 相识
      loveDays: 99, // 相恋
      loveHours: 99,
      loverMinutes: 99,
      loveSeconds: 99,
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
    // this.loveDays =
    //   this.getLeftDays(new Date(this.startLoveTime), new Date()) + 1;
    this.getLoveContent();

    setInterval(() => {
      this.getTimes();
    }, 1000);

    Http.get('https://marcoma.oss-cn-beijing.aliyuncs.com/data/data.json').then(
      (res) => {
        console.log(res);
      }
    );
  },
  onShareAppMessage() {
    return {
      title: '欢迎查看看我们的恋爱时光，祝福我们吧！',
      path: '/pages/index'
    };
  },
  methods: {
    async getLoveContent() {
      this.content = await Http.get(baseUrl + 'words/api.php');
    },
    getLeftDays(startTime, endTime) {
      const leftTime = new Date(endTime) - new Date(startTime);
      return parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
    },
    getLeftHours(startTime, endTime) {
      const leftTime = new Date(endTime) - new Date(startTime);
      return parseInt(leftTime / 1000 / 60 / 60, 10);
    },
    getLeftMinutes(startTime, endTime) {
      const leftTime = new Date(endTime) - new Date(startTime);
      return parseInt(leftTime / 1000 / 60, 10);
    },
    getLeftSeconds(startTime, endTime) {
      const leftTime = new Date(endTime) - new Date(startTime);
      return parseInt(leftTime / 1000, 10);
    },
    getTimes() {
      this.loveDays =
        this.getLeftDays(new Date(this.startLoveTime), new Date()) + 1;
      this.loveHours = this.getLeftHours(
        new Date(this.startLoveTime),
        new Date()
      );
      this.loverMinutes = this.getLeftMinutes(
        new Date(this.startLoveTime),
        new Date()
      );
      this.loveSeconds = this.getLeftSeconds(
        new Date(this.startLoveTime),
        new Date()
      );
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
  min-height: 100%;
  background-image: url('../static/bg.jpg');
  background-size: cover;
}

.home-title {
  width: 100%;
  padding-bottom: 20rpx;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
}

.header {
  display: flex;
  flex-direction: column;
  width: 40%;
  height: auto;
  padding-left: 50rpx;
}

.header text:nth-child(1) {
  color: #ffffff;
  font-size: 16px;
  line-height: 32px;
}

.header text:nth-child(2) {
  color: #ffffff;
  font-size: 20px;
  line-height: 40px;
}

.avatar-container {
  display: flex;
  flex-direction: row;
}

.imag-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #3393ff, #cba5f6);
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.imag-avatar:nth-child(2) {
  margin-left: -40rpx;
  background: linear-gradient(225deg, #3393ff, #cba5f6);
}

.imag-avatar span {
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
}

.love-words {
  position: relative;
  top: -80rpx;
  left: 40%;
  width: 60%;
  display: flex;
  flex-direction: column;
}

.love-words-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
}
.love-words .refresh {
  position: relative;
  left: 20rpx;
  width: 44rpx;
  height: 44rpx;
  background-image: url('../static/refresh.png');
  background-size: cover;
}

.title-countdown {
  width: 70%;
  text-align: center;
  font-family: 'Microsoft YaHei';
  font-size: 16px;
  color: red;
}

.title-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20rpx;
  width: 95%;
  min-height: 200rpx;
  font-family: 'Microsoft YaHei';
  font-size: 16px;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 15px;
  box-shadow: inset 0px 0px 30px rgb(196, 158, 244);
}

.clock-container {
  position: relative;
  top: -140rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
}

.clock-container text {
  padding-bottom: 20rpx;
}

.diary-container {
  position: relative;
  top: -200rpx;
  left: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 250rpx;
  height: 120rpx;
  background-color: rgba(255, 255, 255, 0.5);
}

.diary-container-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img-diary {
  width: 64rpx;
  height: 64rpx;
  margin-left: 20rpx;
}

.love-calendar {
  position: relative;
  top: -140rpx;
  width: calc(100% - 40rpx);
  padding: 20rpx;
}

.love-calendar-header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100rpx;
  background-color: pink;
  border-radius: 20px 20px 0 0;
  border-bottom: 2px dashed #ffffff;
}

.header-circle {
  background-color: #000000;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  box-shadow: 0px 0px 10px red;
}

.header-text {
  color: #ffffff;
  font-size: 18px;
}

.circle-content {
  position: relative;
  bottom: 58rpx;
  left: 2rpx;
  width: 36rpx;
  height: 90rpx;
  border-radius: 30%;
  background-image: radial-gradient(#ffffff, #000000);
}

.love-calendar-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  border-radius: 0 0 20px 20px;
  padding: 20rpx 0;
}

.love-calendar-content-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.love-calendar-content-title text {
  font-size: 20px;
  margin: 0 20rpx;
}

.love-calendar-content-title image {
  width: 40rpx;
  height: 40rpx;
}

.love-calendar-content-des,
.love-calendar-content-time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.love-calendar-content-des text {
  color: #5d1c1c;
  font-size: 18px;
  line-height: 30px;
}

.love-calendar-content-time text {
  color: rgb(178, 90, 105);
  font-size: 16px;
  line-height: 30px;
}
</style>
