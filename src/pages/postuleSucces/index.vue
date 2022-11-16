<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import projectService from '@/services/projectService';
    import { computed, onMounted } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    async function setPostule() {
        const data = await computed(
            () => store.getters['StripeModule/getProjectData']
        );
        let d = projectService.updateProject(data.value._id, {
            isPotuled: true,
        });
        console.log(d);
    }

    onMounted(() => {
        setPostule();
    });
</script>

<template>
    <div>
        <Title type="h1" label="Project postulée avec success" />
    </div>
</template>

<style lang="scss" scoped></style>
