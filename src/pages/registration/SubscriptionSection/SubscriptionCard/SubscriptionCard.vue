<template>
    <Loader v-if="loadCards" />
    <div v-else class="subscription">
        <div class="subscription__header">
            <div @click="goBack" class="subscription__header__back">
                <ArrowBack color="light" /><span> Retour</span>
            </div>
            <div class="subscription__header__content">
                <Title type="h2" label="Choisir l'abonnement" weight="600" />
                <paragraphe
                    >Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Non quibusdam ad aut veritatis. Hic repellat expedita libero
                    quae praese</paragraphe
                >
            </div>
        </div>
        <div class="subscription__core">
            <CardItem
                v-for="(card, index) in cardList"
                :key="index"
                @on-choose-card="hanldeChooseCard"
                :subscription-cards="card"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, reactive, ref } from 'vue';
    import { Router, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import Paragraphe from '../../../../components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardItem from './CardItem/CardItem.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import Loader from '../../../../components/Common/Loader/Loader.vue';

    const router: Router = useRouter();
    const store: Store<any> = useStore();
    let cardList = reactive<Array<ISubscriptionCards>>([]);
    const loadCards = ref<boolean>(false);

    onMounted(() => {
        initCard();
    });

    const emit = defineEmits<{
        (e: 'on-choose-card', v: ISubscriptionCards | undefined): void;
    }>();

    async function getSubscriptionCard(usertype: string) {
        loadCards.value = true;
        try {
            loadCards.value = true;
            await store.dispatch(
                'SubscriptionModule/setSubscriptionCards',
                usertype
            );
            cardList = Object.assign(
                cardList,
                store.getters['SubscriptionModule/getSubscriptionCard'].data
            ).sort((a: ISubscriptionCards, b: ISubscriptionCards) =>
                a.price > b.price ? 1 : -1
            );
            loadCards.value = false;
        } catch (error) {
            console.log(error);
            loadCards.value = false;
        }
    }
    async function initCard() {
        const registerUserStore = store.getters['UserModule/getRegisteredUser'];
        const usertype: string =
            registerUserStore.type === 'professionnal' ? 'pro' : 'part';
        getSubscriptionCard(usertype);
    }

    function goBack() {
        router.go(-1);
    }

    function hanldeChooseCard(params: ISubscriptionCards | undefined) {
        emit('on-choose-card', params);
    }
</script>
<style lang="scss">
    // this styles if for test pupose
    .subscription {
        // position: relative;
        padding: 18px;
        &__header {
            * {
                color: #fff;
            }
            background-color: var(--color-primary);
            border-radius: 8px;
            min-height: 268px;
            padding: 25px 38px;
            &__content {
                @apply flex justify-center flex-col items-center;
                * {
                    text-align: center;
                }
            }
            &__back {
                @apply flex items-center gap-[10px];
                &:hover {
                    cursor: pointer;
                }
            }
        }
        &__core {
            // position: absolute;
            top: 66%;
            height: 100%;
            width: 100%;
            padding: 0 calc(72px - 18px);
            padding-bottom: 30px;
            @media screen and (max-width: 430px) {
                padding: 0 calc(10px - 18px);
            }
            right: 0;
            @apply flex justify-center flex-row flex-wrap gap-[50px];
            margin-top: -77px;
        }
    }
</style>
