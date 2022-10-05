<template>
    <UserType v-if="usertype === ''" @on-click-choices="handleChoices" />
    <RegistrationForm :usertype="usertype" v-else />
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import UserType from './RegistrationSection/UserType/UserType.vue';
    import RegistrationForm from './RegistrationSection/RegistrationFrom/RegistrationForm.vue';
    const usertype = ref<string>('');

    function handleClickBack() {
        usertype.value = '';
    }

    function handleChoices(userType: string) {
        usertype.value = userType;
    }
</script>
<style lang=""></style>
