<template>
  <image class="img" v-if="show" :src="url"></image>
</template>

<script>
import Http from '../utils/http.js';

export default {
  props: {
    url: {
      type: String
    }
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    Http.requestImage('get', this.url)
      .then(() => {
        this.show = true;
      })
      .catch(() => {
        this.show = false;
      });
  }
};
</script>

<style>
.img {
  margin: 0 20px;
  width: calc(100% - 40px);
  height: 330px;
}
</style>
