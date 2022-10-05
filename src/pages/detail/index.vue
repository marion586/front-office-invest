<template>
    <div class="detail">
        <BreadCrumb class="relative mb-2" :items="breadcrumbs" />
        <div class="detail__head">
            <img
                src="../../assets/logo.png"
                alt=""
                class="object-cover detail__img"
            />
            <HeadProduct
                label="Immo"
                Text="testText"
                class="detail__headProductBg"
                data-test="headProduct"
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
                <span class="detail__adresseDetail"
                    ><span>Icon</span> 38, 1000 Brussel, Belgium</span
                >
                <div class="detail__caracteristics">
                    <span class="detail__iconCaracteristics"
                        >Icon <span>2</span></span
                    >
                    <span class="detail__iconCaracteristics"
                        >Icon <span>2</span></span
                    >
                    <span class="detail__iconCaracteristics"
                        >Icon <span>30 m²</span></span
                    >
                </div>
            </div>
            <hr class="my-[10px]" />
            <ButtonDetail/>
        </div>
        <span>qsmldf</span>
        <router-view />
    </div>
</template>
<script setup>
    import { defineComponent, computed } from '@vue/runtime-core';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import HeadProduct from '@/components/Display/headProduct/HeadProduct.vue';
    import ButtonDetail from '@/pages/detail/component/ButtonDetail.vue';


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
        &__head {
            position: relative;
            height: 280px;
            // background-color: gray;
        }
        &__headProductBg {
            background: rgba(96, 96, 96, 0.25);
            padding: 8px 10px;
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
        }
        &__botText {
            position: absolute;
            bottom: 0;
            margin: 0 0 15px 15px;
            background-color: #14223c;
            border-radius: 4px;
            padding: 4px 8px;
            @apply text-white;
        }
        &__txtDetail {
            border-radius: 8px;
            background-color: #ffffff;
            margin: 0 10px 0 10px;
            padding: 10px;
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
            color: #606060;
            font-style: normal;
            font-weight: 300;
            font-size: 14px;
            line-height: 17px;
        }
        &__caracteristics {
            display: flex;
            flex-direction: row;
            margin: 30px 0 25px 0;
        }
        &__iconCaracteristics {
            margin: 0 12px 0 15px;
        }
    }
</style>
