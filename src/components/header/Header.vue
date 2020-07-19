<template>
  <div class="header">
    <div class="content">
      <span @click="$router.go(-1)">
        <i class="icon fa fa-arrow-left">返回</i></span
      >
      <span class="text">{{ title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    isShow: Boolean,
  },
};
</script>
<style scoped>
.content {
  position: relative;
  text-align: center;
  color: #ffffff;
  height: 40px;
  line-height: 40px;
  background-color: #2587e6;
}
.icon {
  position: absolute;
  vertical-align: middle;
  left: 3px;
  top: 15px;
  font-size: 14px;
}
</style>
