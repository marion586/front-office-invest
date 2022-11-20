<script lang="ts" setup>
    import formAdd from './formAdd/index.vue';
    import contratInvest from './contratInvest/index.vue';
    import ProjectCard from '@/components/Display/ProjectCard/ProjectCard.vue';
    import { computed, provide } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    let projetInvestData = computed(
        () => store.getters['ProjectModule/getInvestProject']
    );
    provide('isBordered', true);
</script>

<template>
    <div class="container">
        <div class="container__left">
            <formAdd />
        </div>

        <div class="container__right">
            <div class="contrat">
                <contratInvest />
            </div>
            <ProjectCard :DataCard="projetInvestData" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        @apply grid grid-cols-5 mt-[40px] p-[20px] rounded-md;
        background-color: #fff;
        &__left {
            @apply col-span-2;
        }
        &__right {
            @apply grid grid-cols-5   col-span-3 p-[20px];
            border-left: 1px solid #ccc;
            box-shadow: 0px 0 #999, -3px 0 4px -4px;
            .contrat {
                @apply col-span-3;
            }
            .card {
                @apply col-span-2;
            }
        }
    }
</style>
