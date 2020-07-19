<template>
  <div class="content">
    <div class="alphabet" ref="area_scroll" v-if="cityInfo">
      <div class="scroll_wrap">
        <div class="hot_wrap cityListItem">
          <h3 class="title">热门城市</h3>
          <ul class="hot_city">
            <li
              class="hot_item"
              v-for="hotCity in cityInfo.hotCities"
              :key="hotCity.id"
              @click="$emit('selectCity', hotCity)"
            >
              {{ hotCity.name }}
            </li>
          </ul>
        </div>
        <div class="allcity">
          <div
            class="city cityListItem"
            v-for="(key, index) in keys"
            :key="index"
          >
            <p class="keys">{{ key }}</p>
            <ul
              class="key_city "
              v-for="(city, index) in cityInfo[key]"
              :key="index"
            >
              <li @click="$emit('selectCity', city)" class="city_name">
                {{ city.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="ctkeys">
      <ul>
        <li @click="selectKey(0)">#</li>
        <li
          @click="selectKey(index + 1)"
          v-for="(item, index) in keys"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//引入BScroll
import BScroll from "better-scroll";
export default {
  props: {
    cityInfo: {
      type: Object,
      default() {
        return {
          bscroll: null,
        };
      },
    },
    keys: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getScroll() {
      this.bscroll = new BScroll(this.$refs.area_scroll, {
        click: true,
      });
    },
    selectKey(index) {
      // console.log(index);
      //获取所有元素
      const city = this.$refs.area_scroll.getElementsByClassName(
        "cityListItem"
      );
      // 取出点击后的指定元素
      let ele = city[index];
      //让其滚动到指定元素
      this.bscroll.scrollToElement(ele, 250);
    },
  },
};
</script>
<style scoped>
.ctkeys li {
  text-align: center;
  color: #cccccc;
  font-size: 14px;
  margin: 5px;
}
.hot_city {
  text-align: center;
  width: 260px;
}
.alphabet {
  height: 550px;
}
.hot_item {
  display: inline-block;
  border-radius: 25px;
  margin: 10px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: #cccccc;
}
.ctkeys {
  position: fixed;
  top: 100px;
  right: 0;
}
.city_name {
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #cccccc;
}
.keys {
  color: sienna;
}
</style>
