<script lang="ts" setup>
import ASteps from "ant-design-vue/lib/steps";
import { ref } from "vue";

const AStep  = ASteps.Step;
const step = ref<number>(0)
 
defineProps<{
      data : any
}>();

function changeStep(item : any) : void{
      step.value = item.id
}

function clickItem (item : any) : void{
      console.log("<<<<<<<<<<<<<<<<<\n", item);
}


</script>

<template>
      <div class="mc__container">
            <a-steps 
                  :current="step"  
                  direction="vertical"
            >
                  <a-step v-for="item in data" @change="changeStep(item)" >
                        <template #title>
                              {{item.label}}
                        </template>
                        <template #description >
                              <a-steps progress-dot direction="vertical" v-if="item.subMenu">
                                    <a-step v-for="subItem in item.subMenu" @click="clickItem(subItem)">
                                          <template #title>
                                                {{subItem.label}}
                                          </template>
                                    </a-step>
                              </a-steps>
                        </template>
                  </a-step>
            </a-steps>
      </div>
</template>

<style lang="scss" scoped>
      .mc{
            &__container{
                  @apply bg-[white] w-[315px] rounded-[8px] p-[12px];
                  &:deep(){
                        .ant-steps-item-icon{
                              background-color: var(--color-gray-icon);
                              width: 18px;
                              height: 18px;
                              border-color: var(--color-gray-icon);
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin-top: 8px;
                        }
                        .ant-steps-icon{
                              color: white;
                              font-size: 12px;
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon{
                              border-color: transparent;
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon{
                              color: transparent;
                        }
                        .ant-steps-item-title{
                              color: rgba(0, 0, 0, 0.45);
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon .ant-steps-icon {
                              color: white;
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-title, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-subtitle, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-description{
                              color: rgba(0, 0, 0, 0.45);
                        }
                        .ant-steps-item-description .ant-steps-item-container .ant-steps-item-icon{
                              display: none;
                        }
                        .ant-steps-item-description .ant-steps-item-container .ant-steps-item-tail{
                              display: none;
                        }
                        
                  }
            }
      }

</style>