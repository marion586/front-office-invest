<template>
    <button
        :disabled="disabled"
        @click="!disabled && $emit('on-click')"
        :class="`button__${type} ${disabled ? 'disabled' : ''}`"
        :type="htmlType"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
    interface Props {
        type?: string;
        htmlType?: 'button' | 'submit' | 'reset';
        width?: string;
        disabled?: boolean;
    }

    defineProps<Props>();
</script>

<style lang="scss" scoped>
    button {
        width: v-bind(width);
        font-size: 14px;
        padding: 6px 20px;
        background-color: var(--color-primary);
        color: #fff;
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
