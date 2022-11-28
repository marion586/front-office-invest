<template>
    <div class="custom-input__fields">
        <label
            ><span v-if="required" class="custom-input__fields--required"
                >*</span
            >{{ label }}</label
        >
        <a-input
            @keyup="hanldeKeyup"
            :disabled="disabled"
            :id="id"
            style=""
            :placeholder="placeholder"
            :type="inputType"
            :name="nameInput"
            @input="handleInput"
            @change="handleChange"
            :value="value"
            :addon-before="addonBefore"
        >
        </a-input>
        <transition mode="in-out" name="fade-error">
            <p v-if="hasError?.status">
                <small class="custom-input__fields--error">{{
                    hasError?.errorMsg
                }}</small>
            </p>
        </transition>
    </div>
</template>

<script lang="ts" setup>
    import AInput from 'ant-design-vue/lib/input';
    import { PropType, ref, watch } from 'vue';

    interface IHasError {
        borderColor: string | number;
        placeholderColor: string | number;
    }
    interface IHasErrorProps {
        status: boolean;
        errorMsg: string;
    }

    const initialErrorState: IHasError = {
        borderColor: 'var(--color-stroke-gray)',
        placeholderColor: '#c7c7c7',
    };
    const errorTheme = ref<IHasError>({ ...initialErrorState });
    const props = defineProps({
        id: {
            type: String,
        },
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        model: {
            type: String,
            default: '',
        },
        nameInput: {
            type: String,
            default: '',
        },
        hasError: {
            type: Object as PropType<IHasErrorProps>,
            required: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        inputType: {
            type: String,
            default: 'text',
        },
        value: {
            type: [Number, String],
        },
        disabled: Boolean,
        addonBefore: String,
    });

    watch(
        () => props.hasError,
        () => {
            if (props.hasError?.status) {
                errorTheme.value = {
                    borderColor: 'salmon',
                    placeholderColor: 'salmon',
                };
            } else {
                errorTheme.value = { ...initialErrorState };
            }
        }
    );

    const emit = defineEmits<{
        (event: 'on-input', value: object): void;
        (event: 'change'): void;
        (event: 'keyup', value: object): void;
    }>();

    const handleInput = (event: Event) => {
        emit('on-input', event);
    };

    const handleChange = () => {
        emit('change');
    };

    function hanldeKeyup(e: Event) {
        const value: string = (e.target as HTMLInputElement).value;
        if (props.inputType === 'number' && Number.isNaN(value)) {
            e.preventDefault();
        }
    }
</script>

<style lang="scss" scoped>
    .custom-input__fields {
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

        &:deep() {
            .ant-input {
                border: 1px solid v-bind('errorTheme.placeholderColor');
                font-size: 14px;
                height: 33px;
                border-radius: 4px;
                &::placeholder {
                    font-size: 14px;
                    font-weight: 300;
                    color: v-bind('errorTheme.placeholderColor');
                }
                &:focus {
                    box-shadow: unset;
                    border: 1px solid var(--color-primary);
                }
            }
        }
    }
</style>
