<template>
    <div class="subscription__card__item__wrapper">
        <div class="subscription__card__item">
            <Title
                type="h3"
                :label="(subscriptionCards?.name.toUpperCase() as string)"
                weight="600"
            />
            <Title type="h1" :label="parsedAmount" weight="600" />
            <Button
                :disabled="loadingRegistration"
                :theme="
                    subscriptionCards?.name.toUpperCase() === 'GOLD'
                        ? 'light'
                        : undefined
                "
                @click="handleChooseCard"
                type="secondary"
                ><LoadingButton size="sm" v-if="loadingRegistration" />
                <span v-else>Bénéficier</span></Button
            >
            <p class="subscription__card__item__desc">
                {{ subscriptionCards?.description }}
            </p>
            <ul class="subscription__card__item__info">
                <li
                    v-for="(item, index) in subscriptionCards?.services"
                    :key="index"
                >
                    <span class="info-icon">&check;</span
                    ><span class="info-text">{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { computed, PropType, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import UserService from '@/services/userService';
    import router from '@/routes';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const store = useStore();
    const props = defineProps({
        subscriptionCards: {
            type: Object as PropType<ISubscriptionCards>,
            require: true,
        },
    });

    const loadingRegistration = ref<boolean>(false);
    const theme = ref<{
        backgroundColor: string;
        descColor: string;
        infoColor: string;
        titleColor: string;
    }>({
        backgroundColor: '#FFF',
        descColor: '#606060',
        infoColor: '#949fb5',
        titleColor: 'var(--color-secondary)',
    });

    const parsedAmount = computed(
        () => `${props.subscriptionCards?.price.toFixed(2)} €`
    );

    const emit = defineEmits<{
        (e: 'on-choose-card', value: ISubscriptionCards | undefined): void;
    }>();
    async function handleChooseCard() {
        /**
         * IF CHOOSEN CARD IS FREE => DIRECTLY SUBMIT
         */
        if (
            (
                props.subscriptionCards as ISubscriptionCards
            ).name.toUpperCase() === 'GRATUIT'
        ) {
            const userDetails = store.getters['UserModule/getRegisteredUser'];
            /**
             * init stripe obj values WITHOUT STRIPE TOKEN => FREE
             */
            let stripeValue = {
                abonnementValue: (props.subscriptionCards as ISubscriptionCards)
                    .id,
            };

            /**
             * append values on final params to submit
             */
            let finalParams: Object = {
                ...userDetails,
                resetToken: '',
                stripe: { ...stripeValue },
                urlClient: window.location.origin + '/success',
            };

            /**
             * call api
             */
            try {
                loadingRegistration.value = true;
                const { code } = await UserService.signup(finalParams);
                if (code === 200) {
                    loadingRegistration.value = false;
                    router.push('/confirmation');
                }
            } catch (error) {
                //TODO HANLDE ERROR => NOTIFICATION PREF
                console.log(error);
                loadingRegistration.value = false;
            }
        } else {
            /**
             * PROCESS TO PAYMENT
             */
            emit('on-choose-card', props.subscriptionCards);
        }
    }
    onMounted(() => {
        if (props.subscriptionCards?.name.toUpperCase() === 'GOLD') {
            theme.value = {
                backgroundColor: 'var(--color-secondary)',
                descColor: '#ffffff94',
                infoColor: '#FFF',
                titleColor: '#FFF',
            };
        }
    });
</script>

<style lang="scss" scoped>
    .subscription__card__item {
        &:deep() {
            h3,
            h1 {
                color: v-bind('theme.titleColor');
            }
        }
        @apply flex justify-center flex-col items-center;

        width: 246.5px;
        &__wrapper {
            border-radius: 8px;
            padding: 24px;
            background-color: v-bind('theme.backgroundColor');
            widows: 100%;
        }
        gap: 25px;
        &__desc {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            text-align: center;
            color: v-bind('theme.descColor');
        }
        &__info {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            @apply flex justify-items-center flex-col gap-[13px];
            .info-icon {
                font-size: 20px;
                color: var(--color-primary);
            }
            li {
                @apply flex gap-[13px];
                .info-text {
                    color: v-bind('theme.infoColor');
                }
            }
        }
    }
</style>
