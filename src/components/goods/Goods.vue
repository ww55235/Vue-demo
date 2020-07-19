<template>
  <div class="goods" v-if="goodsInfo">
    <div class="goods-header">
      <i @click="$router.push('/index')" class="icon fa fa-chevron-left"></i>
      <img class="bgImg" :src="goodsInfo.rst.scheme" alt="" />
      <img class="img_name" :src="goodsInfo.rst.image_path" alt="" />
    </div>
    <div class="content">
      <p class="title" @click.stop="isShow(true)">
        <span class="name">{{ goodsInfo.rst.name }}</span
        ><i class="titleIcon fa fa-caret-right"></i>
      </p>
      <div class="box">
        <span class="item">
          <span>评分</span
          ><span class="rating">{{ goodsInfo.rst.rating }}</span></span
        >
        <span class="item">
          <span>月售</span
          ><span class="sellCount">{{
            goodsInfo.rst.recent_order_num
          }}</span></span
        >
        <span class="time"
          >蜂鸟专送约{{ goodsInfo.rst.order_lead_time }}分钟</span
        >
        <Activity :activities="goodsInfo.rst.activities" />
        <p class="announcement_content">
          公告<span class="text">{{ goodsInfo.rst.promotion_info }}</span>
        </p>
      </div>
    </div>
    <div v-show="goodShow" class="infoModel">
      <GoodInfo @click="isShow(false)" :rst="goodsInfo.rst" />
    </div>
    <GoodsBar />
  </div>
</template>
<script>
import GoodsBar from "../goodsBar/GoodsBar";
import Activity from "../activity/Activity";
import GoodInfo from "../goodinfo/GoodInfo";
export default {
  data() {
    return {
      goodsInfo: null,
      goodShow: false,
    };
  },
  components: {
    GoodInfo,
    Activity,
    GoodsBar,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios("/api/profile/batch_shop").then((res) => {
        this.goodsInfo = res.data;
      });
    },
    isShow(isShow) {
      this.goodShow = isShow;
    },
  },
};
</script>
<style scoped>
.announcement_content {
  margin-top: 5px;
}
.box {
  margin-top: 10px;
  text-align: center;
  font-size: 10px;
  color: #9a9a9a;
}
.box > .item {
  display: inline-block;
  margin-right: 5px;
}
.goods-header {
  position: relative;
}
.name {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}
.titleIcon {
  vertical-align: bottom;
}
.title {
  margin-top: 50px;
  text-align: center;
}
.img_name {
  position: absolute;
  width: 50px;
  top: calc(80%);
  left: 50%;
  margin-left: -25px;
}
.icon {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  color: white;
}
.bgImg {
  width: 100%;
  filter: blur(1.5px);
}
</style>
