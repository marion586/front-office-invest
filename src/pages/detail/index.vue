<template>
    <!-- <BreadCrumb class="relative mb-2" :items="breadcrumbs" /> -->
    <div class="detail">
        <div class="detail__head">
            <HeadProduct
                label="Immo"
                Text="testText"
                class="detail__headProductBg"
                data-test="headProduct"
            />
            <img
                src="../../assets/immo.jpeg"
                alt=""
                class="object-cover detail__img"
            />
            <span data-test="btnDownSide" class="detail__botText"
                >Expire dans 7 mois</span
            >
        </div>

        <div class="flex flex-col detail__txtDetail">
            <div class="flex">
                <span class="detail__propertyType" data-test="propertyType"
                    >Maison</span
                >
                <span
                    class="detail__propertyPrice ml-auto"
                    data-test="propertyPrice"
                    >200 000 £</span
                >
            </div>
            <hr class="my-[10px]" />
            <span class="detail__title">Détails</span>
            <div class="detail__details">
                <span class="detail__textsDetail" data-test="viewNumber"
                    >(0) vues</span
                >
                <span class="detail__textsDetail" data-test="propertySaved"
                    >(0) Sauvegardé</span
                >
                <span class="detail__textsDetail" data-test="offerSent">
                    (0) offre envoyée</span
                >
                <span class="detail__adresseDetail">
                    <MarkerIcon />
                    <span> 38, 1000 Brussel, Belgium</span>
                </span>
                <div class="detail__caracteristics">
                    <BedIcon />
                    <span class="detail__textCaracteristics">2</span>
                    <ToiletIcon />
                    <span class="detail__textCaracteristics">2</span>
                    <SurfaceIcon />
                    <span class="detail__textCaracteristics">30 m²</span>
                </div>
            </div>
            <hr class="my-[10px]" />
            <ButtonDetail class="detail__btnList" />
            <div class="detail__btnContainer">
                <Button class="detail__btnOffer">Faire un offre</Button>
            </div>
        </div>
        <span>qsmldf</span>
        <router-view />
    </div>
</template>
<script setup>
    import { defineComponent, computed } from '@vue/runtime-core';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import HeadProduct from '@/components/Display/headProduct/HeadProduct.vue';
    import ButtonDetail from '@/pages/detail/components/ButtonDetail.vue';
    import BedIcon from '@/components/Icon/Bed.vue';
    import ToiletIcon from '@/components/Icon/Toilet.vue';
    import SurfaceIcon from '@/components/Icon/Surface.vue';
    import MarkerIcon from '@/components/Icon/MarkerIcon.vue';
    import Button from '@/components/Common/Button/Button.vue';

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
</script>

<style lang="scss" scoped>
    .detail {
        @media (min-width: 1024px) {
            background-color: white;
            border-radius: 8px;
            margin: 0 15px 18px 15px;
            padding: 14px;
        }
        &__head {
            position: relative;
            height: 280px;

            @media (min-width: 1024px) {
                display: flex;
                flex-direction: column;
            }
        }
        &__headProductBg {
            background: rgba(96, 96, 96, 0.25);
            padding: 8px 10px;
            position: absolute;
            @media (min-width: 1024px) {
                background-color: #ffffff;
                position: initial;
                margin-bottom: 18px;
            }
        }
        .container-head {
            width: 100%;
        }
        &__img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            height: 100%;
            position: absolute;
            object-fit: cover;
            z-index: -1;
            @media (min-width: 1024px) {
                position: initial;
                z-index: 1;
                margin-left: 20px;
                margin-right: 20px;
                width: auto;
                border-radius: 8px;
            }
        }
        &__botText {
            position: absolute;
            bottom: 0;
            margin: 0 0 15px 15px;
            background-color: #14223c;
            border-radius: 4px;
            padding: 4px 8px;
            @apply text-white;
            @media (min-width: 1024px) {
                z-index: 1;
                left: 20px;
            }
        }
        &__txtDetail {
            border-radius: 8px;
            background-color: #ffffff;
            margin: 10px 10px 0 10px;
            padding: 10px;
            @media (min-width: 1024px) {
                // background-color: #000000;
                margin-top: 18px;
                box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
                margin-left: 20px;
                margin-right: 20px;
            }
        }
        &__propertyType {
            font-weight: 600;
            font-size: 16px;
        }
        &__propertyPrice {
            @apply ml-auto;
            background: rgba(255, 130, 130, 0.15);
            border-radius: 15px;
            padding: 4px 12px;
            //text
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            color: #ff8282;
        }
        &__title {
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
        }
        &__details {
            display: flex;
            flex-direction: column;
            margin-top: 15px;
            padding-left: 14px;
            border-left: 2px solid #000000;
        }
        &__textsDetail {
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            margin-bottom: 18px;
        }
        &__adresseDetail {
            display: flex;
            color: #606060;
            font-style: normal;
            font-weight: 300;
            font-size: 14px;
            line-height: 17px;
        }
        &__caracteristics {
            display: flex;
            flex-direction: row;
            margin: 18px 0 0 0;
        }
        &__iconCaracteristics {
            margin: 0 12px 0 15px;
        }
        &__textCaracteristics {
            @apply relative font-semibold mx-[12px];
            font-size: 14px;
        }
        &__btnList {
            padding: 0;
        }
        &__btnContainer {
            display: flex;
            justify-content: center;
        }
        &__btnOffer {
            @apply rounded text-sm font-semibold;
            @media (min-width: 1024px) {
                width: 367px;
            }
        }

        //responsive
    }
</style>
