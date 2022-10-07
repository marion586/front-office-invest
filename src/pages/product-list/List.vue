<template>
    <div class="list">
        <div class="list__container">
            <Filter @on-show-cart="showCart" />
            <div v-if="isListCards" class="list__container-product">
                <CardProducts :DataCard="dataCard" />
            </div>

            <Map
                @click="showInfo"
                v-if="isShowCart"
                class="my-map"
                :mapCenterCoordinate="data.PlaceCoordinates"
                :needMarkerLayer="true"
                :markersCoordinates="data.PlaceCoordinates"
            />

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

    import { onMounted, provide, reactive, ref } from 'vue';
    import Filter from './Filter/Filter.vue';
    import ProductInfo from './ProductInfo/ProductInfo.vue';
    import DataProps from '@/components/Display/productCard/CardType';
    import Map from '@/components/section/map/index.vue';
    import {
        geocode,
        removeScript,
        autocomplet,
    } from '@/composables/google-maps-api';

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
    const data = reactive({
        isMapReady: false,
        PlaceCoordinates: [],
        fields: [
            {
                id: 'propertyType',
                placeholder: 'type de bien',
                options: [],
                class: 'w-full',
                handler: () => {},
            },
            {
                id: 'propertyLocation',
                placeholder: 'Ou se trouve le bien ?',
                options: [],
                class: 'w-full',
                handler: () => {},
            },
            {
                id: 'minPrice',
                placeholder: 'Prix min',
                options: [],
                class: 'w-1/2',
                handler: () => {},
            },
            {
                id: 'maxPrice',
                placeholder: 'Prix max',
                options: [],
                class: 'w-1/2',

                handler: () => {},
            },
        ],
    });
    onMounted(() => {
        const proomise = geocode('Bruxelles Belgique');
        proomise.then((result) => {
            console.log(result);
            (data.isMapReady = true),
                data.PlaceCoordinates.push(result.coordinates);
        });
    });
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
        .my-map {
            height: 478px;
            width: 100%;
            border-radius: 8px;
        }
    }
</style>
