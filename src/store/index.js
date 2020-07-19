import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: {},
    adress: "",
    orderInfo: null,
    userInfo: null,
    remarkInfo: {
      tableware: "",
      remark: "",
    },
  },
  mutations: {
    //修改值
    editLocation(state, location) {
      if (location) {
        state.location = location;
      } else {
        state.location = null;
      }
    },
    editAdress(state, adress) {
      if (adress) {
        state.adress = adress;
      } else {
        state.adress = "";
      }
    },
    editOrderInfo(state, orderInfo) {
      if (orderInfo) {
        state.orderInfo = orderInfo;
      } else {
        state.orderInfo = null;
      }
    },
    editUserInfo(state, userInfo) {
      if (userInfo) {
        state.userInfo = userInfo;
      } else {
        state.userInfo = null;
      }
    },
    editRemarkInfo(state, remarkInfo) {
      if (remarkInfo) {
        state.remarkInfo = remarkInfo;
      } else {
        state.remarkInfo = null;
      }
    },
  },
  actions: {
    //异步操作
    asyncLocation({ commit }, location) {
      commit("editLocation", location);
    },
    asyncAdress({ commit }, adress) {
      commit("editAdress", adress);
    },
    asyncOrderInfo({ commit }, orderInfo) {
      commit("editOrderInfo", orderInfo);
    },
    asyncUserInfo({ commit }, userInfo) {
      commit("editUserInfo", userInfo);
    },
    asyncRemarkInfo({ commit }, remarkInfo) {
      commit("editRemarkInfo", remarkInfo);
    },
  },
  getters: {
    getLocation(state) {
      return state.location;
    },
    getAddress(state) {
      return state.adress;
    },
    getOrderInfo(state) {
      return state.orderInfo;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getTotalPrice(state) {
      let price = 0;
      if (state.orderInfo) {
        let selectFoods = state.orderInfo.selectFood;
        selectFoods.forEach((food) => {
          price += food.count * food.activity.fixed_price;
        });
      }
      price += state.orderInfo.shopInfo.float_delivery_fee;
      return price;
    },
    getremarkInfo(state) {
      return state.remarkInfo;
    },
  },
  modules: {},
});
