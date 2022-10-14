<template>
    <div class="list">
        <div class="list__container">
            <Filter
                :class="`${isShowInfo ? 'list__container-filter' : ''}`"
                @on-show-cart="showCart"
                @on-show-card="showCard"
                @on-show-info="showInfo"
                @change-select="handleSelect"
            />
            <Loader v-if="dataCard.length == 0" />
            <div
                v-if="isListCards && dataCard.length > 0"
                class="list__container-product"
            >
                <CardProducts :DataCard="dataCard" />
            </div>

            <Map
                v-if="isShowCart"
                class="my-map"
                :mapCenterCoordinate="mapData[0]"
                :needMarkerLayer="true"
                :markersCoordinates="mapData"
                @touched="testEvent"
            />

            <div v-if="isShowInfo" class="list__container-information">
                <div>
                    <ProductInfo
                        @on-show-cart="showCart"
                        :DataCard="singleData"
                        @touched="testEvent"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CardProducts from './CardProducts/CardProducts.vue';
    import { onMounted, provide, reactive, ref, computed } from 'vue';
    import Filter from './Filter/Filter.vue';
    import ProductInfo from './ProductInfo/ProductInfo.vue';
    import Map from '@/components/section/map/index.vue';
    import { Store, useStore } from 'vuex';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const store: Store<any> = useStore();
    let dataCard = ref<any>([]);
    let isShowCart = ref<boolean>(false);
    let isListCards = ref<boolean>(true);
    let isShowInfo = ref<boolean>(false);
    let singleData = reactive<any>({});
    const showCard = () => {
        isShowCart.value = false;
        isListCards.value = true;
        isShowInfo.value = false;
    };

    provide('isInfo', isShowInfo);
    const showCart = () => {
        isShowCart.value = true;
        isListCards.value = false;
        isShowInfo.value = false;
    };
    const showInfo = () => {
        isShowInfo.value = true;
        isShowCart.value = false;
        isListCards.value = false;
    };
    const testEvent = (marker: any) => {
        console.log(marker);
        const d = dataCard.value.find(
            (item: any) =>
                item.latitude == marker.lat && item.longitude == marker.lng
        );
        Object.assign(singleData, d);
        showInfo();
    };

    let filterObject = ref<object>({ isShowCart, isListCards, isShowInfo });

    provide('filterObject', filterObject);

    const data: any = reactive({
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
    const mapData = computed(
        () => store.getters['ProductsListModule/getMapData']
    );

    onMounted(async () => {
        await store.dispatch('ProductsListModule/setData');
        const data = computed(
            () => store.getters['ProductsListModule/getProductsListData']
        );
        dataCard.value = [...data.value];
    });
    const handleSelect = (value: any): void => {
        console.log(value);
        if (value.select === 'Prix asc') {
            dataCard.value = dataCard.value.sort(
                (a: any, b: any) => a.prices - b.prices
            );
        } else {
            dataCard.value = dataCard.value.sort(
                (a: any, b: any) => b.prices - a.prices
            );
        }
    };
</script>

<style lang="scss" scoped>
    .list {
        @apply container;
        &__container {
            @apply flex flex-col py-5 gap-4;
            &-product {
                @apply grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4;
            }
            &-filter {
                @apply hidden sm:hidden md:hidden lg:flex;
            }
            &-spinner {
                height: 70vh;
                font-size: 20px;
                @apply flex flex-col justify-center items-center;
            }
        }
        .my-map {
            height: 80vh;
            width: 100%;
            border-radius: 8px;
            z-index: 9;
        }
    }
</style>
