<script lang="ts" setup>
    import ProjectContainer from '@/pages/home/ProjectList/index.vue';
    import { provide } from 'vue';

    provide('isBordered', true);
</script>

<template>
    <ProjectContainer />
</template>
