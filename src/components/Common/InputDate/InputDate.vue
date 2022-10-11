<script lang="ts" setup>
import { DatePicker, Space } from "ant-design-vue";

</script>

<template>
      <h3>Input date</h3>
      <Space class="date__space">
            <label for="">date picker</label>
            <DatePicker 
                  class="date__item"
            />
      </Space>
</template>

<style lang="scss" scoped>
      .date{
            &__space {
                  @apply w-[100%] flex flex-col;
            }
            &__item{
                  @apply flex-1 ;
            }
      }
</style>