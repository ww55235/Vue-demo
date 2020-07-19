<template>
  <div class="formInput">
    <label for="">{{ label }}</label>
    <input
      @click="$emit('click')"
      v-if="!textarea"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      @click="$emit('click')"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-else
      :type="type"
      :placeholder="placeholder"
      rows="2"
      maxlength="100"
    ></textarea>
    <i v-if="icon" class="icon" :class="'fa fa-' + icon"></i>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    label: String,
    value: String,
    placeholder: String,
    textarea: String,
    icon: String,
  },
};
</script>
<style scoped>
textarea {
  vertical-align: top;
  border: 0;
  outline: 0;
}
input {
  border: 0;
  outline: 0;
  vertical-align: middle;
  width: 280px;
}
.formInput {
  position: relative;
  background-color: #fff;
  padding: 10px;
}
.icon {
  position: absolute;
  right: 5px;
  top: 10px;
  font-size: 20px;
}
label {
  display: inline-block;
  width: 70px;
  font-size: 18px;
  font-weight: 700;
}
</style>
