
<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import PropertyType from '@/pages/addProduct/components/PropertyType/PropertyType.vue';
import SideBar from '@/pages/addProduct/components/SideBar/SideBar.vue';
import { data } from "@/pages/addProduct/components/SideBar/data";

let activeComp = shallowRef<Array<object>>([PropertyType])
const current = ref<number>(0);

function changeComponent(comp : object){
      activeComp.value = [comp];
}

function next(){
      current.value++;
}

function prev(){
      current.value--;
}

</script>

<template>
      <div class="md:container">
            <div class="add__container">
                  <SideBar :currentItem="current" @component="changeComponent"/>
                  <div class="add__content">
                        <component :is="activeComp[activeComp.length - 1]" @onNext="next" @onPrev="prev" />
                  </div>
            </div>
      </div>
</template>

<style scoped lang="scss">
      .add{
            &__container {
                  @apply m-[12px] md:flex gap-[20px] md:gap-[10px]
            }
            &__content{
                  @apply bg-[white] rounded-[8px] p-[10px] md:p-[24px] sm:w-[100%] lg:w-[893px] mt-[10px] md:mt-[0px] md:h-[calc(100vh_-_100px)];
            }
      }

</style>