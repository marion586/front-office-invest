<template>
    <div>
        <SubscriptionCard
            v-if="step === 0"
            @on-choose-card="handleChooseCard"
        />
        <SubscriptionForm v-if="step === 1" />
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import SubscriptionCard from './SubscriptionCard/SubscriptionCard.vue';
    import SubscriptionForm from './SubscriptionForm/SubscriptionForm.vue';
    import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

    const route: RouteLocationNormalizedLoaded = useRoute();

    const step = ref<number>(0);

    function handleChooseCard() {
        step.value = 1;
    }
</script>
<style lang=""></style>
