<template>
    <div class="container">
        <div class="card-wrapper">
            <CardProducts />
        </div>
    </div>
</template>

<script setup lang="ts">
    import CardProducts from './CardProducts/CardProducts.vue';
</script>

<style lang="scss" scoped>
    .card-wrapper {
        padding: 40px;
        @apply grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4;
    }
</style>
