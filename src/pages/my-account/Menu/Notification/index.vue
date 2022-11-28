<script lang="ts" setup>
    import DemandeItem from '@/components/Display/Demande/index.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    import contratInvest from '@/pages/investissement/contratInvest/index.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import stripeService from '@/services/stripeService';
    import { computed, onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const onload = ref(false);
    const onSpin = ref(false);
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

    async function showSingleContract(e: any) {
        console.log(e, 'singleProject');
        await store.dispatch('ProjectModule/setSingleProjectInvest', e.project);
        dataInvest.value = { ...e.project };
        DataResult.value = { ...e };
        currentType.value = 'contratInvest';
    }

    async function makePayment() {
        onSpin.value = true;
        const data = await stripeService.setPaiementSession({
            priceId: 'price_1M8cdZIIynL6dlcZQehCbXRM',
        });
        window.location.href = data.url;
        onSpin.value = false;
    }
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
                    @on-show-contrat="showSingleContract(demand)"
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
                    <Button @on-click="makePayment">
                        <a-spin v-if="onSpin" /> Faire le payement
                    </Button>
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
