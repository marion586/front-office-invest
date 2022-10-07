<template>
    <div class="list">
        <div class="list__container">
            <Filter @on-show-cart="showCart" />
            <div v-if="isListCards" class="list__container-product">
                <CardProducts :DataCard="dataCard" />
            </div>

            <figure
                @click="showInfo"
                v-if="isShowCart"
                class="list__container-cart"
            >
                <img src="../../assets/Rectangle.png" alt="" />
            </figure>

            <div v-if="isShowInfo" class="list__container-information">
                <div>
                    <ProductInfo :DataCard="singleCard" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CardProducts from './CardProducts/CardProducts.vue';

    import { provide, ref } from 'vue';
    import Filter from './Filter/Filter.vue';
    import ProductInfo from './ProductInfo/ProductInfo.vue';
    import DataProps from '@/components/Display/productCard/CardType';
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

    const singleCard = ref<DataProps[]>([dataCard.value[0]]);

    let isShowCart = ref<boolean>(false);
    let isListCards = ref<boolean>(true);
    let isShowInfo = ref<boolean>(false);

    provide('isInfo', isShowInfo);
    const showCart = () => {
        isShowCart.value = !isShowCart.value;
        isListCards.value = !isListCards.value;
    };
    const showInfo = () => {
        isShowInfo.value = !isShowInfo.value;
        isShowCart.value = false;
        isListCards.value = false;
    };

    let filterObject = ref<object>({ isShowCart, isListCards, isShowInfo });
    provide('filterObject', filterObject);
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
