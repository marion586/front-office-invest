<script setup lang="ts">
    import { ref } from 'vue';
    import Loader from './components/Common/Loader/Loader.vue';
    import router from '@/routes';
    import AppHeader from './components/Layouts/AppHeader.vue';
    const isLoading = ref<boolean>(false);

    router.beforeEach(() => {
        isLoading.value = true;
    });

    router.afterEach(() => {
        isLoading.value = false;
    });
</script>

<template>
    <div>
        <AppHeader />
        <Loader v-if="isLoading" />
        <router-view></router-view>
    </div>
</template>
<style></style>
