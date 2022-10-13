<template>
    <div>
        <button
            :disabled="disabled"
            @click="!disabled ? $emit('on-click') : () => {}"
            :class="`button__${typeButton} ${disabled ? '--disabled' : ''}`"
            :type="htmlType"
        >
            <slot />
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, PropType } from 'vue';

    interface Props {
        // typeButton?: {
        //     type: string;
        //     default: 'primary';
        // };
        // htmlType?: 'button' | 'submit' | 'reset';
        // width?: string;
        // disabled?: boolean;
        // theme?: 'light' ;
    }

    const theme = ref<{
        color: string;
        backgroundColor: string;
        backgroundColorDisabled: string;
    }>({
        color: '#fff',
        backgroundColor: 'var(--color-primary)',
        backgroundColorDisabled: 'rgb(148 159 181 / 77%)',
    });

    const props = defineProps({
        typeButton: {
            type: String as PropType<'primary' | 'secondary'>,
            default: 'primary',
        },
        htmlType: {
            type: String as PropType<'button' | 'submit' | 'reset'>,
            default: 'button',
        },
        width: String,
        disabled: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String as PropType<'light'>,
        },
    });

    onMounted(() => {
        if (props.theme === 'light') {
            theme.value = {
                color: 'var(--color-secondary)',
                backgroundColor: 'var(--color-gray)',
                backgroundColorDisabled: 'grey',
            };
        }
    });
</script>

<style lang="scss" scoped>
    button {
        width: v-bind(width);
        font-size: 14px;
        padding: 6px 20px;
        background-color: v-bind('theme.backgroundColor');
        color: v-bind('theme.color');
        font-weight: 500;
        &:disabled {
            background-color: v-bind('theme.backgroundColorDisabled');
            &:hover {
                cursor: not-allowed;
            }
        }
    }
    .button {
        &__primary {
            border-radius: 4px;
        }
        &__secondary {
            border-radius: 50px;
        }
        &__border {
            border-radius: 50px;
            background-color: #fff;
            border: 1px solid var(--color-primary);
            color: var(--color-primary);
        }
    }
</style>
