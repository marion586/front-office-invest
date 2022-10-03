<template>
    <div>
        <SubscriptionCard
            v-if="step === 0"
            @changeStep="
                () => {
                    step = 1;
                }
            "
        />
        <SubscriptionForm
            v-if="step === 1"
            @changeStep="
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
            type: String,
            require: true,
        },
    });

    const step = ref<number>(0);
</script>
<style lang=""></style>
