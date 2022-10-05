<template>
    <a-select
        :options="options"
        @change="() => handleChange"
        :placeholder="placeholder"
        class="select"
    >
        <template #suffixIcon>
            <ArrowBottom />
        </template>
    </a-select>
</template>

<script setup lang="ts">
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import ASelect from 'ant-design-vue/lib/select';

    interface Props {
        options: Array<object>;
        name: string;
        placeholder?: string;
    }

    const selectProps = defineProps<Props>();

    const emit = defineEmits<{
        (event: 'change', e: object): void;
    }>();

    const handleChange = (value: string) => {
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
            }
            .ant-select-selection-placeholder {
                @apply flex items-center;
            }
        }
    }
</style>
