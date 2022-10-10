<script lang="ts" setup>
import { ref } from 'vue';
import { data, footer } from "@/pages/add/components/PropertyType/data";
import SelectInput from "@/components/Common/Select/Select.vue";
import Button from "@/components/Common/Button/Button.vue";

const element = ref<Array<any>>(data);

</script>

<template>
      <div class="info__container">
            <div class="info__body">
                  <p class="info__title">Type d'annonces :</p>
                  <hr class="info__divider">
                  <div class="info__input-container">
                        <div class="info__input-item" v-for="item in element">
                              <label for="" class="info__select-label">{{item.label}}</label>
                              <SelectInput 
                                    :label="item.label"
                                    :name="item.name"
                                    :options="item.options"
                                    :placeholder="item.placeholder"
                              /> 
                        </div>
                  </div>
            </div>
            <div class="info__footer">
                  <div class="" v-for="itemFooter in footer">
                        <p>{{itemFooter.title}}</p>
                  </div>
                  <Button
                        class="info__my-btn"
                  >
                        Suivant
                  </Button>
            </div>
      </div>
</template>

<style lang="scss" scoped>
      .info{
            &__title{
                  font-weight: 600;
            }
            &__divider{
                  @apply my-[18px]
            }
            &__footer{
                  @apply flex justify-between h-[47px];
            }
            &__my-btn{
                  @apply h-[33px] rounded-[100px];
            }
            &__container{
                  @apply flex flex-col justify-between h-[100%];
            }
            &__select-label{
                  font-weight: 600;
            }
            &__input-container{
                  @apply flex flex-col gap-[18px]
            }
            &__input-item{
                  @apply flex flex-col gap-[10px];
            }
      }
</style>