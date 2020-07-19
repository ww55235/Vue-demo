<template>
  <div class="evaluate" v-if="evaluateData">
    <div class="evaluate_content">
      <div class="top">
        <div class="rating_score item">
          <span class="score">{{
            evaluateData.rating.shop_score.toFixed(1)
          }}</span>
          <div style="fontSize:12px;">
            <span>商家评分</span>
            <RatingStar :rating="evaluateData.rating.shop_score" />
          </div>
        </div>
        <div class="item">
          <span>味道</span>
          <p>{{ evaluateData.rating.taste_score.toFixed(1) }}</p>
        </div>
        <div class="item">
          <span>包装</span>
          <p>{{ evaluateData.rating.package_score.toFixed(1) }}</p>
        </div>
        <div class="item">
          <span>配送</span>
          <p>{{ evaluateData.rating.rider_score.toFixed(1) }}</p>
        </div>
      </div>
    </div>
    <div class="rating_wrap">
      <ul class="clearFix tags">
        <li
          :class="{ chaping: item.unsatisfied }"
          v-for="(item, index) in evaluateData.tags"
          :key="index"
        >
          <span class="text">{{ item.name }}</span>
          <span v-if="item.count > 0" class="count">{{ item.count }}</span>
        </li>
      </ul>

      <ul>
        <li
          class="ratingPage"
          v-for="(item, index) in evaluateData.comments"
          :key="index"
        >
          <div class="Box">
            <div class="imgs box_item">
              <img
                :src="
                  item.avatar ||
                    'https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png'
                "
                alt=""
              />
            </div>
            <div class="box_item">
              <span class="username">{{ item.username }}</span>
              <span class="time">{{ item.rated_at }}</span>
              <div>
                <RatingStar :rating="item.rating" />
              </div>
              <span
                style="font-size:12px;"
                v-if="item.rating"
                :style="{ color: Styles(item.rating).color }"
              >
                {{ Styles(item.rating).txt }}
              </span>
              <div class="reply">{{ item.reply.content }}</div>
              <ul>
                <li v-for="(img, idx) in item.order_images" :key="idx">
                  <img
                    style="width:150px;marginTop:10px;"
                    :src="img.image_hash"
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import RatingStar from "../ratingStar/RatingStar";
export default {
  components: {
    RatingStar,
  },
  data() {
    return {
      evaluateData: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    Styles(rating) {
      const content = [
        { txt: "吐槽", color: "rgb(137,159,188)" },
        { txt: "较差", color: "rgb(137, 159, 188)" },
        { txt: "一般", color: "rgb(251, 154, 11)" },
        { txt: "满意", color: "rgb(251, 154, 11)" },
        { txt: "超赞", color: "rgb(255, 96, 0)" },
      ];
      return content[rating - 1];
    },
    getData() {
      this.$axios("/api/profile/comments").then((res) => {
        console.log(res.data);
        this.evaluateData = res.data;
      });
    },
  },
};
</script>
<style scoped>
.Box {
  display: flex;
}
.box_item .reply {
  display: inline-block;
  padding: 10px;
  line-height: 20px;
  border-radius: 5px;
  margin-top: 10px;
  width: 80vw;
  font-size: 12px;
  background-color: #f3f3f3;
}
.box_item .username {
  margin-bottom: 10px;
  color: #333333;
  font-size: 14px;
}
.box_item {
  position: relative;
  flex: 1;
}
.ratingPage {
  margin-bottom: 15px;
}
.box_item .time {
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 12px;
  color: #acacac;
}
.box_item:nth-child(1) {
  margin-right: 5px;
  flex: 0.1;
}
.imgs {
  overflow: hidden;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.clearFix::after {
  display: block;
  clear: both;
  content: ".";
  line-height: 0;
  height: 0;
  font-size: 0;
  visibility: hidden;
}
.ratingPage img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.tags li {
  padding: 10px;
  margin: 5px;
  float: left;
  font-size: 12px;
  background-color: #ebf5ff;
  color: #6d7885;
}
.chaping {
  background-color: #f5f5f5 !important;
  color: #aaaaaa !important;
}
.rating_score .score {
  display: block;
  width: 30px;
  text-align: center;
  font-size: 20px;
  color: #ff6000;
}
.top {
  display: flex;
  align-items: center;
}
div.item {
  text-align: center;
  flex: 1;
}
.rating_score {
  display: flex;
  flex: 2;
  align-items: center;
}
</style>
