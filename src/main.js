import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import qs from "qs";
//引入mint ui
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
//引入初始化样式文件
import "./assets/css/reset.css";
//引入字体图标
import "font-awesome/css/font-awesome.css";
Vue.use(MintUI);
import { Indicator } from "mint-ui";

Vue.config.productionTip = false;
import axios from "axios";
//引入animate动画库
import animated from "animate.css"; // npm install animate.css --save安装，在引入
Vue.use(animated);
Vue.prototype.$axios = axios;
//设置默认请求头
axios.defaults.baseURL = "https://ele-interface.herokuapp.com";
//axios请求拦截器
axios.interceptors.request.use(
  (res) => {
    if (res.method == "post") {
      res.data = qs.stringify(res.data);
    }
    Indicator.open();
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
//axios响应拦截器
axios.interceptors.response.use(
  (config) => {
    Indicator.close();
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
