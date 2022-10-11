<template>
    <ProductCard
        v-for="(card, index) in DataCard"
        :DataCard="card"
        :key="index"
    />
</template>

<script setup lang="ts">
    import ProductCard from '@/components/Display/ProductCard/ProductCard.vue';
    import { PropType, ref } from 'vue';
    import CardType from '@/components/Display/productCard/CardType';

    defineProps({
        DataCard: {
            type: Object as PropType<CardType[]>,
            required: true,
        },
    });
</script>
