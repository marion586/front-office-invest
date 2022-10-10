
<script lang="ts" setup>
import SideBar from '@/components/Display/SideBar/index.vue';
import { reactive, ref, shallowRef } from 'vue';
import DefaultMenu from '@/components/Icon/DefaultMenuIcon.vue';
import Adress from '@/pages/add/components/Address/index.vue';
import Photos from '@/pages/add/components/Photos/index.vue';
import Price from '@/pages/add/components/Price/index.vue';
import PropertyType from '@/pages/add/components/PropertyType/index.vue';
import Steps from '@/components/Display/Steps/index.vue';


let activeComp = shallowRef<Array<object>>([PropertyType])

interface SubMenu{
      id : number,
      label : string,
      component ?: object
}

interface Menu {
      id : number,
      label : string,
      icon : string,
      subMenu ?: SubMenu[],
      component ?: object
}

const menu = shallowRef<Array<Menu>>([
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
            id : 2,
            label : "Information de base",
            icon : DefaultMenu,
            subMenu : [
                  {
                        id : 4,
                        label : "Générale",
                  },
                  {
                        id : 5,
                        label : "intérieur",
                  },
                  {
                        id : 6,
                        label : "Caractéristique énergetique",
                  },
            ]
      },
      {
            id : 3,
            label : "Description de l'annonce",
            icon : DefaultMenu,
            component : PropertyType,
      },
      {
            id : 4,
            label : "Documents relatifs aux biens",
            icon : DefaultMenu,
            component : PropertyType,
      }
])

function changeComponent(comp : object){
      activeComp.value = [comp];
}

</script>


<template>
      <div class="md:container">
            <div class="add__container">
                  <!-- <SideBar :data="menu" @component="changeComponent" /> -->
                  <Steps :data="menu" @component="changeComponent" />
                  <div class="add__content">
                        <component :is="activeComp[activeComp.length - 1]" v-bind="activeComp[activeComp.length - 1]"  />
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
                  @apply bg-[white] rounded-[8px] p-[24px] sm:w-[100%] lg:w-[893px];
                  @media (min-width : 768px) {
                        min-height: calc(100vh - 80px);
                  }
            }
      }

</style>