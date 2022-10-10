<template>
    <a-select
        :options="(options as DefaultOptionType[])"
        @change="handleChange"
        :placeholder="placeholder"
        class="select"
        :disabled="disabled"
    >
        <template #suffixIcon>
            <ArrowBottom />
        </template>
    </a-select>
</template>

<script setup lang="ts">
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import ASelect, {
        DefaultOptionType,
        SelectValue,
    } from 'ant-design-vue/lib/select';
    import { ref, onMounted } from 'vue';

    interface Props {
        options?: SelectValue;
        name: string;
        placeholder?: string;
        disabled?: boolean;
    }

    const currentSelectedValue = ref<SelectValue>();

    const selectProps = defineProps<Props>();

    const emit = defineEmits<{
        (event: 'change', e: object): void;
    }>();

    const handleChange = (value: SelectValue) => {
        currentSelectedValue.value = value;
        const selectValue: object = {
            [selectProps.name]: value,
        };

        emit('change', selectValue);
    };
</script>

<style lang="scss" scoped>
    .select {
        width: 100%;
        &:deep() {
            .ant-select-selector {
                border: 1px solid var(--color-stroke-gray);
                font-size: 14px;
                height: 38px;
                border-radius: 4px;
                @apply flex items-center;
            }
            .ant-select-selection-placeholder {
                @apply flex items-center;
            }
        }
    }
</style>
