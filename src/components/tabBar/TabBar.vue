<template>
  <div class="tabbar">
    <div class="content" v-for="(item, index) in tabbarList" :key="index">
      <router-link class="item" :to="item.path" active-class="active">
        <i class="icon" :class="'fa fa-' + item.icon"></i>
        <span class="title"> {{ item.title }}</span></router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabbarList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
a {
  color: #ccc;
  text-decoration: none;
}
.item {
  display: flex;
  flex-direction: column;
}
.icon {
  margin-bottom: 5px;
}
.title,
.icon {
  flex: 1;
}
.title {
  font-size: 14px;
}
.tabbar {
  display: flex;
  align-items: center;
  height: 60px;
  background: #ffffff;
  text-align: center;
}
.content {
  flex: 1;
}
.active {
  color: #2587e6;
}
</style>
