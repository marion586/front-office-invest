
<script lang="ts" setup>
import SideBar from '@/components/Display/SideBar/index.vue';
import { ref } from 'vue';
import DefaultMenu from '@/components/Icon/DefaultMenuIcon.vue';
import Adress from '@/pages/add/components/Address/index.vue';
import Photos from '@/pages/add/components/Photos/index.vue';
import Price from '@/pages/add/components/Price/index.vue';
import PropertyType from '@/pages/add/components/PropertyType/index.vue';
import Steps from '@/components/Display/Steps/index.vue';

const activeComp = ref<Array<any>>([PropertyType])

interface SubMenu{
      id : number,
      label : string,
      component : any
}

interface Menu {
      id : number,
      label : string,
      icon : string,
      subMenu ?: SubMenu[],
      component ?: any
}

const menu = ref<Array<Menu>>([
      {
            id : 0,
            label : "Information de base",
            icon : DefaultMenu,
            subMenu : [
                  {
                        id : 0,
                        label : "Type de bien",
                        component : PropertyType
                  },
                  {
                        id : 1,
                        label : "Adresse",
                        component : Adress
                  },
                  {
                        id : 2,
                        label : "Photos",
                        component : Photos
                  },
                  {
                        id : 3,
                        label : "Prix",
                        component : Price
                  },
            ]
      },
      {
            id : 5,
            label : "Information de base",
            icon : DefaultMenu,
            component : PropertyType,
      },
      {
            id : 6,
            label : "Description de l'annonce",
            icon : DefaultMenu,
            component : PropertyType,
      },
      {
            id : 7,
            label : "Documents relatifs aux biens",
            icon : DefaultMenu,
            component : PropertyType,
      }
])

function changeComponent(comp : string){
      activeComp.value = [comp];
}

</script>


<template>
      <div class="container">
            <div class="add__container">
                  <!-- <SideBar :data="menu" @component="changeComponent" /> -->
                  <Steps :data="menu" />
                  <!-- <div class="myc__content">
                        <component :is="activeComp[activeComp.length - 1]" />
                  </div> -->
            </div>
      </div>
</template>

<style scoped lang="scss">
      .add{
            &__container {
                  @apply m-[12px] flex flex-wrap gap-[10px]
            }
            &__content{
                  @apply bg-[white] rounded-[8px] p-[24px] max-w-[893px] sm:w-[100%] lg:w-[893px] lg:h-[675px]
            }
      }

</style>