<template>
  <div class="order">
    <div class="order-content" v-if="orderList">
      <div class="container" v-for="(order, index) in orderList" :key="index">
        <div
          class="img-container"
          v-if="order.orderInfo && order.orderInfo.shopInfo"
        >
          <img :src="order.orderInfo.shopInfo.image_path" />
        </div>
        <div v-if="order.orderInfo && order.orderInfo.shopInfo" class="desc">
          <div
            class="shop-name"
            @click="
              $router.push({
                name: 'orderinfo',
                params: order,
              })
            "
          >
            {{ order.orderInfo.shopInfo.name }}
          </div>
          <p class="order-time">{{ order.date }}</p>
          <p class="success">订单已完成</p>
          <p class="order-name">{{ order.orderInfo.selectFood[0].name }}</p>
          <p class="price">¥{{ order.totalPrice }}</p>
          <button class="btn">再来一单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData();
    });
  },
  methods: {
    getData() {
      this.$axios(`/api/user/orders/${localStorage.ele_Login}`).then((res) => {
        console.log(res.data);
        this.orderList = res.data.orderlist;
      });
    },
  },
};
</script>
<style scoped>
.desc .order-time {
  font-size: 14px;
  color: gray;
}
.desc {
  width: 75vw;
  position: relative;
}
.desc .order-name {
  font-size: 14px;
}
.desc .btn {
  border: 2px solid blue;
  margin-top: 10px;
  margin-right: 15px;
  float: right;
  color: blue;
}
.desc .success {
  position: absolute;
  top: 20px;
  right: 10px;
  font-size: 12px;
}
.desc > p {
  margin: 10px 0;
}
.desc .price {
  position: absolute;
  top: 50px;
  right: 10px;
  font-weight: 700;
  color: red;
}
.container {
  margin: 15px;
}
.img-container,
.desc {
  display: inline-block;
}
.desc {
  margin-left: 10px;
  vertical-align: top;
}
.img-container {
  width: 40px;
}
.img-container > img {
  width: 100%;
  height: 100%;
}
.shop-name {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
