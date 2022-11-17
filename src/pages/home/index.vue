<script lang="ts" setup>
    import { computed, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import ProjectContainer from './ProjectList/index.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    const onload = ref(false);

    const store = useStore();
    const dataCard = ref<any>([]);

    async function getProjectList() {
        onload.value = true;
        await store.dispatch('ProjectModule/initializeData');
        let dataStore = await computed(
            () => store.getters['ProjectModule/getData']
        );
        dataCard.value = dataStore.value.filter(
            (d: any) => d.isPotuled == true
        );
        onload.value = false;
    }
    onMounted(async () => {
        await getProjectList();
    });
</script>

<template>
    <Loader v-if="onload" />
    <div v-else>
        <ProjectContainer :dataProps="dataCard" :isPublic="false" />
    </div>
</template>
