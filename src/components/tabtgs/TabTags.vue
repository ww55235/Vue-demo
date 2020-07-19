<template>
  <div class="tabtags">
    <span
      :class="{ active: selector === item }"
      class="item"
      v-for="(item, index) in tags"
      :key="index"
      @click="$emit('click', item)"
    >
      {{ item }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    tags: Array,
    selector: String,
  },
};
</script>
<style scoped>
.tabtags {
  padding: 10px 0 10px 20px;
  background-color: #fff;
}
.item {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  border: 1px solid #cccccc;
}
.active {
  background-color: #eef7ff !important;
  color: #2395ff !important;
}
</style>
