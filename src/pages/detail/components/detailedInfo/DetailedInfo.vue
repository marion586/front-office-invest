<template>
    <div class="info">
        <BackButton @return="back" />
        <span class="info__title">Description</span>
        <div class="info__txtInfo">
            <div class="info__txt">
                <span class="leftTxt">Cadastre</span>
                <span class="rightTxt" data-test="cadastrePrice">400 €</span>
            </div>
            <div class="info__txt">
                <span class="leftTxt">Revenu cadastral</span>
                <span class="rightTxt" data-test="rvCadastrePrice">400 €</span>
            </div>
            <div class="info__txt">
                <span class="leftTxt">Réference</span>
                <span class="rightTxt" data-test="reference">400 €</span>
            </div>
            <div class="info__txt">
                <span class="font-semibold">Résultat PEB</span>
            </div>
            <div class="info__pebTxt">
                <div class="info__txt lg:w-[50%]">
                    <span class="leftTxt">Energie Primaire</span>
                    <span class="rightTxt" data-test="energiePrimaire"
                        >120 kWh/m²</span
                    >
                </div>
                <div class="info__txt lg:w-[50%]">
                    <span class="leftTxt lg:ml-[18px]">Energie Primaire</span>
                    <span class="rightTxt">120 kWh/m²</span>
                </div>
            </div>
            <PebG />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import PebG from '@/components/Icon/PebG.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';

    const emit = defineEmits<{
        (e: 'hideInfo'): void;
    }>();

    function back(): void {
        console.log("second")
        emit('hideInfo');
    }
</script>

<style lang="scss" scoped>
    .info {
        background-color: white;
        @apply flex flex-col mx-[10px] p-2;

        &__title {
            @apply font-semibold text-sm;
        }
        &__txtInfo {
            background-color: var(--color-gray);
            @apply w-full p-4 rounded-lg mt-[18px];
            // @apply bg-[var(--color-gray)];
            //responsive
            @apply lg:w-full;
        }
        &__txt {
            @apply flex justify-between  mb-[18px];
        }
        .leftTxt {
            @apply text-sm leading-5;
        }
        .rightTxt {
            font-family: 'Montserrat';
            @apply font-semibold text-sm leading-[17px];
        }
        &__pebTxt {
            //responsive
            @apply lg:flex lg:flex-row lg:items-center justify-center;
        }
    }
</style>
