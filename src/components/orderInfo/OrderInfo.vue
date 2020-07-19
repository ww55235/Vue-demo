<template>
  <div class="orderInfo">
    <Header title="订单详情" />
    <div class="order-success">
      <p>订单已送达</p>
      <p>感谢您的信任,期待下次光临</p>
    </div>
    <div v-if="orderInfo.orderInfo">
      <CartGroup
        :orderInfo="orderInfo.orderInfo"
        :totalPrice="orderInfo.totalPrice"
        :isShow="false"
      />
    </div>
    <div class="sell-desc">
      <p class="psdesc">配送信息</p>
      <p><span class="sell-time">送达时间</span>{{ orderInfo.date }}</p>
      <div class="sell-address" v-if="orderInfo.userInfo">
        <p>送货地址</p>
        <p class="username">
          {{ orderInfo.userInfo.name }}{{ orderInfo.userInfo.sex }}
        </p>
        <p class="phone">{{ orderInfo.userInfo.phone }}</p>
        <p class="address">
          {{ orderInfo.userInfo.address }}{{ orderInfo.userInfo.bottom }}
        </p>
      </div>
    </div>
    <div class="order-desc">
      <p>订单信息</p>
      <p class="id">订单号:{{ orderInfo._id }}</p>
      <p>支付方式：在线支付</p>
      <p class="time">下单时间:{{ orderInfo.date }}</p>
      <p class="remark" v-if="orderInfo.remarkInfo">
        订单备注:{{ orderInfo.remarkInfo.remark }}\{{
          orderInfo.remarkInfo.tableware
        }}
      </p>
    </div>
  </div>
</template>

<script>
import CartGroup from "../cartGroup/CartGroup";
import Header from "../header/Header";
export default {
  data() {
    return {
      orderInfo: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      vm.orderInfo = to.params;
    });
  },
  components: {
    Header,
    CartGroup,
  },
};
</script>
<style scoped>
.sell-desc {
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
}
.sell-address > p {
  margin: 10px 0;
}
.psdesc {
  margin-bottom: 10px;
}
.orderInfo .order-success {
  background-color: #fff;
  padding: 20px 10px;
  font-weight: 700;
}
.orderInfo .order-success > p {
  margin: 15px;
}
.orderInfo .order-success > p:first-child {
  padding-bottom: 10px;
  border-bottom: 1px solid black;
}
.order-desc {
  background-color: #fff;
}
.order-desc > p {
  border-bottom: 1px solid #cccccc;
  padding: 10px;
}
</style>
