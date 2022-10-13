<template>
    <div class="btnLocalisation">
        <ButtonMenu
            class="btnLocalisation__btn"
            v-for="(item, index) in btnLocalisation"
            :key="index"
            :isIcon="item.icon"
            @on-click="changeBtnList(item.case)"
            >{{ item.label }}
        </ButtonMenu>
    </div>
</template>

<script lang="ts" setup>
    import ButtonMenu from '@/components/common/ButtonMenu/ButtonMenu.vue';
    import btnLocalisation from '@/pages/detail/data/BtnListLocalisation';

    const emit = defineEmits<{
        (e: 'changeBtnList', value: any): void;
    }>();
    function changeBtnList(component: any): void {
        emit('changeBtnList', component);
    }
</script>

<style lang="scss" scoped>
    .btnLocalisation {
        @apply flex flex-wrap gap-[10px];
        &__btn {
            @apply sm:w-[280px] w-full;
        }
    }
</style>
