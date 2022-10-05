<template>
    <button @click="$emit('click')" :class="`button__${type}`" :type="htmlType">
        <slot />
    </button>
</template>

<script setup lang="ts">
    interface Props {
        type?: string;
        htmlType?: 'button' | 'submit' | 'reset';
        width?: string;
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
            border-radius: 20px;
        }
    }
</style>
