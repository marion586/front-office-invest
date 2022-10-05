<template>
    <div class="auth">
        <div class="auth__form-container">
            <div class="auth__head">
                <figure class="auth__image">
                    <img src="" alt="" />
                </figure>
                <Title type="h3" label="Inscription" :weight="700" />
            </div>
            <UserType
                v-if="usertype === ''"
                @on-click-choices="handleChoices"
            />
            <RegistrationForm :usertype="usertype" v-else />
        </div>
        <figure class="auth__bg">
            <img src="" alt="" />
        </figure>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';

    import Title from '@/components/Common/Title/Title.vue';

    import UserType from './RegistrationSection/UserType/UserType.vue';
    import RegistrationForm from './RegistrationSection/RegistrationFrom/RegistrationForm.vue';

    import '@/assets/style/auth.scss';

    const usertype = ref<string>('');

    function handleClickBack() {
        usertype.value = '';
    }

    function handleChoices(userType: string) {
        usertype.value = userType;
    }
</script>
<style lang=""></style>
