<script lang="ts" setup>
import { inputItem } from "@/pages/addProduct/components/Photos/data";
import Input from "@/components/Common/Input/Input.vue";
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";

</script>

<template>
      <div class="photos__container">
            <div class="" v-for="item in inputItem" :key="item.id">
                  <Input 
                        v-if="item.type === 'input'"
                        :label="item.label"
                        :name-input="item.name"
                  />
                  <div class="" v-if="item.type === 'file'">
                        <Paragraphe class="photos__title"> {{item.label}} </Paragraphe>
                        <div class="my-2">
                              <Paragraphe v-for="subTitle in item.subtitle" :key="subTitle.id" class="photos__subtitle">{{subTitle.text}}</Paragraphe>
                        </div>
                        <div class="photos__file">
                              +
                        </div>
                  </div>      
            </div>
      </div>
</template>

<style scoped lang="scss">
      .photos{
            &__container{

            }
            &__file{
                  @apply w-[150px] h-[150px] rounded-md bg-slate-200 flex justify-center items-center;
            }
            &__title{
                  @apply font-semibold text-slate-700;
            }
            &__subtitle{

            }
      }
</style>