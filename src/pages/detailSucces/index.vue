<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import detailPaiementService from '@/services/detailPaiementService';
    import { computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import success from '@/components/Icon/success.vue';

    const store = useStore();
    const router = useRouter();
    const projectData = computed(
        () => store.getters['ProjectModule/getDetails']
    );

    const userData: any = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    console.log(userData.value);

    async function setDetails() {
        try {
            console.log(userData.value.id);
            let data = await detailPaiementService.createDetail({
                user_id: userData.value.id,
                project_id: projectData.value._id,
            });
            console.log(data, 'setting data detail');
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
    <div class="success">
        <Title type="h1" label="Detail payée avec success" color="#ccc" />

        <success />

        <span>
            <router-link :to="`/Details/${projectData._id}`">
                Voir le detail
            </router-link>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .success {
        @apply h-[80vh] flex flex-col justify-center items-center gap-[20px] container mt-[20px] rounded-lg;
        background-color: #fff;
        #Capa_1 {
            width: 41px;
        }
        span {
            color: #ccc;
        }
    }
</style>
