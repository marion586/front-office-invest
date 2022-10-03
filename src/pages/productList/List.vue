<template>
    <div
        class="card-wrapper grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
        <CardProducts />
    </div>
</template>

<script setup lang="ts">
    import CardProducts from './cardProducts/CardProducts.vue';
</script>

<style lang="scss">
    .card-wrapper {
        padding: 40px;
    }
</style>
