<template>
    <div class="subscription">
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
                @on-choose-card="$emit('on-choose-card')"
                :subscription-cards="card"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, reactive } from 'vue';
    import { Router, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import Paragraphe from '../../../../components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardItem from './CardItem/CardItem.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';

    /**SERVICES */
    import SubscriptionServices from '@/services/subscriptionService';

    const router: Router = useRouter();

    let cardList = reactive<Array<ISubscriptionCards>>([]);
    const store: Store<any> = useStore();
    onMounted(() => {
        initCard();
    });
    async function getSubscriptionCard(type: string) {
        try {
            const { data } = await SubscriptionServices.getSubscriptionCard({
                for: type,
            });
            /**
             * Fetch and sort data
             */
            cardList = Object.assign(cardList, data).sort(
                (a: ISubscriptionCards, b: ISubscriptionCards) =>
                    a.price > b.price ? 1 : -1
            );
        } catch (error) {
            console.log(error);
        }
    }
    function initCard() {
        console.log(store.getters['SubscriptionModule/getSubscriptionCard']);
        const usertype: string =
            store.getters['UserModule/getRegisteredUser'].type;
        switch (usertype) {
            case 'particulier':
                getSubscriptionCard('part');
                break;
            case 'professionnel':
                getSubscriptionCard('pro');
                break;
            default:
                break;
        }
    }

    function goBack() {
        router.go(-1);
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
