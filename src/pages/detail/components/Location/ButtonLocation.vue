<template>
    <div class="btnLocalisation">
        <BackButton @return="back" />
        <div class="btnLocalisation__btnContainer">
            <ButtonMenu
                class="btnLocalisation__btn"
                v-for="(item, index) in btnLocalisation"
                :key="index"
                :isIcon="item.icon"
                @on-click="changeBtnList(item)"
                >{{ item.label }}
            </ButtonMenu>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import ButtonMenu from '@/components/common/ButtonMenu/ButtonMenu.vue';
    import btnLocalisation from '@/pages/detail/data/BtnListLocalisation';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';

    const emit = defineEmits<{
        (e: 'gotoMap', value: any): void;
        (e: 'return'): void;
    }>();
    function changeBtnList(item: any): void {
        emit('gotoMap', item);
    }
    function back(): void {
        emit('return');
    }
</script>

<style lang="scss" scoped>
    .btnLocalisation {
        @apply flex flex-wrap flex-col gap-[10px];
        &__btnContainer {
            @apply flex gap-0 flex-col;
            //responsive
            @apply lg:flex lg:flex-row lg:gap-[10px];
        }
        &__btn {
            @apply lg:w-[280px] w-full;
        }
    }
</style>
