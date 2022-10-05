<script lang="ts" setup>
import { ref } from "vue";
import Menu from '@/components/Icon/Menu.vue'
import AMenu from "ant-design-vue/lib/menu";
import ASubMenu from 'ant-design-vue/lib/menu/src/SubMenu';
import AMenuItem from "ant-design-vue/lib/menu/src/MenuItem";

let show = ref<Boolean>(false);
let oldClass = ref<String>('mc__content-menu')
let none = ref<String>('mc__none')

defineProps<{
      data : any
}>()

function setShow(): void {
      show.value = !show.value;
}

</script>


<template>
      <div class="mc__container">
            <div class="mc__content">
                  <div class="mc__menu" @click="setShow">
                        <Menu />
                  </div>
                  <div :class="[ oldClass, show ? none : '']">
                        <a-menu 
                              mode="inline"
                        >
                              <template v-for="item in data" :key="item.id">
                                    <a-menu-item :key="item.id" v-if="!item.subMenu">
                                          <template #icon>
                                                <component :is="item.icon" /> &nbsp;
                                          </template>
                                          {{item.label}}
                                    </a-menu-item>
                                    <a-sub-menu v-else>
                                          <template #icon>
                                                <component :is="item.icon" /> &nbsp;
                                          </template>
                                          <template #title>
                                                {{item.label}}
                                          </template>
                                          <a-menu-item v-for="mItem in item.subMenu" :key="`item+${mItem.id}`">
                                                {{mItem.label}}
                                          </a-menu-item>
                                    </a-sub-menu>
                              </template>
                        </a-menu>
                  </div>
            </div>
      </div>
</template>

<style scoped lang="scss">
.mc {
      &__container {
            @apply bg-[white] m-[10px] p-[12px] rounded-[8px] max-w-[315px];
      }

      &__content {
            @apply flex flex-col;
      }

      &__menu {
            @apply cursor-pointer max-w-[20px] flex justify-center sm:ml-[10px] md:ml-[20px];
      }
      &__content-menu{
            @apply mt-[10px]
      }
      &__none{
            display: none;
      }
      &__m-none{
            @apply md:hidden
      }

}

.bg-btn {
      background-color: var(--color-gray);
}
</style>