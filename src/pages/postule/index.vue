<script lang="ts" setup>
    import { computed, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const store = useStore();
    store.dispatch('StripeModule/initializeData');
    const dataStripe = computed(() => store.getters['StripeModule/getData']);
    const postulePlan = ref(dataStripe.value[0]);

    console.log(postulePlan.value);
    onMounted(() => {});

    console.log(dataStripe.value);
</script>

<template>
    <div class="container">
        <Title type="h2" label="Droit de postulation" weight="bold" />

        <Paragraphe>
            Vous devez faire une abonnement pour que votre projet soit visible
            en public
        </Paragraphe>
        <div class="back__btn">
            <BackButton @return="router.go(-1)" />
        </div>
        <div class="CardsContainer">
            <div class="Card">
                <div class="CardHeader">
                    <div class="PriceCircle">
                        <div class="PriceText">
                            {{ postulePlan.unit_amount / 100 }} $
                        </div>
                    </div>
                </div>

                <div class="content">
                    <Title
                        type="h5"
                        label="Abonnement de postulation"
                        weight="bold"
                    />

                    <Button @on-click="">by now</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        @apply flex flex-col items-center justify-center mt-[40px] rounded-md p-[20px] relative;
        background-color: #fff;
    }
    .back__btn {
        position: absolute;

        left: 40px;
        top: 40px;
    }
    .content {
        @apply flex flex-col items-center justify-center gap-[20px] p-[20px];
    }
    .Card {
        @apply border-[1px] rounded-md border-[#ccc];
        overflow: hidden;
        width: '30rem';
        height: '25rem';
    }
    .CardsContainer {
        display: flex;
        height: 75vh;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .CardHeader {
        height: 20rem;
        background-color: #7070b6;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 40px;
    }

    .PriceCircle {
        border: 0.5rem solid white;
        width: 12.5rem;
        height: 12.5rem;
        margin: 2px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 10);
    }
</style>
