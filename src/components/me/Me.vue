<template>
  <div class="index">
    <div class="index-header">
      <div class="index-header-content">
        <div class="imgs"></div>
        <div class="login">
          <p v-if="userData" class="user_id">{{ userData._id }}</p>
          <p v-else @click="btnLogin">登录/注册</p>
          <p>
            <i class="icon_modile fa fa-mobile"></i>
            <span v-if="userData">{{ encryptPhone(userData.phone) }}</span>
            <span v-else>登录后享有更多的特权</span>
          </p>
        </div>
      </div>
      <i class="icon_angle-right fa fa-angle-right"></i>
    </div>
    <div class="address">
      <div style="marginLeft:50px;" @click="btnAddress">
        <i class="mapaddress fa fa-map-marker"></i>
        <span class="my_address">我的地址</span>
      </div>
      <i class="addressicon fa fa-angle-right"></i>
    </div>
    <div class="unlogin" @click="unlogin">
      <span>退出登录</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      vm.getData();
    });
  },
  methods: {
    btnAddress() {
      //判断userData中myaddress字段是否有无数据
      if (this.userData.myAddress.length > 0) {
        this.$router.push("/myaddress");
      } else {
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
      }
    },
    unlogin() {
      localStorage.removeItem("ele_Login");
      this.$router.push("/login");
    },
    encryptPhone(phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    btnLogin() {
      this.$router.push("/login");
    },
    getData() {
      let user_id = localStorage.getItem("ele_Login");
      this.$axios(`/api/user/user_info/${user_id}`).then((res) => {
        this.userData = res.data;
      });
    },
  },
};
</script>
<style scoped>
.user_id {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 160px;
}
.mapaddress {
  margin-right: 10px;
  color: #008eff;
}
.address,
.unlogin {
  position: relative;
  margin-top: 15px;
  height: 70px;
  line-height: 70px;
  background-color: #ffffff;
}
.unlogin {
  text-align: center;
  color: #ff5339;
  font-weight: 700;
}
.addressicon {
  position: absolute;
  top: 30px;
  right: 10px;
  font-size: 20px;
}
.index-header {
  position: relative;
  height: 120px;
  background-color: #008eff;
}
.icon_angle-right {
  position: absolute;
  top: 50px;
  right: 10px;
  color: #fff;
  font-size: 20px;
}
.index-header-content {
  display: flex;
  position: absolute;
  width: 100%;
  top: 30px;
  left: 50px;
  height: 100%;
}
.icon_modile {
  margin-right: 2px;
  vertical-align: middle;
}
.login p:first-child {
  font-size: 20px;
}
.login {
  flex: 1;
  position: relative;
  color: #ffffff;
  line-height: 30px;
  vertical-align: middle;
}
.imgs {
  overflow: hidden;
  margin-right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: url(https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png)
    no-repeat;
  background-size: 60px;
  background-position: 0px 0px;
}
</style>
