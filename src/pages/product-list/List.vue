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
            <p v-if="dataCard.length == 0" class="list__container-spinner">
                Loading ...
            </p>
            <div
                v-if="isListCards && dataCard.length > 0"
                class="list__container-product"
            >
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
                    <ProductInfo
                        @on-show-cart="showCart"
                        :DataCard="dataCard[0]"
                    />
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
    import { Http } from '@/services/http';
    import { geocode } from '@/composables/google-maps-api';
    let dataCard = reactive<DataProps[]>([]);

    let isShowCart = ref<boolean>(false);
    let isListCards = ref<boolean>(true);
    let isShowInfo = ref<boolean>(false);
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

    const parseData = (data: DataProps[]): void => {
        data.forEach((element: DataProps) => {
            dataCard.push({
                id: element.id,
                propertyImages: element.propertyImages,
                propertyType: element.propertyType,
                prices: +element.prices,
                roomcount: +element.roomcount,
                bedroomcount: +element.bedroomcount,
                surface: +element.surface,
                address: element.address,
                user: element.user,
                title: element.title,
            });
        });
    };
    const getProductList = async (): Promise<void> => {
        try {
            const { data } = await Http.get('/the_property/list');
            parseData(data);
        } catch (error) {
            console.log(error);
        }
    };
    onMounted(() => {
        const proomise = geocode('Bruxelles Belgique');
        proomise.then((result) => {
            return (
                (data.isMapReady = true),
                data.PlaceCoordinates.push(result.coordinates)
            );
        });

        getProductList();
    });
    const handleSelect = (value: any): void => {
        console.log(value);
        if (value.select === 'Prix asc') {
            dataCard = dataCard.sort((a, b) => a.prices - b.prices);
            console.log(dataCard);
        } else {
            dataCard = dataCard.sort((a, b) => b.prices - a.prices);
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
        }
    }
</style>
