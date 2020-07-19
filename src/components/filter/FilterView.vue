<template>
  <div class="filterView" v-if="filterData">
    <div class="nav" :class="{ tofixed: isShow || isScreen }">
      <div
        class="nav_item"
        v-for="(nav, index) in filterData.navTab"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="toggleIndex(index)"
      >
        <span class="name">{{ nav.name }}</span>
        <i v-if="nav.icon" class="icon" :class="'fa fa-' + nav.icon"></i>
      </div>
    </div>
    <div v-show="isShow" class="mask" @click.self="toggleShow"></div>
    <div
      class="fliterMask"
      v-if="isScreen"
      :class="{ fliterMaskFixed: isScreen }"
    >
      <div
        class="fliterMaskContent"
        v-for="(items, index) in filterData.screenBy"
        :key="index"
      >
        <h4 class="title">{{ items.title }}</h4>
        <ul class="item-wrap">
          <li
            class="item-content"
            :class="{ activeSel: item.select }"
            v-for="(item, index) in items.data"
            :key="index"
            @click="selector(item, items)"
          >
            <img class="item-imgs" v-if="item.icon" :src="item.icon" alt="" />
            <span class="item-name">{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="bottom-button">
        <button
          @click="clearBtn"
          class="reset"
          :class="{ clearActive: isClear }"
        >
          清空
        </button>
        <button @click="filterOk" class="ok">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      isShow: false,
      isScreen: false,
    };
  },
  props: {
    filterData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    isClear() {
      let clear = false;
      this.filterData.screenBy.forEach((items) => {
        items.data.forEach((item) => {
          if (item.select) {
            clear = true;
          }
        });
      });
      return clear;
    },
  },
  methods: {
    filterOk() {
      let screenData = {
        MPI: "",
        offer: "",
        pre: "",
      };
      let apiStr = "";
      this.filterData.screenBy.forEach((items) => {
        items.data.forEach((item, index) => {
          if (item.select) {
            if (items.id !== "MPI") {
              //单选操作
              screenData[items.id] = item.code;
            } else {
              apiStr += item.code + ",";
              //多选操作
              screenData[items.id] = apiStr;
            }
          }
        });
      });
      this.$emit("update", screenData);
      this.toggleShow();
    },
    clearBtn() {
      this.filterData.screenBy.forEach((items) => {
        items.data.forEach((item) => {
          item.select = false;
        });
      });
    },
    toggleShow() {
      this.$emit("clickShow", false);
      this.isShow = false;
      this.isScreen = false;
    },
    toggleIndex(index) {
      this.currentIndex = index;
      switch (index) {
        case 0: {
          this.isShow = true;
          this.isScreen = false;
          //发送一个事件
          this.$emit("clickShow", true);
          this.$emit("update", this.filterData.navTab[0].condition);
          break;
        }
        case 1: {
          //发送一个事件
          this.$emit("update", this.filterData.navTab[1].condition);
          this.isScreen = false;
          this.toggleShow();
          break;
        }
        case 2: {
          //发送一个事件
          this.$emit("update", this.filterData.navTab[2].condition);
          this.isScreen = false;
          this.toggleShow();
          break;
        }
        case 3: {
          this.isScreen = true;
          this.$emit("clickShow", false);
          break;
        }
        default: {
          this.isScreen = false;
          this.toggleShow();
          break;
        }
      }
    },
    selector(item, items) {
      // console.log(items, item);
      if (items.id !== "MPI") {
        items.data.forEach((ele) => {
          ele.select = false;
        });
      }
      item.select = !item.select;
    },
  },
};
</script>
<style scoped>
.fliterMaskFixed {
  position: fixed;
  top: 100px;
  left: 0;
}
.bottom-button {
  display: flex;
  height: 50px;
}
.fliterMask {
  z-index: 999;
  background-color: #eaeaea;
}
.activeSel {
  color: #5b87d2 !important;
  background-color: #dbe0ec !important;
}
.clearActive {
  color: black !important;
}
.reset,
.ok {
  flex: 1;
  line-height: 50px;
  border: 0;
  outline: none;
}
.reset {
  background-color: #eaeaea;
  border-top: 1px solid #ccc;
  color: #cccccc;
}
.ok {
  background-color: #2abe57;
  color: #fff;
}
.fliterMaskContent .title {
  margin: 12px 5px;
}
.item-wrap {
  flex-wrap: wrap;
  display: flex;
  text-align: center;
}
.item-content {
  flex: 23%;
  height: 30px;
  line-height: 30px;
  background-color: #e6e6e6;
  margin: 5px 5px;
}
.item-content .item-name {
  font-size: 14px;
}
.item-imgs {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
.tofixed {
  z-index: 999;
  width: 100%;
  position: fixed;
  padding: 10px;
  background-color: #fff;
  top: 60px;
  left: 0;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 5;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.nav {
  text-align: center;
  display: flex;
}
.nav_item {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  flex: 1;
}
.active {
  font-weight: 700;
}
.icon {
  vertical-align: middle;
  font-size: 10px;
  margin-left: 5px;
}
</style>
