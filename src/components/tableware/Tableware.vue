<template>
  <transition name="fade">
    <div class="tableware" v-if="isShow">
      <ul>
        <i @click="$emit('close')" class="fa fa-remove"></i>
        <h3 class="title">餐具份数</h3>
        <li
          :class="{ active: select == index }"
          @click="selectItem(item)"
          class="li-item"
          v-for="(item, index) in tableware"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      tableware: ["1", "2", "3", "4", "5", "6"],
      select: "",
    };
  },
  props: {
    isShow: Boolean,
  },
  methods: {
    selectItem(item) {
      this.select = item - 1;
      this.$store.dispatch("asyncRemarkInfo", {
        tableware: item + "份餐具",
        remark: this.$store.getters.getremarkInfo.remark,
      });
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
.tableware {
  position: fixed;
  z-index: 100;
  padding: 10px;
  padding-bottom: 30px;
  width: 100%;
  background-color: #fff;
  bottom: 0;
  left: 0;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.li-item {
  padding: 10px 0;
  text-align: center;
}
.active {
  color: cyan !important;
}
.tableware > ul {
  position: relative;
}
.fa-remove {
  position: absolute;
  right: 15px;
  top: -5px;
}
.title {
  text-align: center;
  font-weight: 700;
}
.title::before,
.title::after {
  content: "——";
}
</style>
