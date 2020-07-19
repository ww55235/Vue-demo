<template>
  <div class="searchIndex" v-if="shopList">
    <div class="one">
      <div class="top">
        <div
          class="content"
          v-for="(item, index) in shopList.restaurants"
          :key="index"
          @click="$emit('click')"
        >
          <div class="item">
            <img class="img" :src="item.image_path" alt="" />
            <span class="name">{{ item.name }}</span>
            <span class="rating">评分{{ item.rating }}</span>
          </div>
        </div>
      </div>

      <div
        class="key_word"
        v-for="(item, index) in shopList.words"
        :key="index"
        @click="$emit('click')"
      >
        <i class="icon fa fa-search"></i>
        <span class="key_name">{{ item }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shopList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.key_word {
  padding: 5px 10px;
}
.key_name {
  display: inline-block;
  height: 30px;
  width: 80vw;
  line-height: 30px;
  border-bottom: 1px solid black;
}
.icon {
  margin-right: 10px;
}
.img {
  margin-right: 10px;
  width: 20px;
  vertical-align: middle;
}
.name {
  padding-bottom: 5px;
  border-bottom: 1px solid #cccccc;
}
.rating {
  position: absolute;
  right: 10px;
  top: 0;
}
.item {
  position: relative;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
}
</style>
