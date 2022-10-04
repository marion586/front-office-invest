<template>
    <button @click="$emit('click')" :class="`button__${type}`">
        <slot />
    </button>
</template>

<script lang="ts" setup>
    defineProps({
        type: {
            type: String,
            default: 'primary',
        },
        width: {
            type: String,
            default: 'auto',
        },
    });
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
