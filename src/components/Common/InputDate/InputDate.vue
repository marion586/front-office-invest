<script lang="ts" setup>
import { DatePicker, Space } from "ant-design-vue";
import { ref, watch } from "vue";

const date = ref();
const emit = defineEmits(["handleChange"])

const props = defineProps({
      label : {
            type : String,
            default : ""
      }
})

function changeDate(date : any){
      emit('handleChange', date.$d);
}

</script>

<template>
      <Space class="date__space">
            <label for="" class="date__label">{{props.label}}</label>
            <DatePicker 
                  format="DD-MM-YYYY"
                  class="date__item"
                  v-model="date"
                  @change="changeDate"
            />
      </Space>
</template>

<style lang="scss" scoped>
      .ant-picker-focused{
            // border-color: var(--color-primary);
            border: solid var(--color-primary) 1px;
            box-shadow: none;
      }

      .ant-picker{
            height: 38px;
            cursor: pointer;
            border-radius: 4px;
      }
      .ant-picker:hover{
            border-color: var(--color-primary);
      }
      .ant-space-align-center{
            align-items: initial;
      }
      // .ant-picker:hover, .ant-picker-focused{
      //       border-color : "red"
      // }
      .date{
            &__space {
                  @apply w-[100%] flex flex-col flex-1;
            }
            &__item{
                  @apply flex flex-1;
            }
            &__label{
                  font-size: 14px;
                  font-weight: 500;
                  color: var(--color-gray-icon);
                  display: block;
            }
      }
</style>