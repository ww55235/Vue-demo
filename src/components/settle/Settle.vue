<template>
  <div class="settle">
    <div class="header">
      <Header title="确认订单" />
    </div>
    <div class="settle-top-content">
      <p class="order-to">
        <span>订单配送至</span>
        <span class="order-tag" v-if="getUserInfo && getUserInfo.tag">{{
          getUserInfo.tag
        }}</span>
      </p>

      <p v-if="haveAddress" @click="handleBtn" class="add-address">
        <span class="address" v-if="getUserInfo && getUserInfo.address"
          >{{ getUserInfo.address }}{{ getUserInfo.bottom }}</span
        >
        <span v-else>选择收货地址</span>
        <i class="fa fa-angle-right"></i>
      </p>
      <p v-else class="add-address" @click="addAddress">
        新增收货地址 <i class="fa fa-angle-right"></i>
      </p>
      <p class="detail">
        <span class="user-name" v-if="getUserInfo && getUserInfo.name">
          {{ getUserInfo.name }}({{ getUserInfo.sex }})
        </span>
        <span class="user-phone" v-if="getUserInfo && getUserInfo.phone">{{
          getUserInfo.phone
        }}</span>
      </p>
      <Delivery :shopInfo="getOrderInfo.shopInfo" />
      <CartGroup :orderInfo="getOrderInfo" :totalPrice="getTotalPrice" />
    </div>
  </div>
</template>
<script>
import CartGroup from "../cartGroup/CartGroup";
import Delivery from "../delivery/Delivery";
import { mapGetters } from "vuex";
import Header from "../header/Header";
export default {
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      if (!vm.getUserInfo) {
        vm.getData();
      }
    });
  },
  data() {
    return {
      haveAddress: false,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getOrderInfo", "getTotalPrice"]),
  },
  components: {
    Header,
    Delivery,
    CartGroup,
  },
  methods: {
    handleBtn() {
      this.$router.push("/myaddress");
    },
    getData() {
      this.$axios(`/api/user/user_info/${localStorage.ele_Login}`).then(
        (res) => {
          if (res.data.myAddress.length > 0) {
            this.haveAddress = true;
          } else {
            this.haveAddress = false;
          }
        }
      );
    },
    addAddress() {
      this.$router.push({
        name: "addaddress",
        params: {
          title: "添加收货地址",
          address: {
            tag: "",
            sex: "",
            address: "",
            name: "",
            phone: "",
            bottom: "",
          },
        },
      });
    },
  },
};
</script>
<style scoped>
.settle {
  background-color: #0da2ef;
}
.settle-top-content {
  padding: 0 15px;
}
.settle-top-content .order-to {
  margin-top: 20px;
  color: #c5e9fc;
}
.detail {
  margin-top: 10px;
  font-size: 12px;
  color: #ffffff;
}
.settle-top-content .order-to .order-tag {
  margin-left: 5px;
  border: 1px solid #cccccc;
  font-size: 12px;
}
.settle-top-content .add-address {
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}
.add-address .address {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90vw;
}
</style>
