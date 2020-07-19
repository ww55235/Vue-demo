<template>
  <div class="myaddress">
    <div class="header">
      <Header title="我的收货地址" />
    </div>
    <div class="address-content">
      <ul>
        <li
          class="user-address-item"
          v-for="(item, index) in addAddress"
          :key="index"
        >
          <div class="icon-box" v-if="selectAddress == index">
            <i class="fa fa-check-circle"> </i>
          </div>
          <p class="top" @click="selAddress(item, index)">
            <span class="user-name">{{ item.name }}</span>
            <span class="user-sex">{{ item.sex }}</span>
            <span class="user-phone">{{ item.phone }}</span>
          </p>
          <p class="bottom" @click="selAddress(item, index)">
            <span class="tag">{{ item.tag }}</span>
            <span class="user-address">{{ item.address }}</span>
          </p>
          <div class="edit" @click="btnEdit(item)">
            <i class="fa fa-edit"></i>
          </div>
          <div class="remove" @click="handlerDelete(item, index)">
            <i class="fa fa-remove"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-bottom" @click="handleClick">
      <i class="addicon fa fa-plus-circle"></i>
      <span class="add-address">新增收货地址</span>
    </div>
  </div>
</template>
<script>
import Header from "../header/Header";
export default {
  data() {
    return {
      addAddress: [],
      selectAddress: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData();
    });
  },
  methods: {
    handleClick() {
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
    handlerDelete(item, index) {
      this.$axios
        .delete(`/api/user/address/${localStorage.ele_Login}/${item._id}`)
        .then((res) => {
          this.addAddress.splice(index, 1);
        });
    },
    selAddress(address, index) {
      this.selectAddress = index;
      this.$store.dispatch("asyncUserInfo", address);
      this.$router.push("/settle");
    },
    getData() {
      this.$axios(`/api/user/user_info/${localStorage.getItem("ele_Login")}`)
        .then((res) => {
          this.addAddress = res.data.myAddress;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    btnEdit(item) {
      this.$router.push({
        name: "addaddress",
        params: {
          title: "编辑地址",
          address: item,
        },
      });
    },
  },
  components: {
    Header,
  },
};
</script>
<style scoped>
.icon-box {
  position: absolute;
  top: 27px;
  left: 0;
  color: #4cd964;
}
.top .user-name {
  margin-right: 5px;
  font-weight: 700;
}
.top .user-sex,
.top .user-phone {
  margin-right: 5px;
  font-size: 14px;
  color: #666666;
}
.top {
  margin-bottom: 5px;
}
.bottom .tag {
  display: inline-block;
  margin-right: 5px;
  padding: 1px;
  font-size: 10px;
  vertical-align: middle;
  color: #ff5722;
  border: 1px solid #ff5722;
}
.bottom .user-address {
  vertical-align: middle;
  display: inline-block;
  line-height: 15px;
  font-size: 14px;
  width: 280px;
  /* white-space: pre-line; */
  color: #666666;
}
.user-address-item {
  position: relative;
  padding: 15px;
  border-bottom: 1px solid #cccccc;
  background-color: #fff;
}
.user-address-item .edit {
  position: absolute;
  top: 35px;
  right: 25px;
  color: #666666;
}
.user-address-item .remove {
  position: absolute;
  top: 35px;
  right: 7px;
  color: #666666;
}
.btn-bottom {
  position: fixed;
  width: 100%;
  height: 50px;
  line-height: 50px;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: #fff;
}
.addicon {
  font-size: 18px;
  margin-right: 5px;
  color: #3190e8;
}
.add-address {
  color: #3190e8;
}
</style>
