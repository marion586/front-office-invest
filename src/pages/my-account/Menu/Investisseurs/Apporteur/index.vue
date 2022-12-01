<script lang="ts" setup>
    import UserCard from '@/components/Display/UserCard/UserCard.vue';
    import investService from '@/services/investService';
    import UserService from '@/services/userService';
    import { computed, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const userData = computed(() => store.getters['UserModule/getUserDetails']);
    const dataCard = ref<any>([]);

    async function initData() {
        console.log(userData.value);
        const { data } = await investService.getInvest();
        const uData = await UserService.getUser();
        console.log(uData, 'udata');
        if (data) {
            console.log(data);
            const d = data.filter(
                (item: any) =>
                    item.user.id === userData.value.id && item.is_paid
            );
            console.log(d);

            if (d) {
                d.forEach((item: any) => {
                    uData.data.forEach((i: any) => {
                        if (i._id === item.apport_id) {
                            dataCard.value.push(i);
                        }
                    });
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
