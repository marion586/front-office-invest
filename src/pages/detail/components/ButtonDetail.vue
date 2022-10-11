<template>
    <div class="btnDetail">
        <ButtonMenu
            v-for="(item, index) in btnList"
            :key="index"
            :isIcon="item.icon"
            class="btnDetail__btn"
            @click="changeView(item.case)"
        >
            {{ item.label }}</ButtonMenu
        >
    </div>
</template>

<script lang="ts" setup>
    import ButtonMenu from '@/components/common/ButtonMenu/ButtonMenu.vue';
    import btnList from '@/pages/detail/data/BtnList';

    const emit = defineEmits<{
        (e: 'on-click' ,value : any): void;
    }>();

    function changeView(view: any): void {
        emit('on-click', view);
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
