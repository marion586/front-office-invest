<template>
    <div class="container-list-card">
        <ProductCard />
        <ProductCard />
    </div>
</template>

<script setup lang="ts">
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
</script>

<style lang="scss">
    .container-list-card {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: space-between;
        padding: 20px;
    }
</style>
