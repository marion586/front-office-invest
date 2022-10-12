<template>
    <BreadCrumb class="relative mb-2" :items="breadcrumbs" />
    <div class="detail">
        <div>
            <transition name="fade">
                <component :is="activeView" />
            </transition>
            <transition name="fade">
                <DetailedInfo v-if="showInfo" @hideInfo="hide" />
            </transition>
            <div class="flex flex-col detail__txtDetail">
                <ButtonDetail
                    class="detail__btnList"
                    @clickChangeView="changeView"
                />
                <div class="detail__btnContainer">
                    <Button class="detail__btnOffer">Faire un offre</Button>
                    <Button
                        v-if="screenType < 1024"
                        class="detail__btnOffer"
                        @click="showProduct"
                        >Bien similaire</Button
                    >
                </div>
            </div>
        </div>
        <div>
            <ProductCards v-if="showProductCard" :DataCard="dataCard" />
        </div>
        <router-view />
    </div>
</template>
<script setup lang="ts">
    // @changeViewDetailedInfo="showDetailedInfo"

    import { computed, shallowRef, ref } from '@vue/runtime-core';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import ButtonDetail from '@/pages/detail/components/buttonDetail/ButtonDetail.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import MainDetail from '@/pages/detail/components/mainDetail/MainDetail.vue';
    import ProductCards from '@/pages/product-list/CardProducts/CardProducts.vue';
    import LiveVideo from '@/pages/detail/components/liveVideo/LiveVideo.vue';
    import DetailedInfo from '@/pages/detail/components/detailedInfo/DetailedInfo.vue';

    // @click="showDetailedInfo"
    //

    const breadcrumbs = computed(() => {
        return [
            {
                label: 'Immo',
            },
            {
                label: 'A',
                url: '/Detail/A',
            },
            {
                label: 'B',
                url: '/Detail/B',
            },
        ];
    });
    const viewList: string[] | any = {
        MainDetail,
        LiveVideo,
        DetailedInfo,
    };
    const dataCard = ref([
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

    //dynamic component data
    const activeView = shallowRef<string>(viewList['MainDetail']);
    //screen size
    const screenType = ref<string | number>(screen.width);
    //detailedInfo
    let showInfo = ref<boolean>(false);
    //property list
    let showProductCard = ref<boolean>(false);

    function changeView(view: any) {
        console.log('view:', view);
        console.log('activeView:', activeView.value);
        switch (view) {
            case 'LiveVideo':
                showInfo.value = false;
                activeView.value = viewList['LiveVideo'];
                break;
            case 'DetailedInfo':
                showInfo.value = !showInfo.value;
            default:
                activeView.value = viewList['MainDetail'];
                break;
        }
    }
    function hide(): void {
        console.log("last")
        showInfo.value = false;
    }
    // function showDetailedInfo(component?: string): void {
    //     console.log('component:', component);
    //     if (component === 'DetailedInfo') {
    //         //reset view to default
    //         changeView('MainDetail');
    //         showInfo.value = !showInfo.value;
    //     }
    // }

    function showProduct(): void {
        showProductCard.value = !showProductCard.value;
    }
    // console.log('BtnList:', btnList);
</script>

<style lang="scss" scoped>
    .detail {
        //responsive 1024px
        @apply lg:bg-white lg:rounded-lg lg:mx-4 lg:mt-0 lg:mb-4 lg:p-3 lg:flex lg:flex-row;

        &__txtDetail {
            @apply rounded bg-[#ffffff] mr-[10px] mb-0 ml-[10px] p-[10px];
            //responsive 1024px
            @apply lg:mt-[18px] lg:mx-5 lg:shadow-[4px_4px_8px_rgba(0,0,0,0.05)];
        }

        &__btnList {
            padding: 0;
        }
        &__btnContainer {
            display: flex;
            flex-direction: column;
            gap: 5px;
            justify-content: center;
            @apply lg:flex lg:flex-row;
        }
        &__btnOffer {
            @apply rounded text-sm font-semibold w-full;
            @media (min-width: 1024px) {
                width: 367px;
            }
        }

        //responsive
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
