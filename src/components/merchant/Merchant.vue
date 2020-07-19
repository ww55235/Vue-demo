<template>
  <div class="merchant">
    <div class="merchantContent" v-if="merchantData">
      <img class="imgs" :src="merchantData.header_image" alt="" />
      <h4 class="title">{{ merchantData.title }}</h4>
      <p class="desc">{{ merchantData.brand_intros[0].brief }}</p>
      <p class="links">查看品牌故事</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      merchantData: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios("/api/profile/seller").then((res) => {
        // console.log(res.data);
        this.merchantData = res.data;
      });
    },
  },
};
</script>
<style scoped>
.desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-bottom: 10px;
  color: #666666;
  overflow: hidden;
  font-size: 14px;
}
.links {
  text-align: center;
  font-size: 10px;
  color: #666666;
}
.title {
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
}
.merchantContent {
  background-color: #fff;
  padding: 10px;
}
.imgs {
  width: 100%;
}
</style>
