<script lang="ts" setup>
import { menuList, PEBValue } from "@/pages/addProduct/components/Energy/data";
import Input from "@/components/Common/Input/Input.vue";

</script>

<template>
      <div class="energy__container">
            <div class="" v-for="item in menuList" :key="item.id">
                  {{item}}
            </div>
      </div>
</template>

<style lang="scss" scoped>
.energy{
      &__container{

      }
      &__input-container{

      }
}

</style> 