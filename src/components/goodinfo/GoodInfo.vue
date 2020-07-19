<template>
  <transition name="fade">
    <div class="goodInfo" v-if="rst">
      <div class="goodInfo_content">
        <p>
          <span class="brand" v-if="rst.is_premium">品牌</span>
          <span class="name">{{ rst.name }}</span>
        </p>
        <ul class="nav">
          <li>
            <span class="rating">{{ rst.rating }}</span>
            <p>评分</p>
          </li>
          <li>
            <span class="sell">{{ rst.recent_order_num }}</span>
            <p class="sellCount">月售</p>
          </li>
          <li>
            <span v-if="rst.delivery_mode">蜂鸟专送</span>
            <p>约{{ rst.order_lead_time }}分钟</p>
          </li>
          <li>
            <span class="money">¥{{ rst.float_delivery_fee }}元</span>
            <p>配送费</p>
          </li>
          <li>
            <span class="distance"
              >{{ (rst.distance / 1000).toFixed(1) }}km</span
            >
            <p>距离</p>
          </li>
        </ul>
        <p class="announcement">公告</p>
        <p class="announcement_content">{{ rst.promotion_info }}</p>
        <div class="imgClose" @click="$emit('click')">
          <img
            src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    rst: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.goodInfo_content {
  position: relative;
  padding: 10px 10px;
  margin: 10px auto;
  width: 80vw;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.brand {
  padding: 1px;
  background-color: #ffe72b;
}
.name {
  margin-left: 5px;
  font-size: 20px;
  font-weight: 700;
}
.nav {
  margin: 10px 0;
  display: flex;
}
.nav > li {
  flex: 1;
}
.nav > li > span {
  display: inline-block;
  margin-bottom: 7px;
  font-weight: 700;
}
.nav > li > p {
  font-size: 11px;
  color: #999999;
}
.nav > li:nth-child(3) span {
  font-size: 14px;
}
.announcement::before,
.announcement::after {
  content: "-";
  display: inline-block;
  width: 20px;
}
.announcement {
  margin-bottom: 10px;
  font-size: 14px;
  color: #999999;
}
.announcement_content {
  font-size: 12px;
  color: #333333;
}
.imgClose {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 100%;
  margin-top: 20px;
  left: 50%;
  margin-left: -10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid white;
}
.imgClose > img {
  width: 100%;
  height: 100%;
}
</style>
