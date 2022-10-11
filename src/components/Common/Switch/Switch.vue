<script lang="ts" setup>
import { Switch } from "ant-design-vue";
import { reactive, ref } from 'vue';

const checked = ref<Boolean>(false);

defineProps({
      check :{
            type : Boolean,
            default : false
      }
})

</script>

<template>
      <div class="switch">
            <h3> Switch </h3> 
            <Switch 
                  v-model:checked="checked" 
                  checked-children="OUI"
                  un-checked-children="NON"
            />
      </div>
</template>

<style scoped lang="scss">
      .switch{
            &:deep{
                  .ant-switch{
                        @apply h-[34px] w-[115px] rounded-[4px];
                        background-color: var(--color-gray);
                        color: var(--color-secondary)
                  }
                  .ant-switch-checked{
                        @apply bg-[gray] ;
                        left: 10px;
                        color: var(--color-gray);
                  }
                  .ant-switch-handle{
                        @apply h-[80%] w-[50px] rounded-[4px];
                  }
                  .ant-switch-checked .ant-switch-handle{
                        left : calc(100% - 53px)
                  } 
                  .ant-switch-checked .ant-switch-inner{
                        margin: 0 45px 0 7px;
                  } 
                  .ant-switch-inner{
                        color: black;
                  }
                  .ant-switch-handle::before{
                        @apply rounded-[4px];
                  }

            }
      }
</style>