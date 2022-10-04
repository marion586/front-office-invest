<template>
    <div class="container detail">
        <BreadCrumb :items="breadcrumbs" />
        <HeadProduct label="Immo" Text="testText" class="detail__headProductBg"/>
        <figure class="detail__img">
            <img src="../../assets/logo.png" alt="">
        </figure>
        <router-view />
    </div>
</template>
<script setup>
    import { defineComponent, computed } from '@vue/runtime-core';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import HeadProduct from '@/components/Display/headProduct/HeadProduct.vue';

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

    //     },
    // });
</script>

<style lang="scss" scoped>
    .detail{
        &__headProductBg{
            background: rgba(96, 96, 96, 0.25);
            width: fit-content;
            position: absolute;
        }
        &__img{
            width: fit-content;
        }
    }
</style>
