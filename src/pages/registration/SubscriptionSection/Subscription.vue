<template>
    <div>
        <SubscriptionCard
            v-if="step === 0"
            @on-choose-card="handleChooseCard"
        />
        <SubscriptionForm
            :subscriptionCards="subscriptionCards"
            v-if="step === 1"
            @goback="
                () => {
                    step = 0;
                }
            "
        />
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import SubscriptionCard from './SubscriptionCard/SubscriptionCard.vue';
    import SubscriptionForm from './SubscriptionForm/SubscriptionForm.vue';
    import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

    const route: RouteLocationNormalizedLoaded = useRoute();

    const step = ref<number>(0);
    const subscriptionCards = ref<ISubscriptionCards | {}>({});

    function handleChooseCard(card: ISubscriptionCards | undefined) {
        step.value = 1;
        subscriptionCards.value = { ...card };
    }
</script>
<style lang=""></style>
