<script lang="ts" setup>
    import { ref, defineEmits } from 'vue';
    import {
        data,
        footer,
    } from '@/pages/addProduct/components/PropertyType/data';
    import SelectInput from '@/components/Common/Select/Select.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';

    const element = ref<Array<any>>(data);
    const emit = defineEmits(['onNext', 'onNext']);

    function onClickNext() {
        emit('onNext');
    }

    function handleChangeDate(date :string){
        console.log("date : ", date);
    }
</script>

<template>
    <div class="info__container">

        <TextArea 
            label="zaza"
            name-input="zaza"
        />

        <div class="info__body">
            <div class="info__input-container">
                <div class="info__input-item" :class="[item.subOptions ? 'info__have-subsection' :'']" v-for="item in element" :key="item.id">
                    <div class="info__input">
                        <SelectInput
                            v-if="item.type === 'select'"
                            :label="item.label"
                            :name="item.name"
                            :options="item.options"
                            :placeholder="item.placeholder"
                            required
                        />
                        <Switch
                                :item-label="item.label"
                                v-else-if="item.type === 'switch'"
                        />
                        <div 
                            class="info__file" 
                            v-if="item.type === 'file'"
                        >
                            +
                        </div>
                    </div>
                    <div class="info__sub" v-for="sub in item.subOptions">
                        <InputDate
                            :label="sub.label"
                            @handleChange="handleChangeDate"
                        />
                    </div>
                </div>
            </div>
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
            height: 100%;
            overflow-y: auto;
            @apply flex flex-col justify-between;
        }
        &__select-label {
            font-weight: 600;
        }
        &__input-container {
            @apply flex flex-col gap-[10px];
        }
        &__input-item {
            @apply flex flex-col gap-[10px];
        }
        &__have-subsection{
            @apply flex flex-wrap;
            flex-direction: unset;
        }
        &__input{
            @apply flex md:flex-1 w-[100%];
        }
        &__sub{
            @apply flex md:flex-1 w-[100%];
        }
        &__file{
            @apply w-[150px] h-[150px] rounded-md bg-slate-200 flex justify-center items-center;
        }
    }
    .custom-select__wrapper{
        @apply w-[100%];
    }
</style>
