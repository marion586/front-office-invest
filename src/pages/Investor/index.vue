<script lang="ts" setup>
    import UserService from '@/services/userService';
    import { onMounted, ref } from 'vue';
    import UserCard from '@/components/Display/UserCard/UserCard.vue';
    import Title from '@/components/Common/Title/Title.vue';

    const DataUser = ref<any>([]);

    async function getUser() {
        const { data } = await UserService.getUser();
        data.forEach((item: any) => {
            if (item.typeUser === 'Investisseur') {
                DataUser.value.push(item);
            }
        });
    }
    onMounted(() => {
        getUser();
    });
</script>
<template>
    <Title class="title" type="h3" label="Les investisseurs" weight="bold" />
    <div class="container">
        <UserCard
            :dataUser="data"
            v-for="(data, index) in DataUser"
            :key="index"
        />
    </div>
</template>

<style lang="scss" scoped>
    .title {
        @apply flex justify-center mt-[10px];
    }
    .container {
        @apply grid grid-cols-4 gap-[20px] mt-[30px] bg-[#fff] p-5 rounded-md h-[80vh];
    }
</style>
