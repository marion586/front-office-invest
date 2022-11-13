<script lang="ts" setup>
    import projectService from '@/services/projectService';
    import { onMounted, ref } from 'vue';

    const dataCard = ref([]);

    function getProducts() {
        const data = projectService.getProject();
        console.log(data);
        Object.assign(dataCard.value, data);
    }
    onMounted(() => {
        getProducts();
    });
</script>

<template>
    <div>
        <div>buttton</div>

        <h1>contenaire</h1>
    </div>
</template>

<style lang="scss" scoped></style>
