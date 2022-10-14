<script lang="ts" setup>
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import { menuList } from "@/pages/addProduct/components/Documents/data";
import Input from "@/components/Common/Input/Input.vue";

</script>

<template>
      <div class="document__container">
            <div class="" v-for="item in menuList">
                  <Input 
                        :label="item.label"
                        :name-input="item.name"
                  />
                  <div class="document__file">
                              +
                  </div>
            </div>
      </div>
</template>

<style scoped lang="scss">
      .document{
            &__container{

            }
            &__file{
                  @apply w-[150px] h-[150px] rounded-md bg-slate-200 flex justify-center items-center;
            }
      }
</style>