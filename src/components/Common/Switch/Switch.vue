<script lang="ts" setup>
import { Switch } from "ant-design-vue";
import { ref, watch } from 'vue';

const checked = ref<Boolean>(false);
const emit = defineEmits(['switchValue'])


const props = defineProps({
      checkedName :{
            type : String,
            default : "OUI"
      },
      uncheckedName : {
            type : String,
            default : "NON"
      },
      itemLabel : {
            type : String,
            required : true
      }
})

watch(() => checked.value, (first, second) => {
      emit('switchValue', first);
});

</script>

<template>
      <div class="switch">
            <label for="" class="switch__label">{{props.itemLabel}}</label>
            <Switch 
                  v-model:checked="checked" 
                  :checked-children="props.checkedName"
                  :un-checked-children="props.uncheckedName"
            />
      </div>
</template>

<style scoped lang="scss">
      .switch{
            @apply flex flex-col;

            &__label{
                  font-size: 14px;
                  font-weight: 500;
                  color: var(--color-gray-icon);
                  margin-bottom: 10px;
                  display: block;
            }
            &:deep(){
                  .ant-switch{
                        @apply h-[34px] w-[115px] rounded-[4px];
                        background-color: var(--color-gray);
                        color: var(--color-secondary);
                  }
                  .ant-switch-checked{
                        color: var(--color-gray);
                        background-color: var(--color-primary);
                  }
                  .ant-switch-handle{
                        @apply h-[80%] w-[50px] rounded-[4px] mt-[1px];
                  }
                  .ant-switch-checked .ant-switch-handle{
                        left : calc(100% - 53px)
                  } 
                  .ant-switch-checked .ant-switch-inner{
                        margin: 0 50px 0 7px;
                  } 
                  .ant-switch-inner{
                        color: var(--color-primary);
                  }
                  .ant-switch-handle::before{
                        @apply rounded-[4px];
                  }
                  .ant-switch-inner{
                        margin: 0 7px 0 50px;
                  }
                  .ant-switch-checked .ant-switch-inner{
                        color: white;
                  }

            }
      }
</style>