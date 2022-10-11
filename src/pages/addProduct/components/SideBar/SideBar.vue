<script lang="ts" setup>
import ASteps from "ant-design-vue/lib/steps/index";
import { ref } from "vue";
import { data } from "@/pages/addProduct/components/SideBar/data";

const AStep = ASteps.Step;
const current = ref<number>(0);
const currentSubItem = ref<number>(0)
const menuList = ref<Array<any>>(data);



</script>

<template>
      <div class="steps__container">
            <!-- <div class="flex md:hidden" v-for="(item, idItem) in menuList" :key="idItem">
                  <div class="steps__icon"> {{idItem + 1}} </div>
            </div> -->
            <div class="steps__phone-steps" >
                  <div class="steps__icon"> {{1}} </div>
                  <p class="">{{menuList[0].label}}</p>
            </div>
            <a-steps
                  :current="current"
                  direction="vertical"
                  size="small"
                  class="hidden md:flex"
            >
                  <a-step v-for="item in menuList">
                        <template #title>
                              {{item.label}}
                        </template>
                        <template #description>
                              <a-steps
                                    class="steps-description hidden md:flex" 
                                    direction="vertical"
                                    :current="currentSubItem"
                              >
                                    <a-step v-for="subItem in item.subMenu" :key="subItem.id" :class="[subItem.id === currentSubItem ? 'sub-item-active' : '']">
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
      .steps{
            &__container{
                  @apply bg-[white] w-[100%] md:w-[315px] rounded-[8px] p-[12px];
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
            &__icon{
                  background-color: var(--color-gray-icon);
                  width: 18px;
                  height: 18px;
                  border-color: var(--color-gray-icon);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 5px;
                  color: white;
                  border-radius: 50%;
            }

            &__phone-steps{
                  @apply flex gap-[10px] items-center text-[14px] font-semibold md:hidden w-[100%];
            }
            
      }

</style>