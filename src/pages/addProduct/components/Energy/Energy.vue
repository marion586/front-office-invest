<script lang="ts" setup>
import { menuList, PEBValue } from "@/pages/addProduct/components/Energy/data";
import Input from "@/components/Common/Input/Input.vue";
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import { ref } from "vue";

const active = ref<number>(PEBValue.length-1);

</script>

<template>
      <div class="energy__container">
            <div class="" v-for="item in menuList" :key="item.id">
                  <Input 
                        :label="item.label"
                        :name-input="item.name"
                  />
            </div>
            <div class="energy__valuePEB-container">
                  <div v-for="item in PEBValue" :key="item.id" :class="[item.id === active ? 'energy__active' : '']" class="energy__valuePEB" >
                        <Paragraphe :style="{background : item.color}" >{{item.label}}</Paragraphe>
                  </div>
            </div>
      </div>
</template>

<style lang="scss" scoped>
.energy{
      &__container{

      }
      &__input-container{

      }
      &__valuePEB-container{
            @apply flex w-[100%] gap-[20px] flex-wrap;
      }
      &__valuePEB{
            p {
                  @apply  text-[white] w-[33px] h-[33px] rounded-[50%] flex justify-center items-center flex-wrap;
            }
      }
      &__active{
            position: relative;
            z-index: 9;
            &::after {
                  content: "";
                  width: 115%;
                  height: 115%;
                  display: inline-block;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  border-radius: 50%;
                  background-color: var(--color-primary);
                  z-index: -1;
            }
      }
}

</style> 