<script setup lang="ts">
    import AppHeader from '@/components/Layouts/AppHeader.vue';
    import { ref } from 'vue';
    import Loader from './components/Common/Loader/Loader.vue';
    import router from '@/routes';

    const isLoading = ref<boolean>(false);

    router.beforeEach(() => {
        isLoading.value = true;
    });

    router.afterEach(() => {
        isLoading.value = false;
    });
</script>

<template>
    <AppHeader />
    <Loader v-if="isLoading" />
    <router-view></router-view>
</template>
<style></style>
