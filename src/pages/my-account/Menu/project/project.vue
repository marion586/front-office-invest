<script lang="ts" setup>
    import { computed, onMounted, provide, ref } from 'vue';
    import { useStore } from 'vuex';
    import ProjectContainer from '@/pages/home/ProjectList/index.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const onload = ref(false);
    provide('isBordered', true);
    const store = useStore();
    const dataCard = ref<any>([]);
    const userData: any = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    async function getProjectList() {
        onload.value = true;
        await store.dispatch('ProjectModule/initializeData');
        let dataStore = await computed(
            () => store.getters['ProjectModule/getData']
        );
        console.log(userData.value, dataStore.value);
        dataCard.value = dataStore.value.filter(
            (d: any) => d.user.email === userData.value.email
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
        <ProjectContainer :dataProps="dataCard" :isPublic="true" />
    </div>
</template>
