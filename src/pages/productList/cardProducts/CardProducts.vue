<template>
    <ProductCard
        :DataCard="card"
        v-for="(card, index) in dataCard"
        :key="index"
    />
</template>

<script setup lang="ts">
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import { ref } from 'vue';
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
    const dataCard = ref<DataProps[]>([
        {
            image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            type: 'Maison',
            price: 200000,
            roomCount: 1,
            bedroomCount: 1,
            surface: 400,
            interested: 1,
            offerSentCount: 1,
            adress: 'Hoedenmakerstraat 38, 1000 Brussel, Belgium',
        },
        {
            image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            type: 'Maison',
            price: 200000,
            roomCount: 1,
            bedroomCount: 1,
            surface: 400,
            interested: 1,
            offerSentCount: 1,
            adress: 'Hoedenmakerstraat 38, 1000 Brussel, Belgium',
        },
        {
            image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            type: 'Maison',
            price: 200000,
            roomCount: 1,
            bedroomCount: 1,
            surface: 400,
            interested: 1,
            offerSentCount: 1,
            adress: 'Hoedenmakerstraat 38, 1000 Brussel, Belgium',
        },
    ]);
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
