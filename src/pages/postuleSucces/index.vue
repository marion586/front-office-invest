<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import projectService from '@/services/projectService';
    import success from '@/components/Icon/success.vue';
    import { computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    async function setPostule() {
        const data = await computed(
            () => store.getters['StripeModule/getProjectData']
        );
        const storedData  = localStorage?.getItem('souscribeProject');
        let d = projectService.updateProject(JSON.parse(storedData as any)._id, {
            isPotuled: true,
        });
        console.log(d);
    }

    onMounted(() => {
        setPostule();
    });
</script>

<template>
    <div class="success">
        <Title type="h1" label="Project postulée avec success" color="#ccc" />

        <success />

        <span>
            <router-link to="/"> Liste Projet </router-link>
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
