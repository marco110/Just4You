<template>
  <view class="page">
    <view v-for="item in picList" :key="item">
      <Photo :url="item"></Photo>
    </view>
  </view>
</template>

<script>
import Photo from '../components/photo.vue';

export default {
  components: { Photo },
  data() {
    return {
      titleTop: 0,
      picList: []
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

    // 添加图片URL
    for (let i = 11; i < 40; i++) {
      this.picList.push(
        `https://marcoma.oss-cn-beijing.aliyuncs.com/love/${i}.png`
      );
    }
  },
  methods: {}
};
</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #c8c1ff;
  /* background-image: linear-gradient(to bottom,  pink, #ffe15d); */
}

.image-container {
  display: inline-block;
  height: auto;
  width: 100%;
}
</style>
