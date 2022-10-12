<script lang="ts" setup>
import { inputList } from "@/pages/addProduct/components/Address/data";
import Input from "@/components/Common/Input/Input.vue";

</script>

<template>
      <div class="adress__container">
            <div class="" v-for="item in inputList" :key="item.id">
                  <Input 
                        :label="item.label"
                        :name-input="item.name"
                        required
                  />
                  <div class="adress__map" v-if="item.hasMap">

                  </div>
            </div>
      </div>
</template>

<style scoped lang="scss">
      .adress{
            &__container{

            }
            &__map{
                  @apply border rounded-sm h-[258px] mb-[10px];
            }
      }
</style>