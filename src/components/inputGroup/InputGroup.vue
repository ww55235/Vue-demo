<template>
  <div class="InputGroup">
    <input @input="inpHandler" :placeholder="placeholder" :type="type" />
    <button class="btn" @click="btnHandler" :disabled="disabled">
      {{ btnText }}
    </button>
    <div class="error" v-show="error">{{ error }}</div>
  </div>
</template>
<script>
export default {
  methods: {
    btnHandler() {
      //发送一个自定义事件
      this.$emit("vercode");
    },
    inpHandler(event) {
      //   console.log(event.target.value);
      //注册一个事件
      this.$emit("input", event.target.value);
    },
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    disabled: Boolean,
    btnText: String,
    value: String,
    error: String,
  },
};
</script>
<style scoped>
.InputGroup {
  position: relative;
  margin: 0 auto;
  width: 70%;
}
input {
  margin-top: 10px;
  width: 100%;
  height: 20px;
  line-height: 20px;
}
.btn {
  position: absolute;
  border: 0;
  outline: none;
  background: #ffffff;
  cursor: pointer;
  top: 13px;
  right: 0;
}
.error {
  margin-top: 10px;
  font-size: 12px;
  color: red;
}
</style>
