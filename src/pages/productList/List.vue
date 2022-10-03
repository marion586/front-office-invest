<template>
    <div
        class="card-wrapper grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
        <CardProducts />
    </div>
</template>

<script setup lang="ts">
    import CardProducts from './cardProducts/CardProducts.vue';
</script>

<style lang="scss" scoped>
    .card-wrapper {
        padding: 40px;
    }
</style>
