<script lang="ts" setup>
import { menuList, details, room } from "@/pages/addProduct/components/Inside/data";
import Input from "@/components/Common/Input/Input.vue";
import { ref } from "vue";
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";

const roomNumber = ref<number>(0);

function getRoomNumber(value : any): void{
      roomNumber.value = +value.roomNumber
}

</script>

<template>
      <div class="">
            <div class="" v-for="item in menuList" :key="item.id">
                  <Paragraphe class="inside__title">{{item.title}}</Paragraphe>
                  <div class="" v-for="subItem in item.item" :key="item.id">
                        <Input 
                              :label="subItem.label"
                              :name-input="subItem.name"
                              input-type="number"
                              @input="getRoomNumber"
                        />
                  </div>
            </div>
            <div class="">
                  <div class="" v-for="(item, idItem) in roomNumber" :key="idItem">
                        <Paragraphe class="inside__title">Chambre {{item}}</Paragraphe>
                        <hr class="inside__divider">
                        <div class="inside__room-description">
                              <div class="" v-for="roomItem in room">
                                    <Input 
                                          :label="roomItem.label"
                                          :name-input="`${roomItem.name}${item}`"
                                    />
                              </div>
                        </div>
                  </div>
            </div>

            <hr class="inside__divider">
            <div class="inside__details-container">
                  <Input
                        v-for="item in details" :key="item.id"
                        :label="item.label"
                        :name-input="item.name"
                        class="inside__input" 
                  />
            </div>
      </div>
</template>

<style lang="scss" scoped>
.inside{
      &__title{
            @apply my-[10px] text-[14px];
            color: var(--color-primary);
      }
      &__details-container{
            @apply flex  gap-[24px] flex-wrap;
      }
      &__input{
            @apply flex md:flex-1 flex-col;
      }
      &__divider{
            @apply  mb-[18px];
      }

      &__room-description{
            @apply flex gap-[24px] flex-wrap;
      }
}
</style> 