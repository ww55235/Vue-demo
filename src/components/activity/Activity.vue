<template>
  <div class="activity">
    <div class="content">
      <span
        :style="{ backgroundColor: '#' + activities[0].icon_color }"
        class="name"
        >{{ activities[0].icon_name }}</span
      >
      <span class="money">{{ activities[0].tips }}</span>
      <span @click="showActive_mod(true)" class="discounts"
        >{{ activities.length }}个优惠 &nbsp;<i
          class="icon fa fa-caret-down"
        ></i
      ></span>
    </div>
    <transition name="fade">
      <div class="act_model" v-show="isShow">
        <i @click="showActive_mod(false)" class="icon_remove fa fa-remove"></i>
        <h2 class="title">优惠活动</h2>
        <ul>
          <li v-for="(item, index) in activities" :key="index">
            <span
              class="icon_name"
              :style="{ backgroundColor: '#' + item.icon_color }"
              >{{ item.icon_name }}</span
            >
            <span class="name">{{ item.tips }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    activities: Array,
  },
  methods: {
    showActive_mod(show) {
      this.isShow = show;
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.act_model {
  position: fixed;
  width: 100%;
  bottom: 50px;
  padding-bottom: 50px;
  left: 0;
  z-index: 5;
  background-color: #fff;
}
.icon_remove {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 20px;
}
.act_model > ul {
  width: 80vw;
  margin: 0 auto;
}
.icon_name {
  margin-right: 5px;
  padding: 2px;
  color: #fff;
  border-radius: 2px;
}
.title {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #333333;
}
.act_model li {
  text-align: left;
  margin: 10px 0;
  font-size: 13px;
}
.name {
  padding: 2px;
  color: #333333;
}
.content > .name {
  margin-right: 5px;
  color: #ffffff;
}
.discounts {
  position: absolute;
  top: 0;
  right: 0;
}
.content {
  position: relative;
  margin: 7px 0 10px -18px;
  width: 80vw;
}
.icon {
  vertical-align: middle;
}
</style>
