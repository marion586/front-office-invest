
<script lang="ts" setup>
import SideBar from '@/components/Display/SideBar/index.vue';
import { ref } from 'vue';
import Default from '@/components/Icon/Default.vue';

interface SubMenu{
      id : number,
      label : string,
}

interface Menu {
      id : number,
      label : string,
      icon : string,
      subMenu ?: SubMenu[]
}

const menu = ref<Array<Menu>>([
      {
            id : 0,
            label : "Information de base",
            icon : Default,
            subMenu : [
                  {
                        id : 0,
                        label : "Type de bien"
                  },
                  {
                        id : 1,
                        label : "Adresse"
                  },
                  {
                        id : 2,
                        label : "Photos"
                  },
                  {
                        id : 3,
                        label : "Prix"
                  },
            ]
      },
      {
            id : 1,
            label : "Information de base",
            icon : Default
      },
      {
            id : 2,
            label : "Description de l'annonce",
            icon : Default
      },
      {
            id : 3,
            label : "Documents relatifs aux biens",
            icon : Default
      }
])

</script>


<template>
      <div class="">
            <SideBar :data="menu" />
      </div>
</template>

<style scoped lang="scss">

</style>