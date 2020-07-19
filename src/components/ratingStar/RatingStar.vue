<template>
  <div class="ratingStar">
    <i v-for="(item, index) in Star" :key="index" :class="item" class="fa"></i>
  </div>
</template>
<script>
const LENGTH = 5;
const _ON = "fa-star";
const _HALF = "fa-star-half-empty";
const _OFF = "fa-star-o";
export default {
  props: {
    rating: Number,
  },
  computed: {
    Star() {
      let result = [];
      //对分数进行处理
      let score = Math.floor(this.rating * 2) / 2;
      //控制半星
      let half = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(_ON);
      }
      if (half) {
        result.push(_HALF);
      }
      while (result.length < LENGTH) {
        result.push(_OFF);
      }
      return result;
    },
  },
};
</script>
<style scoped>
i {
  color: coral;
}
</style>
