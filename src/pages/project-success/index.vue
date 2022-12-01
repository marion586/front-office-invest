<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import projectService from '@/services/projectService';
    import investService from '@/services/investService';
    import success from '@/components/Icon/success.vue';
    import { computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    async function setInvest() {
        const dataInvest = await computed(
            () => store.getters['ProjectModule/getSingleProjectInvest']
        );
        let { data } = await investService.getInvest();

        console.log(dataInvest.value, 'investData');

        const id = dataInvest.value._id;
        const singleInvest = data.find((item: any) => item.project._id === id);

        await investService.updateInvest(singleInvest._id, { is_paid: true });
        await projectService.updateProject(id, { status: 'En cours' });
    }

    onMounted(() => {
        setInvest();
    });
</script>

<template>
    <div class="success">
        <Title type="h1" label="Paiement du projet avec success" color="#ccc" />

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
