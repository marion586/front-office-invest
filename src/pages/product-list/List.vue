<template>
    <div class="container">
        <div class="container__content flex flex-col py-5 gap-4">
            <Filter />
            <div class="card-wrapper">
                <CardProducts />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CardProducts from './CardProducts/CardProducts.vue';
    import Filter from './Filter/Filter.vue';
</script>

<style lang="scss" scoped>
    .card-wrapper {
        @apply grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4;
    }
</style>
