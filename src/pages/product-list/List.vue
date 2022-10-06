<template>
    <div class="list">
        <div class="list__container">
            <Filter />
            <div class="list__container-product">
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
    .list {
        @apply container;
        &__container {
            @apply flex flex-col py-5 gap-4;
            &-product {
                @apply grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4;
            }
        }
    }
</style>
