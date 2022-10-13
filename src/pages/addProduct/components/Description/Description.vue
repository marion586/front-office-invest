<script lang="ts" setup>
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import { itemList } from "@/pages/addProduct/components/Description/data";
import Input from "@/components/Common/Input/Input.vue";

</script>

<template>
      <div class="">
            <div class="" v-for="item in itemList" :key="item.id">
                  <Input 
                        :label="item.label"
                        :name-input="item.name"
                        :input-type="item.type"
                  />     
            </div>
      </div>
</template>

<style lang="scss" scoped>

</style>