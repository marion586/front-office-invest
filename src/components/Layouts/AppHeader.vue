<script setup lang="ts">
    import store from '@/store';
    import { ref, watch } from 'vue';

    const isLoggedIn = ref<boolean>(false);
    watch(
        () => store.getters['UserModule/getUserDetails'],
        function (user) {
            isLoggedIn.value = !!user;
        },
        { immediate: true }
    );
</script>

<template>
    <router-link to="/">HOME</router-link> |
    <router-link to="/about">ABOUT</router-link> |
    <router-link v-if="!isLoggedIn" to="/connexion">CONNEXION</router-link> |
    <router-link v-if="!isLoggedIn" to="/inscription">INSCRIPTION</router-link>
    | <router-link to="/mon-compte">MON COMPTE</router-link> |
    <router-link v-if="isLoggedIn" to="/logout">DECONNEXION</router-link>
</template>
