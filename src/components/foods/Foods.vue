<template>
  <div class="foods" v-if="shopInfo">
    <div class="fooddetail" v-if="isShow">
      <FoodDetail @close="isShow = false" :food="selectFood" :isShow="isShow" />
    </div>
    <div
      class="foods-content"
      v-for="(recommend, index) in shopInfo.recommend"
      :key="index"
    >
      <p class="title_name">
        {{ recommend.name }}
      </p>
      <ul class="container">
        <li v-for="(item, index) in recommend.items" :key="index">
          <div class="imgs"><img :src="item.image_path" alt="" /></div>
          <p class="item_name">{{ item.name }}</p>
          <div class="desc">
            <span>月售{{ item.month_sales }}</span>
            <span>好评率{{ item.satisfy_rate + "%" }}</span>
          </div>
          <div class="money">¥{{ item.activity.fixed_price }}</div>
          <CartControll :food="item" class="cart-controll" />
        </li>
      </ul>
    </div>
    <div class="food-wrap">
      <!-- 左侧菜单栏 -->
      <div ref="menu_scroll" class="food-menu" style="height:450px">
        <ul>
          <li
            :class="{ active: activeIndex === inx }"
            v-for="(item, inx) in shopInfo.menu"
            :key="inx"
            @click="menuClick(inx)"
          >
            <img v-if="item.icon_url" :src="item.icon_url" alt="" />
            <span class="menu_name">{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 右侧商品列表 -->
      <div class="food-right" ref="food_scroll">
        <ul>
          <li
            class="dn-food"
            v-for="(item, index) in shopInfo.menu"
            :key="index"
          >
            <strong class="item_name">{{ item.name }}</strong>
            <span class="item_desc">{{ item.description }}</span>
            <div
              @click="clickHandler(food)"
              class="food_box"
              v-for="(food, i) in item.foods"
              :key="i"
            >
              <div class="imgs_box">
                <img :src="food.image_path" alt="" />
              </div>
              <div class="food_right_box">
                <h1 class="food_name">{{ food.name }}</h1>
                <p class="food_desc">{{ food.description }}</p>
                <p class="m_sell">
                  <span class="month_sell">月售{{ food.month_sales }}份</span>
                  <span class="rating"
                    >&nbsp;好评率{{ food.satisfy_rate }}</span
                  >
                </p>
                <p class="money">¥{{ food.activity.fixed_price }}</p>
              </div>
              <div class="cartcontroll">
                <CartControll :food="food" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="shopcart">
        <ShopCart :shopInfo="shopInfo" />
      </div>
    </div>
  </div>
</template>
<script>
import FoodDetail from "../foodDetail/FoodDetail";
import ShopCart from "../shopcart/ShopCart";
import BScroll from "better-scroll";
import CartControll from "../cartcontroll/CartControll";
export default {
  components: {
    CartControll,
    ShopCart,
    FoodDetail,
  },
  data() {
    return {
      shopInfo: null,
      menuScroll: null,
      foodScroll: null,
      scrollY: 0, //存储滚动的高度
      listHeight: [], //计算12个区域的高度
      selectFood: null, //点击的商品
      isShow: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    activeIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        //将上一个区间的高度保存起来
        let height1 = this.listHeight[i];
        //将下一个区间的高度存起来
        let height2 = this.listHeight[i + 1];
        // 判断滚动的距离是否在两个区间之内
        if (this.scrollY >= height1 && this.scrollY < height2) {
          return i;
        }
      }
      return 0;
    },
  },
  methods: {
    clickHandler(food) {
      this.isShow = true;
      this.selectFood = food;
    },
    getData() {
      this.$axios("/api/profile/batch_shop").then((res) => {
        res.data.recommend.forEach((recommend) => {
          recommend.items.forEach((item) => {
            item.count = 0;
          });
        });
        res.data.menu.forEach((menu) => {
          menu.foods.forEach((food) => {
            food.count = 0;
          });
        });
        console.log(res.data);
        this.shopInfo = res.data;

        // DOM已经更新完毕
        this.$nextTick(() => {
          this.initScroll();
          this.calHeight();
        });
      });
    },
    calHeight() {
      //获取到对应的元素
      let eles = this.$refs.food_scroll.getElementsByClassName("dn-food");
      console.log(eles);
      //将每个区的高度添加到数组中
      let height = 0;
      this.listHeight.push(height);

      for (let i = 0; i < eles.length; i++) {
        height += eles[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menu_scroll, {
        click: true,
      });
      this.foodScroll = new BScroll(this.$refs.food_scroll, {
        probeType: 3, //0,1，2，3
        click: true,
      });
      this.foodScroll.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    menuClick(index) {
      //获取对应的food元素
      let ele = this.$refs.food_scroll.getElementsByClassName("dn-food")[index];
      //调用BScroll方法scrollToElement滚动到对应的元素位置
      this.foodScroll.scrollToElement(ele, 250);
    },
  },
};
</script>
<style scoped>
.fooddetail {
  position: fixed;
  width: 100vw;
  height: 100%;
  background-color: #fff;
  left: 0;
  top: 0;
  z-index: 2;
}
.food-right {
  overflow: hidden;
  height: 500px;
}
::-webkit-scrollbar {
  display: none;
}
.money {
  margin-top: 10px;
  color: #ff5339;
}
.active {
  background-color: #ccc !important;
}
.cartcontroll {
  position: absolute;

  bottom: 2px;
  right: 15px;
}
.m_sell {
  font-size: 10px;
  margin-top: 10px;
  color: #999999;
}
.food_desc {
  font-size: 10px;
  width: 150px;
  margin-top: 10px;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item_desc {
  font-size: 8px;
  color: #959595;
}
.food_name {
  font-weight: 700;
  font-size: 16px;
}
.item_name {
  color: #787878;
  vertical-align: middle;
  margin-left: 5px;
  font-size: 14px;
  margin-right: 5px;
}
.food_box {
  position: relative;
  display: flex;
  padding: 5px;
}

.imgs_box {
  margin-right: 5px;
}
.food-wrap {
  display: flex;
  background-color: #f8f8f8;
}
.food_box img {
  width: 80px;
  vertical-align: top;
}
.food-menu {
  height: 100%;
  overflow: hidden;
  flex: 120px;
}
.food-right {
  flex: 80%;
  /* border: 1px solid green; */
}
.container {
  margin-top: 10px;
  overflow-x: scroll;
  display: flex;
}
.container .desc {
  font-size: 8px;
  color: #a2a2a2;
}
.container .money {
  margin-top: 10px;
  color: #ff5339;
}
.cart-controll {
  position: absolute;
  bottom: 0;
  right: 0;
}
.container .item_name {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: #333333;
}
.container > li {
  position: relative;
  flex: 1;
  padding-left: 5px;
}
::-webkit-scrollbar {
  width: 0 !important;
}
.foods {
  padding: 10px;
}
.imgs {
  width: 100px;
}
.imgs img {
  width: 100%;
  height: 100%;
}
.title_name {
  font-weight: 700;
}
.food-menu {
  overflow-y: scroll;
}
.food-menu .menu_name {
  font-size: 10px;
}
.food-menu img {
  vertical-align: middle;
  width: 12px;
  margin-right: 5px;
}
.food-menu li {
  color: #666666;
  padding-left: 5px;
  height: 40px;
  line-height: 40px;
}
</style>
