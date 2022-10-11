<template>
    <!-- <div class="detail"> -->
        <div class="detail__head">
            <HeadProduct
                label="Immo"
                Text="testText"
                class="detail__headProductBg"
                data-test="headProduct"
            />
            <img
                src="../../../assets/immo.jpeg"
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
            
        </div>
    <!-- </div> -->
</template>

<script setup lang="ts">
    import HeadProduct from '@/components/Display/headProduct/HeadProduct.vue';
    import BedIcon from '@/components/Icon/Bed.vue';
    import ToiletIcon from '@/components/Icon/Toilet.vue';
    import SurfaceIcon from '@/components/Icon/Surface.vue';
    import MarkerIcon from '@/components/Icon/MarkerIcon.vue';
</script>

<style lang="scss" scoped>
    .detail{
          @apply lg:bg-white lg:rounded-lg lg:mx-4 lg:mt-0 lg:mb-4 lg:p-3;

        &__head {
            position: relative;
            height: 280px;
            //responsive 1024px
            @apply lg:flex lg:flex-col;
        }
        &__headProductBg {
            background: rgba(96, 96, 96, 0.25);
            padding: 8px 10px;
            position: absolute;
            //responsive 1024px
            @apply lg:bg-white lg:static mb-[18px];
        }
        .container-head {
            @apply w-full;
        }

        &__img {
            @apply block ml-auto mr-auto w-full h-full absolute object-cover z-[-1];
            //responsive 1024px
            @apply lg:static lg:z-[1] lg:mx-5 lg:w-auto lg:rounded-lg;
        }
        &__botText {
            @apply absolute bottom-0 mt-0 mr-0 mb-[15px] ml-[15px] bg-[#14223c] rounded py-1 px-2 text-white;
            //responsive 1024px
            @apply lg:left-5 lg:z-[1];
        }
        &__txtDetail {
            @apply rounded bg-[#ffffff] mt-[10px] mr-[10px] mb-0 ml-[10px] p-[10px];
            //responsive 1024px
            @apply lg:mt-[18px] lg:mx-5 lg:shadow-[4px_4px_8px_rgba(0,0,0,0.05)];
        }
        &__txtDetail {
            @apply rounded bg-[#ffffff] mt-[10px] mr-[10px] mb-0 ml-[10px] p-[10px];
            //responsive 1024px
            @apply lg:mt-[18px] lg:mx-5 lg:shadow-[4px_4px_8px_rgba(0,0,0,0.05)];
        }
        &__propertyType {
            @apply font-semibold text-base;
        }
        &__propertyPrice {
            @apply ml-auto rounded-[15px] py-1 px-3 not-italic font-semibold text-sm text-[#ff8282];
            background: rgba(255, 130, 130, 0.15);
        }
        &__title {
            //eto tohizana
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
    }
</style>
