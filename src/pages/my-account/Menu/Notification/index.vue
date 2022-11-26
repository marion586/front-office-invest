<script lang="ts" setup>
    import DemandeItem from '@/components/Display/Demande/index.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    import contratInvest from '@/pages/investissement/contratInvest/index.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import investService from '@/services/investService';
    import { computed, onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const onload = ref(false);
    const myNotification = ref<any>([]);
    const userData: any = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    const dataInvest = ref<any>({});
    const DataResult = ref<any>({});

    const currentType = ref('list');
    async function initInvest() {
        onload.value = true;
        await store.dispatch('ProjectModule/setInvestProject');
        const dataStore = computed(
            () => store.getters['ProjectModule/getInvestProject']
        );
        dataStore.value.forEach((item: any) => {
            if (
                userData.value.id === item.user.id &&
                item.is_accepted == true &&
                item.is_paid == false
            ) {
                myNotification.value.push(item);
            }
        });
        onload.value = false;
    }
    watch(
        () => myNotification.value,
        function (value) {
            myNotification.value = value;
        },
        { immediate: true, deep: true }
    );

    function showSingleContract(e: any) {
        console.log(e);
        dataInvest.value = { ...e.project };
        DataResult.value = { ...e };
        currentType.value = 'contratInvest';
    }

    function makePayment() {}
    onMounted(() => {
        initInvest();
    });
</script>

<template>
    <Loader v-if="onload" />
    <div v-else>
        <div v-if="currentType === 'list'">
            <div class="wrapper" v-if="myNotification.length > 0">
                <DemandeItem
                    v-for="(demand, id) in myNotification"
                    :key="id"
                    :myDemandData="demand"
                    @on-show-contrat="showSingleContract"
                />
            </div>
            <a-empty v-else description="Aucun aucun Notification" />
        </div>
        <div v-else>
            <contratInvest
                @return="currentType = 'list'"
                :dataInvest="dataInvest"
                :DataResult="DataResult"
            >
                <div class="btn-group">
                    <Button @on-click="makePayment"> Faire le payement </Button>
                </div>
            </contratInvest>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .btn-group {
        display: flex;
        gap: 20px;
    }
</style>
