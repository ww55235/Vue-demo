<template>
  <div class="city">
    <div class="content">
      <div class="search">
        <input
          v-model="inp_search"
          class="inp_search"
          type="text"
          placeholder="请输入城市名"
        />
        <i class="fa fa-search"></i>
        <span
          class="cancel"
          @click="
            $router.push({
              name: 'address',
              params: {
                address: Address,
              },
            })
          "
          >取消</span
        >
        <Location
          @toIndexClick="selectCity({ name: Address })"
          :address="Address"
          v-if="searchCity.length === 0"
        />
      </div>
      <div class="wrap" v-if="searchCity.length === 0">
        <div class="scroll">
          <Alphabet
            @selectCity="selectCity"
            ref="areascroll"
            :cityInfo="cityInfo"
            :keys="keys"
          />
        </div>
      </div>
      <div v-else>
        <ul>
          <li
            class="inpSearch_city"
            v-for="(item, index) in searchCity"
            :key="index"
            @click="selectCity(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Location from "../location/Location";
import Alphabet from "../alphabet/Alphabet";
export default {
  data() {
    return {
      cityInfo: null,
      keys: [],
      allCity: [],
      searchCity: [],
      inp_search: "",
    };
  },
  watch: {
    inp_search() {
      if (this.inp_search.trim().length === 0) {
        this.searchCity = [];
      } else {
        this.searchCity = this.allCity.filter((value) => {
          return value.name.includes(this.inp_search);
        });
      }
      // console.log(this.searchCity);
    },
  },
  computed: {
    ...mapGetters(["getLocation", "getAddress"]),
    Address() {
      return (
        this.getLocation.addressComponent.city ||
        this.getLocation.addressComponent.province
      );
    },
  },
  components: {
    Location,
    Alphabet,
  },
  mounted() {
    this.getCityData();
  },
  methods: {
    getCityData() {
      this.$axios("/api/posts/cities")
        .then((res) => {
          //   console.log(res);
          this.cityInfo = res.data;
          this.keys = Object.keys(res.data);
          //将数组最后面的hotcity移除掉
          this.keys.pop();
          //将key进行排序
          this.keys.sort();
          //存储所有的城市
          this.keys.forEach((value) => {
            this.cityInfo[value].forEach((city) => {
              // console.log(city);
              this.allCity.push(city);
            });
          });
          // console.log(this.allCity);
          //掉用子组件方法
          this.$nextTick(() => {
            this.$refs.areascroll.getScroll();
          });
          //   console.log(this.cityInfo);
          //   console.log(this.keys);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectCity(city) {
      // 点击跳转到address页面
      this.$router.push({
        name: "address",
        params: { address: city.name },
      });
    },
  },
};
</script>
<style scoped>
.wrap {
  overflow: hidden;
}
.inpSearch_city {
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
.scroll {
  height: 100%;
}
.content {
  padding: 5px 20px;
  background-color: #fff;
}
input {
  border: 0;
  outline: none;
}
.inp_search {
  border-radius: 30px;
  width: 300px;
  height: 25px;
  background-color: #dadada;
}
.inp_search::placeholder {
  text-align: center;
}
.search {
  position: relative;
}
.fa-search {
  position: absolute;
  top: 7px;
  left: 28%;
  font-size: 12px;
}
.cancel {
  position: absolute;
  font-size: 13px;
  top: 5px;
  right: 0;
  color: blue;
}
</style>
