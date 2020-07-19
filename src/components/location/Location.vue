<template>
  <div class="location">
    <div class="content" @click="$emit('toIndexClick')">
      <p class="top">当前定位</p>
      <p class="title">
        <i class="fa fa-location-arrow"></i>
        <span class="text">{{ address }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    address: String,
  },
};
</script>
<style scoped>
.location {
  background-color: #fff;
}
.content {
  overflow: hidden;
  padding: 0 20px;
}
.fa-location-arrow {
  margin-right: 5px;
  vertical-align: middle;
  color: #2a87df;
}
.title {
  margin-top: 10px;
}
.top {
  margin-top: 10px;
  font-size: 14px;
}
.text {
  font-size: 13px;
}
</style>
