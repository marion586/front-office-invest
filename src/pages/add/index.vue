
<script lang="ts" setup>
import SideBar from '@/components/Display/SideBar/index.vue';
import { ref } from 'vue';
import DefaultMenu from '@/components/Icon/DefaultMenuIcon.vue';

interface SubMenu{
      id : string,
      label : string,
}

interface Menu {
      id : string,
      label : string,
      icon : string,
      subMenu ?: SubMenu[]
}

const menu = ref<Array<Menu>>([
      {
            id : "m-0",
            label : "Information de base",
            icon : DefaultMenu,
            subMenu : [
                  {
                        id : "s-00",
                        label : "Type de bien"
                  },
                  {
                        id : "s-01",
                        label : "Adresse"
                  },
                  {
                        id : "s-02",
                        label : "Photos"
                  },
                  {
                        id : "s-03",
                        label : "Prix"
                  },
            ]
      },
      {
            id : "m-1",
            label : "Information de base",
            icon : DefaultMenu
      },
      {
            id : "m-2",
            label : "Description de l'annonce",
            icon : DefaultMenu
      },
      {
            id : "m-3",
            label : "Documents relatifs aux biens",
            icon : DefaultMenu
      }
])

</script>


<template>
      <div class="mc-container">
            <SideBar :data="menu" />
      </div>
</template>

<style scoped lang="scss">
      .mc{
            &__container {
                  @apply m-[12px]
            }
      }

</style>