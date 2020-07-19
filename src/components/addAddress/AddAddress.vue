<template>
  <div class="addaddress">
    <div class="header">
      <Header :title="title" />
    </div>
    <div class="fromInput">
      <FormInput
        type="text"
        label="联系人"
        placeholder="姓名"
        v-model="addressInfo.name"
      />
      <TabTags
        :selector="addressInfo.sex"
        @click="checksex"
        :tags="['先生', '女士']"
      />
      <FormInput
        type="text"
        label="电话"
        placeholder="手机号码"
        v-model="addressInfo.phone"
      />
      <FormInput
        v-model="addressInfo.address"
        type="text"
        label="地址"
        icon="angle-right"
        placeholder="小区/写字楼/学校等"
        @click="clickhandler"
      />

      <FormInput
        v-model="addressInfo.bottom"
        textarea="textarea"
        type="text"
        label="门牌号"
        placeholder="10号楼5单元404"
        icon="edit"
      />
      <div class="fromTags">
        <label>标签</label>
        <TabTags
          :selector="addressInfo.tag"
          @click="checktags"
          class="tags"
          :tags="['家', '学校', '公司']"
        />
      </div>
    </div>
    <div class="searchaddress" v-if="isShow">
      <SearchAddress
        :addressInfo="addressInfo"
        @click="btnHandler"
        :isShow="isShow"
      />
    </div>
    <div class="button">
      <button class="btnCancel" @click="btnCancel">确定</button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import SearchAddress from "../searchAddress/SearchAddress";
import TabTags from "../tabtgs/TabTags";
import FormInput from "../formInput/FormInput";
import Header from "../header/Header";
export default {
  data() {
    return {
      title: "添加收货地址",
      addressInfo: {
        tag: "",
        sex: "",
        address: "",
        name: "",
        phone: "",
        bottom: "",
      },
      isShow: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.title = to.params.title;
      vm.addressInfo = to.params.address;
    });
  },
  components: {
    Header,
    FormInput,
    TabTags,
    SearchAddress,
  },
  methods: {
    checksex(item) {
      this.addressInfo.sex = item;
    },
    tipMsg(msg) {
      Toast({
        message: msg,
        position: "bottom",
        duration: 2000,
      });
    },
    clickhandler() {
      this.isShow = true;
    },
    btnHandler(item) {
      this.isShow = false;
    },
    checktags(item) {
      this.addressInfo.tag = item;
    },
    btnCancel() {
      // console.log(this.addressInfo);
      if (!this.addressInfo.name) {
        this.tipMsg("请输入联系人");
        return;
      }
      if (!this.addressInfo.phone) {
        this.tipMsg("请输入手机号码");
        return;
      }
      if (!this.addressInfo.address) {
        this.tipMsg("请输入收货地址");
        return;
      }
      if (this.title === "添加收货地址") {
        this.addAddress();
      } else {
        this.editAddress();
      }
    },
    editAddress() {
      this.$axios
        .post(
          `api/user/edit_address/${localStorage.ele_Login}/${this.addressInfo._id}`,
          this.addressInfo
        )
        .then((res) => {
          if (!this.$store.getters.getUserInfo) {
            this.$store.dispatch(asyncUserInfo, this.addressInfo);
          }
          this.$router.push("/myaddress");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addAddress() {
      this.$axios
        .post(
          `/api/user/add_address/${localStorage.getItem("ele_Login")}`,
          this.addressInfo
        )
        .then((res) => {
          // console.log(res.data);
          this.$router.push("/myaddress");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
button {
  border: 0;
  outline: 0;
}
.searchaddress {
  position: fixed;
  background-color: #fff;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 0;
}
.fromTags {
  display: flex;
}
.button {
  text-align: center;
}
.btnCancel {
  margin-top: 20px;
  width: 80%;
  height: 40px;
  line-height: 40px;
  background-color: #00d762;
  color: #fff;
}
label {
  padding-left: 10px;
  text-align: left;
  line-height: 58px;
  background-color: #fff;
  font-weight: 700;
  flex: 0.3;
}
.tags {
  flex: 1;
}
</style>
