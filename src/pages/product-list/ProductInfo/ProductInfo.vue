<script setup lang="ts">
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import DataProps from '@/components/Display/productCard/CardType';
    import { onMounted, onUnmounted, PropType, reactive, ref } from 'vue';
    import Filter from '../Filter/Filter.vue';
    import Map from '../../../components/section/map/index.vue';
    import {
        geocode,
        removeScript,
        autocomplet,
    } from '@/composables/google-maps-api';
    defineProps({
        DataCard: {
            type: Object as PropType<DataProps[]>,
            required: true,
        },
    });
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

    onUnmounted(() => {
        removeScript();
        autocomplet('autocomplet');
    });
</script>

<template>
    <div class="product-info">
        <div class="product-info__left">
            <ProductCard :DataCard="DataCard[0]" />
        </div>

        <div class="product-info__right">
            <Filter @on-show-cart="$emit('on-show-cart')" :isMap="true" />
            <Map
                class="my-map"
                :mapCenterCoordinate="data.PlaceCoordinates"
                :needMarkerLayer="true"
                :markersCoordinates="data.PlaceCoordinates"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .product-info {
        @apply grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-2;
        height: auto;
        &__left {
            @apply sm:col-span-2 md:col-span-2 md:justify-self-center lg:col-span-1  sm:w-full;
            height: 478px;
        }
        &__right {
            @apply col-span-1 sm:col-span-2  md:col-span-2 lg:col-span-2 xl:col-span-2   flex flex-col gap-2;
            height: 478px;
            .my-map {
                height: 478px;
                width: 100%;
                border-radius: 8px;
            }
        }
    }
</style>
