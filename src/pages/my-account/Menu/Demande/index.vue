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
    const myDemand = ref<any>([]);
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
            console.log('value', item, userData.value.id);
            if (
                userData.value.id === item.apport_id &&
                item.is_accepted == false
            ) {
                myDemand.value.push(item);
            }
        });
        onload.value = false;
    }
    watch(
        () => myDemand.value,
        function (value) {
            myDemand.value = value;
        },
        { immediate: true, deep: true }
    );

    async function acceptInvest(e: any) {
        console.log(e);
        await investService.updateInvest(e, { is_accepted: true });
        myDemand.value = myDemand.value.filter((item: any) => item._id !== e);
        currentType.value = 'list';
    }

    async function deleteInvest(e: any) {
        await investService.deleteInvest(e);
        myDemand.value = myDemand.value.filter((item: any) => item._id !== e);
        currentType.value = 'list';
    }
    function showSingleContract(e: any) {
        console.log(e);
        dataInvest.value = { ...e.project };
        DataResult.value = { ...e };
        currentType.value = 'contratInvest';
    }
    onMounted(() => {
        initInvest();
    });
</script>

<template>
    <Loader v-if="onload" />
    <div v-else>
        <div v-if="currentType === 'list'">
            <div class="wrapper" v-if="myDemand.length > 0">
                <DemandeItem
                    v-for="(demand, id) in myDemand"
                    :key="id"
                    :myDemandData="demand"
                    :isDemand="true"
                    @on-show-contrat="showSingleContract"
                />
            </div>
            <a-empty v-else description="Aucun Demande" />
        </div>
        <div v-else>
            <contratInvest
                @return="currentType = 'list'"
                :dataInvest="dataInvest"
                :DataResult="DataResult"
            >
                <div class="btn-group">
                    <Button @on-click="acceptInvest(DataResult._id)">
                        Accepter
                    </Button>
                    <Button @on-click="deleteInvest(DataResult._id)">
                        Refuser
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
