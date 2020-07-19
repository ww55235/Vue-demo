<template>
  <div class="search">
    <Header title="搜索" />
    <div class="search-wrap">
      <!-- <i class="icon fa fa-search"></i> -->
      <input
        v-model="inp_val"
        class="txt"
        type="text"
        placeholder="请输入鸡腿或汉堡"
      />
      <span @click="searchHandler">搜索</span>
    </div>

    <div class="two" v-if="isSearch">
      <img
        src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"
        alt=""
      />
    </div>
    <div class="searchIndex-wrap" v-else>
      <div class="wrap" v-if="!isShowShop">
        <SearchIndex @click="shopShow" :shopList="result" />
      </div>
      <div v-if="isShowShop" class="box">
        <FilterView :filterData="filterData" @update="update" />
        <div
          class="shop-wrap"
          v-for="(item, index) in restaurantList"
          :key="index"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading"
        >
          <Shop :restaurant="item.restaurant" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { InfiniteScroll } from "mint-ui";
import Shop from "../shop/Shop";
import FilterView from "../filter/FilterView";
import SearchIndex from "../searchIndex/SearchIndex";
import Header from "../header/Header";
export default {
  components: {
    Header,
    SearchIndex,
    FilterView,
    Shop,
  },
  data() {
    return {
      inp_val: "",
      result: null,
      isSearch: false,
      isShowShop: false,
      filterData: null,
      restaurantList: [],
      page: 0,
      countData: 7,
      loading: false,
      sortBy: null,
    };
  },
  created() {
    this.$axios("/api/profile/filter")
      .then((res) => {
        this.filterData = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.loadMore();
  },
  watch: {
    inp_val() {
      this.isSearch = false;
      this.isShowShop = false;
      this.getData();
    },
  },
  methods: {
    getData() {
      this.$axios(`api/profile/typeahead/${this.inp_val}`)
        .then((res) => {
          // console.log(res.data);
          this.result = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    shopShow() {
      this.page = 0;
      this.restaurantList = [];
      this.isShowShop = true;
      this.$router.push("/goods");
    },
    searchHandler() {
      if (this.inp_val.trim().length === 0) {
        return;
      }
      if (
        (this.result && this.result.restaurants.length > 0) ||
        this.result.words.length > 0
      ) {
        this.shopShow();
      } else {
        this.isSearch = true;
      }
    },
    update(con) {
      this.sortBy = { condition: con };
      this.shopShow();
    },
    loadMore() {
      // console.log("楠仔帅气无比");
      this.page++;
      //请求商家信息
      this.$axios
        .post(
          `api/profile/restaurants/${this.page}/${this.countData}`,
          this.sortBy
        )
        .then((res) => {
          if (res.data.length > 0) {
            res.data.forEach((item) => {
              this.restaurantList.push(item);
            });
          } else {
            this.loading = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.search-wrap {
  position: relative;
  padding: 0 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.icon {
  position: absolute;
  left: 15px;
  top: 13px;
}
.txt {
  border: 0;
  outline: none;
  height: 20px;
  width: 300px;
  border-radius: 5px;
  background-color: #ccc;
}
.txt::placeholder {
  padding-left: 20px;
}
</style>
