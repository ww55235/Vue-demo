<template>
  <div class="home">
    <router-view></router-view>
    <TabBar class="tabbar" :tabbarList="tabbarList" />
  </div>
</template>

<script>
//引入tabbar组件
import TabBar from "@/components/tabBar/TabBar";
export default {
  name: "Home",
  data() {
    return {
      tabbarList: [
        { title: "主页", icon: "home", path: "/index" },
        { title: "订单", icon: "file-text-o", path: "/order" },
        { title: "我的", icon: "user", path: "/me" },
      ],
    };
  },
  components: {
    TabBar,
  },
};
</script>
<style scoped>
.tabbar {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>
