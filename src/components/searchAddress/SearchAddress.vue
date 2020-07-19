<template>
  <div v-if="isShow" class="searchaddress">
    <div class="search">
      <i class="icon_search fa fa-search"></i>
      <input
        v-model="input_val"
        class="txt"
        type="text"
        placeholder="请输入小区/写字楼/学校等"
      />
    </div>
    <button class="cancel" @click="$emit('click')">取消</button>

    <ul v-if="PlaceList">
      <li
        @click="addressClick(item)"
        class="addressitem"
        v-for="(item, index) in PlaceList"
        :key="index"
      >
        <p class="name">{{ item.name }}</p>
        <p class="address">{{ item.district }} {{ item.address }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      input_val: "",
      PlaceList: [],
    };
  },
  computed: {
    ...mapGetters(["getLocation", "getAddress"]),
  },
  watch: {
    input_val(newval) {
      //   console.log(newval);
      this.searchPlace(newval);
    },
  },
  methods: {
    addressClick(item) {
      console.log(item);
      this.addressInfo.address = item.name + item.district + item.address;
      this.$emit("click");
    },
    searchPlace(val) {
      const _this = this;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city:
            _this.getLocation.addressComponent.city ||
            _this.getLocation.addressComponent.province,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          _this.PlaceList = result.tips;
        });
      });
    },
  },
  props: {
    isShow: Boolean,
    addressInfo: Object,
  },
};
</script>
<style scoped>
.addressitem {
  padding: 10px;
  border-bottom: 1px solid #cccccc;
}
.addressitem .name {
  font-size: 14px;
  color: #333333;
}
.addressitem .address {
  margin-top: 10px;
  font-size: 12px;
  color: #999999;
}
input {
  border: 0;
  outline: 0;
}
button {
  border: 0;
  outline: 0;
  background-color: #fff;
}
.searchaddress {
  position: relative;
  padding: 0 20px;
}
.search {
  width: 80vw;
  height: 30px;
  line-height: 30px;
}
.icon_search {
  position: relative;
  margin-left: 15px;
  margin-right: 10px;
  padding: 5px;
}
.txt {
  height: 100%;
  width: 80%;
}
.txt::placeholder {
  font-size: 18px;
}
.cancel {
  position: absolute;
  padding: 5px;
  right: 50px;
  top: 0;
  font-size: 18px;
}
</style>
