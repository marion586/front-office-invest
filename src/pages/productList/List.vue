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

<style lang="scss">
    .container-list-card {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: space-between;
        padding: 20px;
        @apply container;
    }
</style>
