<script lang="ts" setup>
import { menuList, PEBValue } from "@/pages/addProduct/components/Energy/data";
import Input from "@/components/Common/Input/Input.vue";
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";

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
                  <div v-for="item in PEBValue" :key="item.id" class="energy__valuePEB" :style="{background : item.color}" >
                        <Paragraphe>{{item.label}}</Paragraphe>
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
            @apply flex w-[100%] gap-[20px];
      }
      &__valuePEB{
            @apply  text-[white] w-[33px] h-[33px] rounded-[50%] flex justify-center items-center;
      }
}

</style> 