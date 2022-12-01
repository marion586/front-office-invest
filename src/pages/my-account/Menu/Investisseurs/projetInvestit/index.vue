<script lang="ts" setup>
    import ProjectCard from '@/components/Display/ProjectCard/ProjectCard.vue';
    import investService from '@/services/investService';
    import { computed, onMounted, provide, ref } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const userData = computed(() => store.getters['UserModule/getUserDetails']);
    const dataCard = ref<any>([]);

    async function initData() {
        const { data } = await investService.getInvest();

        if (data) {
            const d = data.filter(
                (item: any) =>
                    item.user.id === userData.value.id && item.is_paid
            );

            if (d) {
                d.forEach((item: any) => {
                    dataCard.value.push(item.project);
                });
            }
        }
    }
    onMounted(() => {
        initData();
    });
    provide('isBordered', false);
</script>

<template>
    <div class="dataUser">
        <ProjectCard
            :DataCard="data"
            v-for="(data, index) in dataCard"
            :key="index"
            :isPublic="false"
        />
    </div>
</template>

<style lang="scss" scoped>
    .dataUser {
        @apply grid grid-cols-2 gap-[20px];
    }
</style>
