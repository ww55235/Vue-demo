<template>
  <div class="cartcontroll">
    <span @click.stop="delHandler" class="button-minus" v-if="food.count > 0">
      <i class="icon fa fa-minus"></i>
    </span>
    <span class="count" v-if="food.count > 0">{{ food.count }}</span>
    <span class="button-plus">
      <i @click.stop="addHandler" class="icon fa fa-plus"></i>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    food: null,
  },
  methods: {
    delHandler() {
      this.food.count--;
    },
    addHandler() {
      this.food.count++;
    },
  },
};
</script>
<style scoped>
.button-minus,
.button-plus {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background-color: #2395ff;
}
.icon {
  color: #fff;
}
.count {
  margin: 0 5px;
}
</style>
