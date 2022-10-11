<template>
    <div>
        <button
            :disabled="disabled"
            @click="!disabled && $emit('on-click')"
            :class="`button__${type ?? 'primary'} ${
                disabled ? '--disabled' : ''
            }`"
            :type="htmlType"
        >
            <slot />
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    interface Props {
        type?: {
            type: string;
            default: 'primary';
        };
        htmlType?: 'button' | 'submit' | 'reset';
        width?: string;
        disabled?: boolean;
        theme?: 'light' | undefined;
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

    const props = defineProps<Props>();

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
        &:disabled {
            background-color: v-bind('theme.backgroundColorDisabled');
            &:hover {
                cursor: not-allowed;
            }
        }
        width: v-bind(width);
        font-size: 14px;
        padding: 6px 20px;
        background-color: v-bind('theme.backgroundColor');
        color: v-bind('theme.color');
        font-weight: 500;
    }
    .button {
        &__primary {
            border-radius: 4px;
        }
        &__secondary {
            border-radius: 50px;
        }
    }
</style>
