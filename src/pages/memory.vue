<template>
  <view class="page">
    <!-- <view v-for="item in picList" :key="item">
      <Photo :url="item"></Photo>
    </view> -->
    <view class="item" v-for="(item, index) in data" :key="item">
      <view class="item-title-container">
        <text class="item-date-text">{{ item.date }}</text>
        <text class="item-title-text">{{ item.title }}</text>
      </view>

      <view class="item-content">
        {{ item.content }}
      </view>

      <view class="image-container">
        <image
          class="item-img"
          v-for="img in item.photoUrls"
          :key="img"
          :src="img"
          @tap="preview(img, index)"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
import Photo from '../components/photo.vue';
import Http from '../utils/http.js';

export default {
  components: { Photo },
  data() {
    return {
      titleTop: 0,
      picList: [],
      data: []
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

    Http.get('https://marcoma.oss-cn-beijing.aliyuncs.com/data/data.json').then(
      (res) => {
        this.data = res.data;
      }
    );

    // 添加图片URL
    // for (let i = 11; i < 40; i++) {
    //   this.picList.push(
    //     `https://marcoma.oss-cn-beijing.aliyuncs.com/love/${i}.png`
    //   );
    // }
  },
  methods: {
    preview(url, index) {
      console.log(this.data[index].photoUrls);
      wx.previewImage({
        current: url,
        urls: this.data[index].photoUrls
      });
    }
  }
};
</script>

<style>
.page {
  min-height: 100%;
  background-image: url('../static/bg.jpg');
  background-size: cover;
  background-repeat: repeat;
}

.item {
  border: 1px dashed #ffffff;
}

.image-container {
  display: inline-block;
  height: auto;
  width: 100%;
  padding: 20rpx 20rpx 20rpx 40rpx;
}

.item-title-container {
  width: 100%;
  padding: 20rpx;
}

.item-date-text {
  color: #ffffff;
  font-size: 18px;
}

.item-date-text:before {
  display: inline-block;
  content: '';
  width: 5px;
  height: 16px;
  margin-right: 5px;
  background-color: pink;
}
.item-title-text {
  margin-left: 20rpx;
  color: #ffffff;
  font-size: 20px;
}
.item-content {
  padding: 0 20rpx 0 40rpx;
  font-size: 16px;
  color: #ffffff;
}

.item-img {
  width: 220rpx;
  height: 220rpx;
  margin-right: 10rpx;
}
</style>
