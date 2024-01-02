<template>
  <image class="img" v-if="show" :src="url"></image>
</template>

<script>
import Http from "../utils/http.js";

export default {
  props: {
    url: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  async created() {
    try {
      const data = await Http.get(this.url);
      this.show = true;
    } catch (error) {
      this.show = false;
    }
  },
};
</script>


<style>
.img {
  margin: 0 20px;
  width: calc(100% - 40px);
  height: 330px;
}
</style>