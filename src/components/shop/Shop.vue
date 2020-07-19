<template>
  <div class="shop" @click="$emit('click')">
    <div class="shop-wrap">
      <div class="one">
        <img class="img" :src="restaurant.image_path" alt="" />
      </div>
      <div class="two">
        <div class="top">
          <span v-if="restaurant.is_premium" class="brand">品牌</span>
          <span class="name">{{ restaurant.name }}</span>
        </div>
        <div class="midden">
          <RatingStar v-if="restaurant.rating" :rating="restaurant.rating" />
          <div class="desc">
            <span v-if="restaurant.rating" class="rating">{{
              restaurant.rating
            }}</span
            ><span class="sellCount">{{ restaurant.rating_count }}单</span>
            <span v-if="restaurant.delivery_mode" class="fn">{{
              restaurant.delivery_mode.text
            }}</span>
          </div>
        </div>
        <div class="bottom">
          <span class="send"
            >¥{{ restaurant.float_minimum_order_amount }}起送</span
          >
          <span class="sendMoney"
            >配送费¥{{ restaurant.float_delivery_fee }}</span
          >
          <div class="footer">
            <span> {{ (restaurant.distance / 1000).toFixed(2) }}km </span>
            |
            <span>{{ restaurant.order_lead_time }}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RatingStar from "../ratingStar/RatingStar";
export default {
  components: {
    RatingStar,
  },
  props: {
    restaurant: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.desc {
  position: relative;
}
.desc .fn {
  position: absolute;
  padding: 1px;
  right: 3px;
  top: 0;
  font-size: 10px;
  color: #ffffff;
  background-color: #3a7ef6;
}
.two {
  padding-left: 10px;
  padding-top: 10px;
}
.desc .rating {
  margin-right: 5px;
  font-size: 14px;
  color: #cccccc;
}
.bottom {
  position: relative;
}
.footer {
  position: absolute;
  right: 5px;
  top: 0;
  font-size: 12px;
}
.star {
  font-size: 14px;
  margin: 5px 5px;
  color: #deb40c;
}
.sellCount {
  font-size: 14px;
  color: #cccccc;
}
.top .brand {
  font-size: 10px;
  background-color: #e6d901;
  margin: 0 10px;
  padding: 1px;
}
.top .name {
  font-size: 12px;
}
.shop {
  background-color: #ffffff;
}
.shop-wrap {
  display: flex;
}
.shop-wrap .one {
  flex: 0.2;
  height: 100px;
  line-height: 100px;
}
.send {
  margin-right: 5px;
}
.send,
.sendMoney {
  color: black;
  font-size: 10px;
}
.img {
  vertical-align: top;
  margin-top: 15px;
  width: 100%;
}
.shop-wrap .two {
  flex: 1;
}
</style>
