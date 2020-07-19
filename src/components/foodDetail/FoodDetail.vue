<template>
  <div class="fooddetail" v-if="isShow">
    <div class="close" @click="$emit('close')">
      <img
        src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/"
        alt=""
      />
    </div>
    <div class="food_img">
      <img :src="food.image_path" alt="" />
    </div>
    <div class="food_name">{{ food.name }}</div>
    <p class="desc">
      <span>月售{{ food.month_sales }}</span>
      <span>&nbsp;好评率{{ food.satisfy_rate }}%</span>
    </p>
    <span class="food_money">¥{{ food.activity.fixed_price }}</span>
    <div class="cart" style="display:inline-block;marginLeft:300px;">
      <CartControll :food="food" />
    </div>
    <p class="food_detail">{{ food.description }}</p>
  </div>
</template>
<script>
import CartControll from "../cartcontroll/CartControll";
export default {
  props: {
    food: Object,
    isShow: Boolean,
  },
  components: {
    CartControll,
  },
};
</script>
<style scoped>
.food_detail {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
  color: #666666;
}
.food_money {
  font-size: 16px;
  margin-left: 10px;

  color: #ff0059;
}
.desc {
  margin-left: 10px;
  margin-bottom: 10px;
  color: #787878;
  font-size: 12px;
}
.food_name {
  font-weight: 700;
  margin-bottom: 10px;
  margin-left: 10px;
}
.food_img {
  padding-top: 5px;
}
.food_img img {
  width: 100%;
  height: 100%;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  background-color: #ccc;
  border-radius: 50%;
}
.close img {
  width: 100%;
  height: 100%;
}
</style>
