<template>
  <div class="login">
    <div class="content">
      <img class="login_img" src="@/assets/imgs/logo.jpg" alt="" />
      <div class="form">
        <InputGroup
          v-model="phone"
          class="inp"
          placeholder="手机号"
          :type="type"
          :disabled="disabled"
          :error="error.phone"
          :btnText="btnText"
          @vercode="verification"
          @input="handlerinp"
        />
        <InputGroup
          class="inp"
          v-model="vercode"
          :placeholder="verificationcode"
          :type="type"
          :disabled="disabled"
          @input="codehandler"
          :error="error.code"
        />
        <!-- :error="error.phone" -->
        <p class="desc">
          新用户登录即自动注册表示已同意<span style="color:blue"
            >《用户服务协议》</span
          >
        </p>
        <button @click="isLogin" :disabled="isClick" class="btn_login">
          登录
        </button>
      </div>
    </div>
  </div>
</template>
<script>
//引入封装好的InputGroup组件
import InputGroup from "@/components/inputGroup/InputGroup.vue";
export default {
  data() {
    return {
      phone: "",
      type: "number",
      verificationcode: "验证码",
      vercode: "",
      disabled: false,
      error: {},
      btnText: "获取验证码",
      value: "",
    };
  },
  components: {
    InputGroup,
  },
  computed: {
    //如果手机号和验证码有一项为空，就不能点击按钮
    isClick() {
      if (!this.phone || !this.vercode) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    handlerinp(value) {
      this.phone = value;
      this.error = {};
    },
    codehandler(value) {
      this.vercode = value;
      // console.log(this.vercode);
    },
    //判断手机输入的验证码是否正确
    isLogin() {
      this.error = {};
      //发送一个请求
      this.$axios
        .post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.vercode,
        })
        .then((res) => {
          // console.log(res.data);
          let _id = res.data.user._id;
          //设置本地存储表示已经登录
          localStorage.ele_Login = _id;
          //跳转到主页
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          //返回错误信息
          this.error = {
            code: err.response.data.msg,
          };
        });
    },
    verification() {
      //如果是合法的,返回true;
      if (this.verificationPhone()) {
        this.countDown();
        //发送请求拿到验证码
        this.$axios
          .post("/api/posts/sms_send", {
            sid: "",
            token: "",
            appid: "",
            templateid: "",
            phone: this.phone,
          })
          .then((res) => {
            // console.log(res);
          });
      }
    },
    //实现一个倒计时秒函数
    countDown() {
      let num = 10;
      //开启定时器
      let timer = setInterval(() => {
        if (num != 0) {
          num--;
          //修改btnText的值
          this.btnText = `倒计时${num}秒`;
          this.disabled = true;
        } else {
          clearInterval(timer);
          this.btnText = "获取验证码";
          this.disabled = false;
        }
      }, 1000);
    },
    //验证手机号
    verificationPhone() {
      if (!this.phone) {
        // console.log(this.phone);
        this.error = {
          phone: "手机号码不能为空！",
        };
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.error = {
          phone: "请输入合法的手机号！",
        };
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
  },
  props: {},
};
</script>
<style scoped>
button {
  border: 0;
  outline: none;
  cursor: pointer;
}
.login {
  width: 100%;
  margin: 0 auto;
}
.login_img {
  display: block;
  width: 50%;
  margin: 20px auto;
}
.form {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
.desc {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
}
.btn_login {
  margin-top: 10px;
  margin-left: 10px;
  width: 75%;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  border-radius: 3px;
  background: greenyellow;
  color: #ffffff;
}
.btn_login[disabled] {
  background: red;
}
</style>
