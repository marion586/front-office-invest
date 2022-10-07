<script setup lang="ts">
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import DataProps from '@/components/Display/productCard/CardType';
    import { PropType } from 'vue';
    import Filter from '../Filter/Filter.vue';

    defineProps({
        DataCard: {
            type: Object as PropType<DataProps[]>,
            required: true,
        },
    });
</script>

<template>
    <div class="product-info">
        <div class="product-info__left">
            <ProductCard :DataCard="DataCard[0]" />
        </div>

        <div class="product-info__right">
            <Filter />
            <figure>
                <img src="../../../assets/Rectangle.png" alt="" />
            </figure>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .product-info {
        @apply grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-2;
        &__left {
            @apply col-span-1;
        }
        &__right {
            @apply col-span-2 sm:col-span-2  md:col-span-2   flex flex-col gap-2;
        }
    }
</style>
