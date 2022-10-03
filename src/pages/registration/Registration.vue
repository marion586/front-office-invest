<template>
    <UserType v-if="usertype === ''" @on-click-choices="handleChoices" />
    <Subscription
        :userType="usertype"
        v-on:click-back="handleClickBack"
        v-else
    />
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import UserType from './RegistrationSection/UserType/UserType.vue';
    import Subscription from './SubscriptionSection/Subscription.vue';
    const usertype = ref<string>('');

    function handleClickBack() {
        usertype.value = '';
    }

    function handleChoices(userType: string) {
        usertype.value = userType;
    }
</script>
<style lang=""></style>
