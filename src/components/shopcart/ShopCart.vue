<template>
  <div class="shopcart">
    <div
      @click="isMask = !isMask && !count"
      class="cart"
      :class="{ active_cart: !count }"
    >
      <i :class="{ active_icon: !count }" class="icon_cart fa fa-cart-plus"></i>
      <span v-if="!count" class="totalCount">{{ totalCount }}</span>
    </div>
    <div class="text" @click="isMask = !isMask && !count">
      <span v-if="count" class="no_shop">未选中商品</span>
      <span v-else class="money">¥{{ totalPrice.toFixed(2) }}元</span>
      <span class="psf">另需配送费{{ shopInfo.rst.float_delivery_fee }}元</span>
    </div>
    <button class="btn" :class="{ activt_btn: !count }" @click="goSettle">
      <span v-if="!count">去结算</span>
      <span v-else>¥{{ shopInfo.rst.float_minimum_order_amount }}元起送</span>
    </button>
    <transition name="fade">
      <div ref="cart_mask_scroll" class="cart_mask" v-if="isMask && !count">
        <header class="title">
          <span class="shop">已选商品</span>
          <span class="right" @click="clearCart">
            <i class="icon fa fa-trash"></i>
            <span>&nbsp;清空</span>
          </span>
        </header>
        <div class="cart_mask_content">
          <ul>
            <li
              class="select_food"
              v-for="(selectfood, index) in selectFood"
              :key="index"
            >
              <span class="select_name">
                {{ selectfood.name }}
              </span>
              <span class="selectfood_money">
                ¥{{ selectfood.activity.fixed_price }}</span
              >
              <div class="cartControll">
                <CartControll :food="selectfood" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// import BScroll from "better-scroll";
import { mapActions } from "vuex";
import CartControll from "../cartcontroll/CartControll";
export default {
  data() {
    return {
      totalCount: 0,
      totalPrice: 0,
      selectFood: [],
      isMask: false,
      // bscroll: null,
    };
  },
  methods: {
    ...mapActions(["asyncOrderInfo"]),
    clearCart() {
      this.shopInfo.recommend.forEach((recommed) => {
        recommed.items.forEach((item) => {
          item.count = 0;
        });
      });
      this.shopInfo.menu.forEach((menu) => {
        menu.foods.forEach((food) => {
          food.count = 0;
        });
      });
    },
    goSettle() {
      //使用vuex中的方法
      this.asyncOrderInfo({
        shopInfo: this.shopInfo.rst,
        selectFood: this.selectFood,
      });
      //跳转到结算组件
      this.$router.push("/settle");
    },
  },
  components: {
    CartControll,
  },
  props: {
    shopInfo: Object,
  },
  computed: {
    count() {
      let flag = true;
      this.totalCount = 0;
      this.totalPrice = 0;
      this.selectFood = [];
      this.shopInfo.recommend.forEach((recommed) => {
        recommed.items.forEach((item) => {
          if (item.count) {
            this.totalCount += item.count;
            this.totalPrice += item.activity.fixed_price * item.count;
            this.selectFood.push(item);
            // this.selectFood = new Set(this.selectFood);
            flag = false;
          }
        });
      });
      this.shopInfo.menu.forEach((menu) => {
        menu.foods.forEach((food) => {
          if (food.count) {
            this.totalCount += food.count;
            this.totalPrice += food.activity.fixed_price * food.count;
            this.selectFood.push(food);
            flag = false;
          }
        });
      });
      return flag;
    },
  },
};
</script>
<style scoped>
.selectfood_money {
  display: inline-block;
  color: #ff6a15;
  margin-left: 20px;
}
.select_name {
  display: inline-block;
  vertical-align: middle;
  width: 150px;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #000000;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 1s;
}
.select_food {
  position: relative;
}
.cartControll {
  position: absolute;
  right: 5px;
  top: 0;
}

.cart_mask {
  width: 100%;
  position: fixed;
  height: 200px;
  background-color: #ffffff;
  overflow-y: scroll;
  left: 0;
  bottom: 60px;
}
::-webkit-scrollbar {
  display: none;
}
.cart_mask .right {
  float: right;
  margin-right: 10px;
  font-size: 12px;
  color: #767676;
}
.cart_mask .title .shop {
  margin-left: 10px;
  color: #767676;
}
.cart {
  position: absolute;
  top: 0;
  left: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #363636;
  border-radius: 50%;
  border: 5px solid #464646;
}
.title {
  height: 40px;
  line-height: 40px;
  background-color: #eceff1;
}
.totalCount {
  position: absolute;
  width: 15px;
  height: 15px;
  line-height: 15px;
  background-color: #ff6a15;
  top: -5px;
  border-radius: 50%;
  right: -5px;
  color: #fff;
  font-size: 5px;
}
.active_cart {
  background-color: #3190e8 !important;
}
.active_icon {
  color: #fff !important;
}
.text {
  font-size: 10px;
  margin-left: 20vw;
}
.text .no_shop {
  color: #999999;
}
.activt_btn {
  background-color: #38ca73 !important;
  color: #fff;
}
.text .money {
  vertical-align: middle;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  color: #fff;
}
.text .psf {
  color: #999999;
}
.btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 110px;
  height: 100%;
  color: #fff;
  border: 0;
  outline: 0;
  font-weight: 700;
  background-color: #535356;
}
.shopcart {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 5;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #505052;
}
.icon_cart {
  font-size: 25px;
  color: #606065;
}
</style>
