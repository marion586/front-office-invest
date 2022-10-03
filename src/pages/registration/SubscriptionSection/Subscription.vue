<template>
    <div>
        <SubscriptionCard
            v-if="step === 0"
            @change-step="
                () => {
                    step = 1;
                }
            "
            v-on:click-back="$emit('click-back')"
            @click-choose="handleClickChoose"
            :userType="userType"
        />
        <SubscriptionForm
            v-if="step === 1"
            @change-step="
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

    defineProps({
        userType: {
            default: '',
            type: String,
            require: true,
        },
    });

    const step = ref<number>(0);

    function handleClickChoose(cardType: string) {
        step.value = 1;
    }
</script>
<style lang=""></style>
