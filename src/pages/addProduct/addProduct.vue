
<script lang="ts" setup>
import { shallowRef } from 'vue';
import PropertyType from '@/pages/addProduct/components/PropertyType/PropertyType.vue';
import Steps from '@/pages/addProduct/components/SideBar/SideBar.vue';
import { data } from "@/pages/addProduct/components/SideBar/data";

let activeComp = shallowRef<Array<object>>([PropertyType])
const menu = shallowRef<Array<any>>(data)

function changeComponent(comp : object){
      activeComp.value = [comp];
}

function onNext() : void{
      console.log("bbbb\n");
}

</script>


<template>
      <div class="md:container">
            <div class="add__container">
                  <!-- <SideBar :data="menu" @component="changeComponent" /> -->
                  <!-- <Steps :data="menu" @component="changeComponent" /> -->
                  <Steps />
                  <div class="add__content">
                        <component :is="activeComp[activeComp.length - 1]" @onNext="onNext"  />
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
                  @apply bg-[white] rounded-[8px] p-[10px] md:p-[24px] sm:w-[100%] lg:w-[893px] mt-[10px] md:mt-[0px];
                  @media (min-width : 768px) {
                        min-height: calc(100vh - 100px);
                  }
            }
      }

</style>