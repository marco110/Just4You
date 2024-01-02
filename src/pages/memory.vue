<template>
  <view class="page">
    <!-- <view class="home-title" :style="{ paddingTop: titleTop + 'px' }">Just For You</view> -->
    <view v-for="item in picList" :key="item" class="image-container">
      <!-- <image :src="item"></image> -->
      <Photo :url="item"></Photo>
    </view>
  </view>
</template>

<script>
import Photo from "../components/photo.vue";

export default {
  components: { Photo },
  data() {
    return {
      titleTop: 0,
      picList: [],
    };
  },
  async onLoad() {
    // 计算标题位置
    uni.getSystemInfo({
      success: (res) => {
        let { top, height } = uni.getMenuButtonBoundingClientRect();
        this.titleTop = top;
      },
    });

    // 添加图片URL
    for (let i = 10; i < 50; i++) {
      this.picList.push(
        `https://marcoma.oss-cn-beijing.aliyuncs.com/love/${i}.jfif`
      );
    }
  },
  methods: {},
};
</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #e8d5f8;
  /* background-image: linear-gradient(to bottom,  pink, #ffe15d); */
}

.image-container {
  display: inline-block;
  height: auto;
  width: 100%;
}

image {
  margin: 0 20px;
  width: calc(100% - 40px);
  height: 300px;
}
</style>
