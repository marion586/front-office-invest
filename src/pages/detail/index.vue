<template>
    <BreadCrumb :items="breadcrumbs" />
    <router-view />
</template>
<script setup>
    import { defineComponent, ref, computed } from '@vue/runtime-core';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';

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

<style></style>
