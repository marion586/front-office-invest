<script lang="ts" setup>
    import { ref, defineEmits } from 'vue';
    import {
        data,
        footer,
    } from '@/pages/addProduct/components/PropertyType/data';
    import SelectInput from '@/components/Common/Select/Select.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';

    const element = ref<Array<any>>(data);
    const emit = defineEmits(['onNext', 'onNext']);

    function onClickNext() {
        emit('onNext');
    }

    function getValue(value : boolean){
      console.log("########\n", value);
      
    }
</script>

<template>
    <div class="info__container">
        <div class="info__body">
            <Switch 
                  @switch-value="getValue"
            />
            <p class="info__title">Type d'annonces :</p>
            <hr class="info__divider" />
            <div class="info__input-container">
                <div class="info__input-item" v-for="item in element">
                    <SelectInput
                        v-if="(item.type = 'select')"
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
                <p>{{ itemFooter.title }}</p>
            </div>
            <Button class="info__my-btn" @click="onClickNext"> Suivant </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .info {
        &__title {
            font-weight: 600;
        }
        &__divider {
            @apply my-[18px];
        }
        &__footer {
            @apply flex justify-between h-[67px] md:h-[47px] flex flex-col md:flex-row mt-[20px];
        }
        &__my-btn {
            @apply h-[33px] rounded-[100px] w-[100%] md:w-[110px];
        }
        &__container {
            @apply flex flex-col justify-between h-[100%];
        }
        &__select-label {
            font-weight: 600;
        }
        &__input-container {
            @apply flex flex-col gap-[18px];
        }
        &__input-item {
            @apply flex flex-col gap-[10px];
        }
    }
</style>
