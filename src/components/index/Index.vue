<template>
  <div class="index">
    <div class="content">
      <div class="content-header">
        <div class="btn" @click="toAddress">
          <i class="icon fa fa-map-marker"></i>
          <span class="address">{{ getAddress }}</span>
          <i class="icon fa fa-sort-desc"></i>
        </div>
      </div>
      <div class="search_wrap" :class="{ tofixed: show }">
        <div class="search" @click="$router.push('/search')">
          <input type="text" class="inp" />
          <i class="icon_search fa fa-search">&nbsp;搜索商家 商家名称</i>
        </div>
      </div>
      <div class="container" style="background:#fff">
        <div class="swiper">
          <mt-swipe :auto="2000">
            <mt-swipe-item
              class="swiper_item"
              v-for="(img, index) in swiperList"
              :key="index"
            >
              <img :src="img" alt=""
            /></mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="entry">
          <mt-swipe :auto="0">
            <mt-swipe-item
              class="entry"
              v-for="(entry, index) in entriesList"
              :key="index"
            >
              <div class="entry_item" v-for="(item, i) in entry" :key="i">
                <img class="imgs" :src="item.image" alt="" />
                <span class="name">{{ item.name }}</span>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <h1 style="text-align:center;font-size:14px;line-height:20px">
          -推荐商家-
        </h1>
        <div>
          <FilterView
            ref="filter"
            @clickShow="clickShow"
            :filterData="filterData"
            @update="update"
          />
          <div class="sort" v-if="show">
            <ul>
              <li
                :class="{ sort_actice: sortIndex === index }"
                class="sort_item"
                v-for="(item, index) in filterData.sortBy"
                :key="index"
                @click="toggleClass(item, index)"
              >
                {{ item.name }}
                <i v-if="sortIndex === index" class="fa fa-check"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 商家信息 -->
      <div class="loadermore">
        <mt-loadmore
          :top-method="loadData"
          :bottom-method="loadMore"
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          :bottomPullText="bottomPullText"
          class="loads"
          ref="loadmo"
        >
          <div
            class="shop-wrap"
            v-for="(item, index) in restaurantList"
            :key="index"
          >
            <Shop
              @click="$router.push('/goods')"
              :restaurant="item.restaurant"
            />
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>
<script>
import Shop from "../shop/Shop";
import FilterView from "../filter/FilterView";
import { Swipe, SwipeItem, Loadmore } from "mint-ui";
import { mapGetters } from "vuex";
export default {
  components: {
    FilterView,
    Shop,
  },
  data() {
    return {
      swiperList: [],
      entriesList: [],
      filterData: null,
      show: false,
      sortIndex: 0,
      //请求的页数
      page: 1,
      //请求几条数据
      countData: 5,
      restaurantList: [],
      allLoaded: false,
      bottomPullText: "上拉加载更多",
      sortBy: null,
    };
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
  created() {
    this.getSwiperData();
  },
  methods: {
    toggleClass(item, index) {
      this.sortIndex = index;
      // console.log(item, index);
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
      this.$refs.filter.toggleShow();
      this.update(item.code);
    },
    update(con) {
      this.sortBy = { condition: con };
      this.loadData();
    },
    toAddress() {
      this.$router.push({
        name: "address",
        params: { address: this.Address },
      });
    },
    clickShow(isShow) {
      this.show = isShow;
    },
    getSwiperData() {
      this.$axios("/api/profile/shopping")
        .then((res) => {
          // console.log(res.data);
          this.swiperList = res.data.swipeImgs;
          this.entriesList = res.data.entries;
        })
        .catch((err) => {
          console.log(err);
        });
      this.$axios("/api/profile/filter")
        .then((res) => {
          // console.log(res);
          this.filterData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.loadData();
    },
    loadData() {
      this.page = 1;
      this.allLoaded = false;
      this.bottomPullText = "上拉加载更多";
      //请求商家信息
      this.$axios
        .post(
          `api/profile/restaurants/${this.page}/${this.countData}`,
          this.sortBy
        )
        .then((res) => {
          // console.log(res.data);
          this.restaurantList = res.data;
          this.$refs.loadmo.onTopLoaded();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadMore() {
      //如果数据还没有加载完
      if (!this.allLoaded) {
        this.page++;
        this.allLoaded = false;
        this.bottomPullText = "上拉加载更多";
        //请求商家信息
        this.$axios
          .post(`api/profile/restaurants/${this.page}/${this.countData}`)
          .then((res) => {
            this.$refs.loadmo.onBottomLoaded();
            //判断数据库中的是否是否已经加载完了
            if (res.data.length > 0) {
              //遍历请求到的数据并放入之前的数组中
              res.data.forEach((item) => {
                this.restaurantList.push(item);
              });
              //如果请求得到的数据小于5条，表示数据库中的数据已经加载完毕
              if (res.length < this.countData) {
                //数据已经全部加载完
                this.allLoaded = true;
                this.bottomPullText = "没有更多了哦!";
              }
            } else {
              this.allLoaded = true;
              this.bottomPullText = "没有更多了哦";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style scoped>
.content {
  overflow: hidden;
  background: #2587e6;
}
.sort .sort_item {
  position: relative;
  font-size: 14px;
  padding: 10px 10px 10px 23px;
}
.fa-check {
  position: absolute;
  right: 10px;
  top: 10px;
}
.sort_actice {
  color: #2587e6;
}

.sort {
  z-index: 999;
  width: 100%;
  position: fixed;
  background-color: #fff;
  top: 100px;
  left: 0;
}
.tofixed {
  z-index: 999;
  width: 100%;
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
}
.mt-loadmore {
  position: absolute;
  bottom: 150px;
  height: 250px;
}
.fa-sort-desc {
  position: absolute;
  right: 25px;
  top: -3px;
}
.entry_item {
  text-align: center;
  float: left;
  width: 20%;
  height: 50px;
}
.entry {
  width: 100%;
  height: 130px;
}
.entry .imgs {
  margin: 0 auto;
  display: block;
  width: 30px;
  height: 30px;
}
.name {
  font-size: 12px;
}
.swiper_item {
  width: 100%;
  height: 100px;
}
.swiper_item img {
  width: 100%;
  height: 100px;
}
.swiper {
  height: 100px;
}
.search_wrap {
  position: relative;
}
.search {
  position: sticky;
  top: 0;
}
.inp {
  border: none;
  outline: none;
}
.icon_search {
  position: absolute;

  top: 15px;
  left: 35%;
  color: #cccccc;
  font-size: 14px;
}
input {
  margin-top: 10px;
  width: 100%;
  height: 20px;
  border-radius: 3px;
}
.icon {
  vertical-align: bottom;
}
.content-header {
  position: relative;
  margin: 5px 20px;
  width: 90%;
  height: 20px;
  color: #ffffff;
  white-space: nowrap;
}
.address {
  display: inline-block;
  width: 280px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 12px;
}
</style>
