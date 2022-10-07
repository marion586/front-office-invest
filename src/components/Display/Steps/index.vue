<script lang="ts" setup>
import ASteps from "ant-design-vue/lib/steps";
import { ref } from "vue";
import ArrowMenu from '@/components/Icon/ArrowMenu.vue';


const AStep  = ASteps.Step;
const step = ref<number>(0);
const idActive = ref<number>(0);
const idItemActive = ref<number>(0)

defineProps<{
      data : any
}>();

function changeStep(item : any) : void{
      step.value = item.id
}

function clickItem(item : any, subitem ?: any) : void{
      if(subitem){
            idActive.value = subitem.id;
      }
      idItemActive.value = item.id;
}


</script>

<template>
      <div class="mc__container">
            <a-steps 
                  :current="step"  
                  direction="vertical"
                  size="small"
            >
                  <a-step v-for="item in data" @change="changeStep(item)" >
                        <template #title>
                              {{item.label}}
                        </template>
                        <template #subTitle v-if="item.id === idItemActive">
                              <arrow-menu/>
                        </template>
                        <template #description >
                              <a-steps progress-dot class="steps-description" direction="vertical" v-if="item.id === idItemActive">
                                    <a-step v-for="subItem in item.subMenu" @click="clickItem(item, subItem)" :class="[idActive === subItem.id ? 'sub-item-active' : '']">
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
                  .sub-item-active{
                        background-color: var(--color-gray);
                        @apply rounded-[8px] w-[200px] h-[42px] flex items-center;
                  }
                  &:deep(){
                        .ant-steps-item-icon{
                              background-color: var(--color-gray-icon);
                              width: 18px;
                              height: 18px;
                              border-color: var(--color-gray-icon);
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin-top: 5px;

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
                              color: rgba(0, 0, 0, 0.60);
                              font-weight: 600;
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon .ant-steps-icon {
                              color: white;
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-title, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-subtitle, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-description{
                              color: rgba(0, 0, 0, 0.60);
                        }
                        .ant-steps-item-description .ant-steps-item-container .ant-steps-item-icon{
                              display: none;
                        }
                        .ant-steps-item-description .ant-steps-item-container .ant-steps-item-tail{
                              display: none;
                        }
                        .ant-steps-item-container{
                              padding-left: 12px;
                        }
                        .ant-steps-item-tail{
                              padding-left: 12px;
                        }
                        .ant-steps-item-description .ant-steps-item-content{
                              display: flex;
                              align-items: center;
                        }
                        .ant-steps-vertical.ant-steps-small .ant-steps-item-container .ant-steps-item-tail{
                              left: 22px;
                        }

                        .ant-steps-item-title{
                              width: 100%;
                              display: flex;
                              justify-content: space-between;
                        }
                        .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
                              color : rgba($color: (#000000), $alpha: 0.60);
                              font-weight: 600;
                        }
                  }
            
            }
            &__none{
                  @apply hidden;
            }
            &__flex{
                  @apply flex;
            }
            
      }

</style>