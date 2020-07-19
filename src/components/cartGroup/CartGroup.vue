<template>
  <div class="cartGroup">
    <div class="cartGroup-content" v-if="orderInfo">
      <ul>
        <h3 class="title">{{ orderInfo.shopInfo.name }}</h3>
        <li
          class="selectFood"
          v-for="(food, index) in orderInfo.selectFood"
          :key="index"
        >
          <img :src="food.image_path" alt="" />
          <span class="food-name">{{ food.name }}</span>
          <span class="food-count">x {{ food.count }}</span>
          <span class="food-price">{{ food.activity.fixed_price }}</span>
        </li>
        <li class="order-sell">
          <span class="left">配送费</span>
          <span class="right"
            >¥{{ orderInfo.shopInfo.float_delivery_fee }}</span
          >
        </li>
        <li class="food-totalPrice">
          <div class="food-price">
            小计¥<span class="price">{{ totalPrice }}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 备注信息 -->
    <div class="Info" v-if="isShow">
      <CartItem
        @click="showTable = true"
        title="餐具份数"
        :placeholder="getremarkInfo.tableware || '未选择'"
      />
      <CartItem
        @click="$router.push('/remark')"
        title="订单备注"
        :placeholder="getremarkInfo.remark || '口味 偏好'"
      />
      <CartItem title="发票信息" placeholder="不需要开发票" />
      <Tableware @close="showTable = false" :isShow="showTable" />
    </div>
    <div class="pay" v-if="isShow">
      <span class="money"> ¥{{ totalPrice }} </span>
      <button class="payBtn" @click="payHandle">去支付</button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { mapGetters } from "vuex";
import Tableware from "../tableware/Tableware";
import CartItem from "../cartItem/CartItem";
export default {
  data() {
    return {
      showTable: false,
    };
  },
  computed: {
    ...mapGetters(["getremarkInfo", "getUserInfo"]),
  },
  props: {
    totalPrice: Number,
    orderInfo: Object,
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    CartItem,
    Tableware,
  },
  methods: {
    payHandle() {
      if (!this.getUserInfo) {
        Toast({
          message: "请选择您的收货地址",
          position: "bottom",
          duration: 2000,
        });
        return;
      }
      this.$router.push("/pay");
    },
  },
};
</script>
<style scoped>
.selectFood .food-name {
  display: inline-block;
  margin-left: 5px;
  margin-right: 15px;
}
.payBtn {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 10px;
  height: 100%;
  background-color: #00e067;
  color: #fff;
  outline: 0;
  border: 0;
}
.pay {
  position: relative;
  height: 30px;
  line-height: 30px;
  background-color: #3c3c3c;
  color: #fff;
}
.selectFood {
  position: relative;
}
.selectFood .food-count {
  position: absolute;
  right: 5px;
  top: 15px;
}
.order-sell {
  position: relative;
  padding: 10px 0;
  border-bottom: 1px solid #cccccc;
}
.order-sell .right {
  position: absolute;
  right: 5px;
  top: 5px;
}
.food-totalPrice {
  position: relative;
  margin-top: 10px;
  padding: 10px 0;
}
.food-totalPrice .food-price {
  position: absolute;
  right: 25px;
  top: 5px;
}
.food-totalPrice .food-price .price {
  font-size: 25px;
}
.cartGroup {
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
}
.title {
  font-weight: 700;
}
.selectFood {
  padding: 5px 0;
  margin: 5px 0;
  border-bottom: 1px solid #cccccc;
}
.selectFood img {
  vertical-align: middle;
  width: 40px;
}
</style>
