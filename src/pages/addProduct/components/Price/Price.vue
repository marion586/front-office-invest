<script lang="ts" setup>
import { menuList } from "@/pages/addProduct/components/Price/data";
import Input from "@/components/Common/Input/Input.vue";

</script>

<template>
      <div class="">
            <div class="" v-for="item in menuList" :key="item.id">
                  <Input 
                        :label="item.label"
                        :required="item.required"
                        :name-input="item.name"
                  />      
            </div>
      </div>
</template>

<style lang="scss" scoped>
</style>