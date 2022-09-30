<template>
  <div class="fields">
    <label for="">{{ label }}</label>
    <a-input :placeholder="placeholder" />
  </div>
</template>

<script setup>
import AInput from "ant-design-vue/lib/input";

defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
  .fields {
    label {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-gray-icon);
      margin-bottom: 10px;
    }
    &::v-deep {
      .ant-input {
        border: 1px solid var(--color-stroke-gray);
        font-size: 14px;
        height: 38px;
        border-radius: 4px;
        &::placeholder {
          font-size: 14px;
          font-weight: 300; 
        }
      }
    } 
  }
</style>
