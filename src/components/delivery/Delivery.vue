<template>
  <div class="delivery" v-if="shopInfo">
    <div class="content-top">
      <div class="one">
        <p class="time">送达时间</p>
        <span class="text" v-if="shopInfo.delivery_mode.text">
          {{ shopInfo.delivery_mode.text }}
        </span>
      </div>
      <div class="two">
        尽快送达({{ getTime(shopInfo.order_lead_time) }}送达)
      </div>
      <div class="pay">
        <span class="left">支付方式</span>
        <span class="right">在线支付</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shopInfo: Object,
  },
  methods: {
    getTime(time) {
      let date = new Date();
      date.setMinutes(date.getMinutes() + time);
      return date.getHours() + ":" + date.getMinutes();
    },
  },
};
</script>
<style scoped>
.content-top {
  padding: 10px;
  background-color: #ffffff;
}
.content-top .text {
  display: inline-block;
  padding: 2;
  font-size: 12px;
  color: #ffffff;
  background-color: #0087ff;
}
.one,
.two {
  display: inline-block;
}
.pay {
  margin-top: 15px;
  overflow: hidden;
}
.pay .left {
  float: left;
}
.pay .right {
  float: right;
  color: #0087ff;
}
.two {
  position: relative;
  top: -8px;
  left: 100px;
  color: #0da2ef;
}
</style>
