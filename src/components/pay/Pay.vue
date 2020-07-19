<template>
  <div class="pay" v-if="getOrderInfo">
    <Header title="在线支付" />
    <div class="payTime">
      <p>支付剩余时间</p>
      <p class="time">{{ countTimeDown }}</p>
    </div>
    <div class="shop-name">
      <span class="name">{{ getOrderInfo.shopInfo.name }}</span>
      <span class="money" v-if="totalPrice"> ¥{{ totalPrice }}</span>
    </div>

    <div>
      <h4>在线支付</h4>
      <ul>
        <li class="payItem">微信</li>
      </ul>
    </div>
    <button
      @click="pay"
      :class="{ disabled: isClick }"
      class="btn"
      :disabled="isClick"
    >
      确认支付
    </button>
  </div>
</template>
<script>
import Header from "../header/Header";
export default {
  data() {
    return {
      countTimeDown: "00:15:00",
      timer: null,
      isClick: false,
    };
  },
  components: {
    Header,
  },
  mounted() {
    this.timeDown();
  },
  methods: {
    pay() {
      const data = {
        out_trade_no: new Date().getTime().toString(),
        body: "铜锣湾山鸡哥炒饭馆",
        total_fee: 1,
      };
      alert("进入到pay方法中");
      fetch("http://www.thenewstep.cn/wxzf/example/jsapi.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          this.onBridgeReady(data);
        })
        .catch((err) => {
          alert("支付失败");
        });
    },

    onBridgeReady(data) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, (res) => {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          alert("支付成功。");
          this.addOrders();
        }
      });
    },
    addOrders() {
      let orderObj = {
        orderInfo: this.getOrderInfo,
        userInfo: this.getUserInfo,
        remarkInfo: this.getRemarkInfo,
        totalPrice: this.totalPrice,
      };
      // console.log(orderObj);
      this.$axios
        .post(`/api/user/add_order/${localStorage.ele_Login}`, orderObj)
        .then((res) => {
          // console.log(res.data);
          this.$router.push("/order");
        });
    },
    timeDown() {
      let minute = 14;
      let second = 59;
      this.timer = setInterval(() => {
        second--;
        if (minute == "00" && second == "00") {
          this.isClick = true;
          this.countTimeDown = "订单已超时";
          clearInterval(this.timer);
          return;
        }
        this.isClick = false;
        if (second == "00") {
          second = 59;
          minute--;
          if (minute < 10) {
            minute = "0" + minute;
          }
        }
        if (second < 10) {
          second = "0" + second;
        }
        this.countTimeDown = "00" + ":" + minute + ":" + second;
      }, 1000);
    },
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      //   clearInterval(vm.timer);
      // vm.timeDown();
      // vm.addOrders();
    });
  },
  computed: {
    getOrderInfo() {
      return this.$store.getters.getOrderInfo;
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
    getRemarkInfo() {
      return this.$store.getters.getremarkInfo;
    },
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
};
</script>
<style scoped>
.payTime {
  padding-top: 20px;
  box-sizing: border-box;
  text-align: center;
  height: 100px;
  background-color: #fff;
}
.payItem {
  text-align: center;
  background-color: #fff;
  padding: 10px 0;
}
.btn {
  outline: 0;
  border: 0;
  color: #fff;
  height: 40px;
  line-height: 40px;
  width: 100%;
  background-color: #00e067;
}
.disabled {
  background-color: #4d4d55 !important;
}
</style>
