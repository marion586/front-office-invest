<template>
    <div class="custom-select__wrapper">
        <label v-if="label"
            ><span v-if="required" class="custom-select__wrapper--required"
                >*</span
            >{{ label }}</label
        >
        <a-select
            :options="(options as DefaultOptionType[])"
            @change="handleChange"
            :placeholder="placeholder"
            class="custom-select__content"
            :disabled="disabled"
            :mode="mode"
            :defaultValue="defaultValue"
        >
            <template #suffixIcon>
                <ArrowBottom />
            </template>
        </a-select>
        <transition mode="in-out" name="fade-error">
            <p v-if="hasError?.status">
                <small class="custom-select__wrapper--error">{{
                    hasError?.errorMsg
                }}</small>
            </p>
        </transition>
    </div>
</template>

<script setup lang="ts">
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import ASelect, {
        DefaultOptionType,
        SelectValue,
    } from 'ant-design-vue/lib/select';
    import { ref, watch } from 'vue';

    interface IHasError {
        borderColor: string | number;
        placeholderColor: string | number;
    }
    interface IHasErrorProps {
        status: boolean;
        errorMsg: string;
    }
    interface Props {
        options?: SelectValue;
        name: string;
        placeholder?: string;
        disabled?: boolean;
        mode?: 'multiple' | 'tags';
        defaultValue?: SelectValue;
        hasError?: IHasErrorProps;
        required?: boolean;
        label?: string;
    }

    const initialErrorState: IHasError = {
        borderColor: 'var(--color-stroke-gray)',
        placeholderColor: '#c7c7c7',
    };
    const errorTheme = ref<IHasError>({ ...initialErrorState });

    const currentSelectedValue = ref<SelectValue>();

    const selectProps = defineProps<Props>();

    const emit = defineEmits<{
        (event: 'change-select', e: object): void;
    }>();

    watch(
        () => selectProps.hasError,
        () => {
            if (selectProps.hasError?.status) {
                errorTheme.value = {
                    borderColor: 'salmon',
                    placeholderColor: 'salmon',
                };
            } else {
                errorTheme.value = { ...initialErrorState };
            }
        }
        // { immediate: true }
    );

    const handleChange = (value: SelectValue) => {
        currentSelectedValue.value = value;
        const selectValue: object = {
            [selectProps.name]: value,
        };

        emit('change-select', selectValue);
    };
</script>

<style lang="scss" scoped>
    .custom-select {
        &__wrapper {
            /* @apply mb-[18px]; */
            .fade-error-enter-active {
                transition: all 0.3s ease-in;
            }
            .fade-error-leave-active {
                transition: all 0.2s ease-out;
            }

            .fade-error-enter-from,
            .fade-error-leave-to {
                transform: translateY(-10px);
                opacity: 0;
            }
            &--required {
                color: red;
                margin-right: 5px;
            }
            &--error {
                color: salmon;
                width: 100%;
                @apply flex justify-end;
            }
            label {
                font-size: 12px;
                font-weight: 500;
                color: black;
                font-weight: bold;
                margin-bottom: 10px;
                display: block;
            }
        }
        &__content {
            width: 100%;
            &:deep() {
                .ant-select-selector {
                    .ant-select-selection-placeholder {
                        color: v-bind('errorTheme.placeholderColor');
                    }
                    border: 1px solid v-bind('errorTheme.placeholderColor');
                    font-size: 14px;
                    height: 33px;
                    border-radius: 4px;
                    @apply flex items-center;
                    &:hover {
                        border: 1px solid var(--color-stroke-gray);
                    }
                    &:focus-within {
                        box-shadow: unset !important;
                        border: 1px solid var(--color-primary) !important;
                    }
                }
                .ant-select-selection-placeholder {
                    @apply flex items-center;
                }
            }
        }
    }
</style>
