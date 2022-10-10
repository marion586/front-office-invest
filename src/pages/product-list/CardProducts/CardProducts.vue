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
    interface DataProps {
        image: string;
        type: string;
        price: number;
        roomCount: number;
        bedroomCount: number;
        surface: number;
        interested: number;
        offerSentCount: number;
        adress: string;
    }
    defineProps({
        DataCard: {
            type: Object as PropType<DataProps[]>,
            required: true,
        },
    });
</script>
