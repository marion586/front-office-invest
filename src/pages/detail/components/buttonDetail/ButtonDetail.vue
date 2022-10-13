<template>
    <div class="btnDetail">
        <ButtonMenu
            v-for="(item, index) in btnList"
            :key="index"
            :isIcon="item.icon"
            class="btnDetail__btn"
            @on-click="
                clickChangeView(item.case);
                "
        >
        <!-- changeViewDetailedInfo(item.case);
        changeViewRelateDoc(item.case); -->
        <!-- changeViewLocation(item.case); -->
            {{ item.label }}</ButtonMenu
        >
    </div>
</template>

<script lang="ts" setup>
    import ButtonMenu from '@/components/common/ButtonMenu/ButtonMenu.vue';
    import btnList from '@/pages/detail/data/BtnList';

    const emit = defineEmits<{
        (e: 'clickChangeView', value: any): void;
        (e: 'showDetailedInfo',value: any): void;
        (e: 'showRelateDoc', value: any): void;
        (e: 'changeViewLocation', value: any): void;
    }>();
    function clickChangeView(view: any): void {
        emit('clickChangeView', view);
    }
    function changeViewDetailedInfo(component:any): void {
        emit('showDetailedInfo',component);
    }
    function changeViewRelateDoc(component: any): void {
        emit('showRelateDoc', component);
    }
    function changeViewLocation(component: any): void {
        emit('changeViewLocation', component);
    }
</script>

<style scoped lang="scss">
    .btnDetail {
        @apply flex flex-wrap gap-[10px];

        // @apply flex;
        // @apply md:w-[640px] grid grid-cols-3 grid-rows-3;

        &__btn {
            @apply sm:w-[280px] w-full;
            // flex: 1;
        }
    }

    //responsive
    // @media (min-width: 1200px) {
    //     .btnDetail {
    //         @apply flex flex-col xl;
    //     }
    // }
</style>
