<template>
  <div class="goodsBar">
    <div class="nav">
      <span class="item">
        <router-link to="/goods/foods">点餐</router-link>
      </span>
      <span class="item"
        ><router-link to="/goods/evaluate">评价</router-link></span
      >
      <span class="item">
        <router-link to="/goods/merchant">商家</router-link></span
      >
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.nav {
  display: flex;
  margin: 15px 0;
}
a {
  text-decoration: none;
}
.item > a {
  padding: 5px;
  font-size: 14px;
  color: black;
}
.item {
  text-align: center;
  flex: 1;
  height: 20px;
  line-height: 20px;
}
.router-link-active {
  font-weight: 600;
  border-bottom: 2px solid blue;
}
</style>
