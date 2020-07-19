<template>
  <div class="cartItem" @click="$emit('click')">
    <div class="item">
      <span class="title">{{ title }}</span>
      <span class="right"
        >{{ placeholder }} <i class="fa fa-angle-right"></i
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    placeholder: String,
  },
};
</script>
<style scoped>
.cartItem {
  margin-top: 20px;
}
.item {
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #cccccc;
}
.item .right {
  position: absolute;
  right: 5px;
  top: 10px;
  color: #cccccc;
}
</style>
