<template>
  <div class="remark">
    <Header title="订单备注" />
    <div class="remark-content">
      <textarea
        v-model="text"
        class="txt-area"
        maxlength="100"
        placeholder="填写额外对餐厅或骑手小哥备注的信息"
      ></textarea>
      <div class="tabs">
        <div class="radius">
          <span
            :class="{ selected: item.select }"
            @click="radiusBtn(item)"
            class="radiusItem"
            v-for="(item, index) in radiusItem"
            :key="index"
            >{{ item.text }}</span
          >
        </div>
        <div class="switch">
          <span
            @click="item.select = !item.select"
            :class="{ selected: item.select }"
            class="switchItem"
            v-for="(item, index) in switchItem"
            :key="index"
            >{{ item.text }}</span
          >
        </div>
      </div>
    </div>
    <div class="button">
      <button @click="btnHandler" class="ok">确定</button>
    </div>
  </div>
</template>
<script>
import Header from "../header/Header";
export default {
  data() {
    return {
      text: "",
      radiusItem: [
        { select: false, text: "不要辣" },
        { select: false, text: "少点辣" },
        { select: false, text: "多点辣" },
      ],
      switchItem: [
        {
          select: false,
          text: "不要香菜",
        },
        {
          select: false,
          text: "不要洋葱",
        },
        {
          select: false,
          text: "多点醋",
        },
        {
          select: false,
          text: "多点葱",
        },
      ],
    };
  },
  components: {
    Header,
  },
  methods: {
    radiusBtn(item) {
      this.radiusItem.forEach((value) => {
        value.select = false;
      });
      item.select = true;
    },
    btnHandler() {
      let selectParams = "";
      this.radiusItem.forEach((ele) => {
        if (ele.select) {
          selectParams += ele.text + ",";
        }
      });
      this.switchItem.forEach((ele) => {
        if (ele.select) {
          selectParams += ele.text + ",";
        }
      });
      selectParams += this.text;
      //   console.log(selectParams);
      this.$store.dispatch("asyncRemarkInfo", {
        tableware: this.$store.getters.getremarkInfo.tableware,
        remark: selectParams,
      });
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.selected {
  background-color: #0186ff !important;
  color: #fff !important;
}
.remark-content {
  margin: 10px 0;
  background-color: #fff;
  padding: 10px;
}
.txt-area {
  padding: 10px;
  width: 90%;
  height: 100px;
  outline: 0;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.tabs {
  margin: 20px 0;
}
.radiusItem {
  display: inline-block;
  padding: 5px;
  border: 1px solid #cccccc;
  font-size: 12px;
}
.switch,
.radius {
  display: inline-block;
}
.switch {
  margin-left: 10px;
}
.switchItem {
  display: inline-block;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #cccccc;
  font-size: 12px;
}
.ok {
  height: 50px;
  width: 100%;
  border: 0;
  outline: 0;
  background-color: #06e06a;
  color: #fff;
  text-align: center;
}
</style>
