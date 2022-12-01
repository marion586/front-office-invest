<script lang="ts" setup>
    import UserCard from '@/components/Display/UserCard/UserCard.vue';
    import investService from '@/services/investService';
    import { computed, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const userData = computed(() => store.getters['UserModule/getUserDetails']);
    const dataCard = ref<any>([]);

    async function initData() {
        console.log(userData.value);
        const { data } = await investService.getInvest();
        console.log(data);
        if (data) {
            const d = data.filter(
                (item: any) =>
                    item.apport_id === userData.value.id && item.is_paid
            );

            if (d) {
                d.forEach((item: any) => {
                    dataCard.value.push(item.user);
                    console.log(dataCard.value, 'carr');
                });
            }
        }
    }
    onMounted(() => {
        initData();
    });
</script>

<template>
    <div class="dataUser">
        <UserCard
            :dataUser="data"
            v-for="(data, index) in dataCard"
            :key="index"
        />
    </div>
</template>

<style lang="scss" scoped>
    .dataUser {
        @apply grid grid-cols-3 gap-[20px];
    }
</style>
