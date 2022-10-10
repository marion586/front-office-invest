<script lang="ts" setup>
import { ref } from 'vue';
import { data } from "@/pages/add/components/PropertyType/data";
import SelectInput from "@/components/Common/Select/Select.vue";

const element = ref<Array<any>>(data);

</script>

<template>
      <div class="">
            <p class="info__title">Type d'annonces :</p>
            <div class="">
                  <div class="" v-for="item in element">
                         
                  </div>
            </div>
      </div>
</template>

<style lang="scss" scoped>
      .info{
            &__title{
                  font-weight: 600;
            }
      }
</style>