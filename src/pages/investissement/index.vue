<script lang="ts" setup>
    import formAdd from './formAdd/index.vue';
    import contratInvest from './contratInvest/index.vue';
    import ProjectCard from '@/components/Display/ProjectCard/ProjectCard.vue';
    import investService from '@/services/investService';

    import { computed, provide, ref } from 'vue';
    import { useStore } from 'vuex';

    import Button from '@/components/common/Button/Button.vue';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const router = useRouter();
    const onload = ref(false);

    const projetInvestData = computed(
        () => store.getters['ProjectModule/getSingleProjectInvest']
    );
    const userData: any = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    const dataResult = ref({
        project: projetInvestData.value,
        apport_id: projetInvestData.value.user.id,
        user: userData.value,
        DatePayment: '',
        amount: '',
        imageSignature: '',
        name: '',
        address: '',
    });

    function handleChange(e: any) {
        const val =
            e.target.type === 'number'
                ? Number(e.target.value)
                : e.target.value;

        dataResult.value = {
            ...dataResult.value,
            [e.target.name]: val,
        };
    }
    function handleSignature(e: any) {
        dataResult.value = {
            ...dataResult.value,
            imageSignature: e,
        };
    }
    async function makeIvest() {
        try {
            onload.value = true;
            let data = await investService.addInvest(dataResult.value);
            if (data) {
                router.push('/invest-sent');
            }
            onload.value = false;
        } catch (error: any) {
            alert(error.message);
            onload.value = false;
        }
    }
    provide('isBordered', false);
</script>

<template>
    <div class="container">
        <div class="container__left">
            <formAdd
                @change-data="handleChange"
                @save-signature="handleSignature"
            />

            <Button width="300px" type="primary" @click="makeIvest">
                <span v-if="onload"> <a-spin /> </span>
                Demander
            </Button>
        </div>

        <div class="container__right">
            <div class="contrat">
                <contratInvest
                    :dataInvest="projetInvestData"
                    :DataResult="dataResult"
                    @return="router.go(-1)"
                />
            </div>
            <ProjectCard :DataCard="projetInvestData" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        @apply grid grid-cols-5 mt-[20px] p-[5px] rounded-md;
        background-color: #fff;
        &__left {
            @apply col-span-2 flex flex-col gap-[20px] items-center;
        }
        &__right {
            @apply grid grid-cols-5 gap-[10px] col-span-3 p-[10px] pt-[30px];
            border-left: 1px solid #ccc;
            box-shadow: 0px 0 #999, -3px 0 4px -4px;
            .contrat {
                @apply col-span-3;
            }
            .card {
                @apply col-span-2;
            }
        }
    }
</style>
