<template>
    <BreadCrumb class="relative mb-2" :items="breadcrumbs" />
    <div class="detail">
        <div class="w-full">
            <transition name="fade">
                <component v-if="!showDoc" :is="activeView" @return="closeLiveVideo" />
            </transition>
            <transition name="fade">
                <DetailedInfo v-if="showInfo" @hideInfo="hide" />
            </transition>
            <transition name="fade">
                <RelateDocument v-if="showDoc" @return="returnToMain" />
            </transition>

            <div class="flex flex-col detail__txtDetail">
                <ButtonDetail
                    v-if="!showLocationBtn"
                    width="500px"
                    class="detail__btnList"
                    @clickChangeView="changeView"
                />
                <ButtonLocation
                    v-if="showLocationBtn"
                    @return="showLocationBtn = false"
                    @gotoMap="locationFn"
                />
                <div class="detail__btnContainer">
                    <Button class="detail__btnOffer" @click="gotoOffer">Faire un offre</Button>
                    <Button
                        theme="light"
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
    import { computed, shallowRef, ref, onMounted } from '@vue/runtime-core';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import ButtonDetail from '@/pages/detail/components/buttonDetail/ButtonDetail.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import MainDetail from '@/pages/detail/components/mainDetail/MainDetail.vue';
    import ProductCards from '@/pages/product-list/CardProducts/CardProducts.vue';
    import LiveVideo from '@/pages/detail/components/liveVideo/LiveVideo.vue';
    import DetailedInfo from '@/pages/detail/components/detailedInfo/DetailedInfo.vue';
    import RelateDocument from '@/pages/detail/components/RelateDocument/RelateDocument.vue';
    import ButtonLocation from '@/pages/detail/components/Location/ButtonLocation.vue';
    import { useRoute, useRouter } from 'vue-router';

    import { Store, useStore } from 'vuex';

    // route
    const route = useRoute();
    const router = useRouter();

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
        RelateDocument,
        ButtonLocation,
    };

    //dynamic component data
    const activeView = shallowRef<string>(viewList['MainDetail']);
    //screen size
    const screenType = ref<string | number>(screen.width);
    //detailedInfo
    let showInfo = ref<boolean>(false);
    //relateDocument
    let showDoc = ref<boolean>(false);
    //location
    let showLocationBtn = ref<boolean>(false);
    //property list
    let showProductCard = ref<boolean>(false);
    //data card
    const store: Store<any> = useStore();
    let dataCard = ref<any>([]);
    // onMounted(async () => {
    //     await store.dispatch('ProductsListModule/setData');
    //     const data = computed(
    //         () => store.getters['ProductsListModule/getProductsListData']
    //     );
    //     dataCard.value = [...data.value];
    // });
    function locationFn(item: any) {
        console.log('url', item);
        switch (item.case) {
            case 'parcelleCadastrale':
                console.log(item.url);
                router.push('/detail/cadastre');
                break;

            default:
                break;
        }
    }
    function gotoOffer():void{
        router.push("/faire-une-offre")
    }

    function changeView(view: any) {
        // showInfo.value = false;
        console.log('view:', view);
        // console.log('activeView:', activeView.value);
        switch (view) {
            case 'LiveVideo':
                console.log('show live video', showInfo.value);
                showInfo.value = false;
                activeView.value = viewList['LiveVideo'];
                break;
            case 'DetailedInfo':
                showInfo.value = !showInfo.value;
                console.log('show info:', showInfo.value);
                break;
            case 'RelateDocument':
                showDoc.value = !showDoc.value;
                break;
            case 'location':
                showLocationBtn.value = !showLocationBtn.value;
                break;
            default:
                showInfo.value = false;
                activeView.value = viewList['MainDetail'];
                break;
        }
    }
    //close detailedInfo
    function hide(): void {
        console.log('last');
        showInfo.value = false;
    }
    function closeLiveVideo(): void {
        activeView.value = viewList['MainDetail'];
    }
    //close relateDoc
    function returnToMain(): void {
        showDoc.value = false;
    }
    function showDetail(): void {
        showInfo.value = !showInfo.value;
    }
    //close|open list card
    function showProduct(): void {
        showProductCard.value = !showProductCard.value;
    }
    function showRelateDoc(): void {
        showDoc.value = !showDoc.value;
    }
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
        .button {
            @apply w-full;
        }
        &__btnOffer {
            &:deep() {
                .button__primary {
                    width: 100%;
                }
            }
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
