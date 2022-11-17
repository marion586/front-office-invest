<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import detailPaiementService from '@/services/detailPaiementService';
    import { computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter();
    const projectData = computed(
        () => store.getters['ProjectModule/getDetails']
    );

    const userData: any = computed(
        () => store.getters['UserModule/getUserDetails']
    );

    async function setDetails() {
        try {
            let data = await detailPaiementService.createDetail({
                user_id: userData.value._id,
                project_id: projectData.value._id,
            });
            console.log(data);
        } catch (error: any) {
            throw error.message;
        }
    }
    function showDetail() {
        router.push(`/Details/${projectData.value._id}`);
    }

    onMounted(() => {
        setDetails();
    });
</script>

<template>
    <div>
        <Title type="h1" label="Peiment   avec success" />

        <button @click="showDetail">Voir le detail</button>
    </div>
</template>

<style lang="scss" scoped></style>
