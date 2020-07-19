<template>
  <div class="address">
    <Header title="选择收货地址" :isShow="isShow" />
    <div class="search">
      <span @click="toCity" class="city">{{ city }}</span>
      <i class="icon fa fa-arrow-down"></i>
      <div class="search_content">
        <input
          class="search_inp"
          placeholder="小区/写字楼/学校等"
          type="text"
          v-model="inp_val"
        />
        <i v-show="show" class="icon fa fa-search"></i>
      </div>
    </div>
    <Location @toIndexClick="toIndex" :address="getAddress" />
    <ul class="city_item">
      <li
        class="item"
        v-for="(item, index) in cityList"
        :key="index"
        @click="toIndex(item)"
      >
        <h4 class="name">{{ item.name }}</h4>
        <p class="dis">{{ item.district + item.address }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Location from "../location/Location";
import Header from "../header/Header";
export default {
  data() {
    return {
      isShow: true,
      city: "",
      inp_val: "",
      cityList: [],
    };
  },
  computed: {
    ...mapGetters(["getLocation"]),
    show() {
      return this.inp_val.trim().length === 0 ? true : false;
    },
    getAddress() {
      return this.getLocation.formattedAddress;
    },
  },
  watch: {
    inp_val() {
      this.searchSite();
    },
  },
  methods: {
    ...mapActions(["asyncAdress"]),
    //搜索地点方法
    searchSite() {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.inp_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          // console.log(result);
          self.cityList = result.tips;
          // console.log(self.cityList);
        });
      });
    },
    toIndex(item) {
      if (item) {
        let address = item.district + item.address + item.name;
        this.asyncAdress(address);
      } else {
        this.asyncAdress(this.getAddress);
      }
      this.$router.push("/index");
    },
    toCity() {
      this.$router.push("/city");
    },
  },
  components: {
    Header,
    Location,
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      vm.city = to.params.address;
      // console.log(vm);
      // console.log(to.params.address);
    });
  },
};
</script>
<style scoped>
.address {
  background-color: #ffffff;
}
.icon {
  vertical-align: middle;
}
.search_content {
  position: relative;
  display: inline-block;
}
.fa-search {
  position: absolute;
  top: 15px;
  left: 10px;
  font-size: 12px;
  color: #181818;
}
.search {
  position: relative;
  margin: 5px 20px 0 20px;
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  background-color: #dadada;
}
.search_inp {
  border: 0;
  outline: none;
  margin-left: 10px;
  padding-left: 10px;
  background-color: #dadada;
}
.city {
  margin: 0 5px;
}
.item {
  padding: 10px 10px;
  border-bottom: 1px solid #cccccc;
}
.name,
.dis {
  font-size: 14px;
  margin-bottom: 5px;
}
.dis {
  color: #9f9da0;
}
</style>
