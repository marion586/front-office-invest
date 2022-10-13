<script setup lang="ts">
import ARadio from "ant-design-vue/lib/radio/Radio";
import ARadioGroup from 'ant-design-vue/lib/radio/Group';


defineProps({
    radioDefaultCheck: {
        type: String,
        default: null
    },
    disabled: {
            type: Boolean,
            default: false,
        },
    element: {
        type: Array <any>,
        default() {
            return [];
        },
    },
    name: {
        type: String,
        default: '',
    },
    align: {
        type: String,
        default: '',
    },

    classLabelRadio: {
        type: String,
        default: ''

    },
    defaultClass: {
        type: String,
        default: 'app-radio-group'
    }
});



const emit = defineEmits<{
        (event: 'get-radio-input', e: any): void;
    }>();

    const handleRadio = (value: any) => {

        emit('get-radio-input', value);
    };

</script>


<template>
    <div :class="[defaultClass, align]">
        <a-radio-group
            :name="name"
            v-model:value="radioDefaultCheck"
            @change="handleRadio"
            :disabled="disabled"
        >
            <a-radio
                v-for="(radio, index) in element"
                :key="index"
                :value="radio.value"
            >

                <span :class="[ classLabelRadio ? classLabelRadio : 'app-radio-value' ]">{{ radio.label }}</span>
               
            </a-radio>
        </a-radio-group>
    </div>
</template>


<style lang="scss" scoped>
.ant-radio-wrapper {
    &:deep(){
        display: flex;
    }
}
span.app-radio-value {
    &:deep(){
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
    }
}

.horizontal .ant-radio-group{
    &:deep(){
        display: flex ;
        gap: 40px;
    }
}

// .ant-radio-wrapper:hover .ant-radio, .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner
:deep(.ant-radio-inner, .ant-radio-checked){
    border: 1px double var(--color-primary);
    &:hover{
        border-color: var(--color-primary);
    }
    &::after{
        background-color: var(--color-primary);
    }
}


</style>