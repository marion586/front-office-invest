<template>
    <div class="subscription">
        <div class="subscription__header">
            <div @click="goBack" class="subscription__header__back">
                <span><span>&larr;</span> Retour</span>
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
                @on-choose-card="$emit('on-choose-card')"
                :subscription-cards="subscriptionCards"
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

    const router: Router = useRouter();

    const subscriptionCards = reactive<ISubscriptionCards>({
        subscriptionAmount: 0.0,
        subscriptionDesc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non quibusdam ad aut veritatis. Hic repellat`,
        subscriptionInfo: [
            'Lorem ipsum dolor sit',
            'Lorem ipsum dolor sit',
            'Lorem ipsum dolor sit',
        ],
        subscriptionType: 'GRATUIT',
    });
    const store: Store<any> = useStore();
    const cardTypes = ref<Array<string>>([]);
    const particularCardTypes: string[] = [
        'Economique',
        'Premium',
        'Gold',
        'Gratuit',
    ];
    const professionalCardTypes: string[] = [
        'Basic',
        'Premium',
        'Gold',
        'Gratuit',
    ];
    onMounted(() => {
        initCard();
    });

    function initCard() {
        const usertype: string =
            store.getters['UserModule/getRegisteredUser'].usertype;
        switch (usertype) {
            case 'particulier':
                cardTypes.value = [...particularCardTypes];
                break;
            case 'professionnel':
                cardTypes.value = [...professionalCardTypes];
                break;
            default:
                break;
        }

        console.log(cardTypes.value);
    }

    function goBack() {
        router.go(-1);
    }
</script>
<style lang="scss">
    // this styles if for test pupose
    .subscription {
        position: relative;
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
                &:hover {
                    cursor: pointer;
                }
            }
        }
        &__core {
            position: absolute;
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
        }
    }
</style>
