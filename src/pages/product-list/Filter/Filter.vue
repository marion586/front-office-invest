<template>
    <div class="filter">
        <div class="filter__left">
            <slot name="left"></slot>
        </div>

        <div class="filter__right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    .filter {
        @apply flex items-center justify-between px-4 py-3;
        background-color: white;
        border-radius: 8px;

        &__left {
            @apply flex flex-col sm:self-start gap-2;
        }
        &__right {
            @apply flex flex-col items-end gap-2;
        }
    }
</style>
