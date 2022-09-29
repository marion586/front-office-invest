<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input
                :value="formParams.username"
                @input="handleInput"
                type="username"
                name="username"
                id="username"
            />
            <input
                :value="formParams.password"
                @input="handleInput"
                type="password"
                name="password"
                id="password"
            />
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import UserService from '@/services/userService';
import store from '@/store';
import emailValidation from '@/utils/validation/email_validation';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// route
const route = useRoute();
const router = useRouter();

// ref
const isEmailValid = ref<boolean>(false);
const isFormValid = ref<boolean>(false);
let formParams = reactive<{ username: string; password: string }>({
    username: '',
    password: '',
});

// fn
const handleInput = (e: Event) => {
    const name: string = (e.target as HTMLInputElement).name;
    const value: string = (e.target as HTMLInputElement).value;
    switch (name) {
        case 'username':
            isEmailValid.value = emailValidation(value);
            break;
        default:
            break;
    }
    formParams = {
        ...formParams,
        [name]: value,
    };
};

const handleUserLogin = async (): Promise<void> => {
    try {
        const { token, user } = await UserService.login(formParams);
        store.dispatch('UserModule/setUserDetails', { detail: user, token });
        const redirectTo = route.query.redirect?.toString();
        redirectTo ? router.push(redirectTo) : router.push('/');
    } catch (error) {
        console.log(error);
    }
};

const handleSubmit = () => {
    const isDataValid: Boolean = Object.values(formParams).every(
        (value) => value !== ''
    );
    isFormValid.value = isDataValid && isEmailValid.value ? true : false;
    isFormValid.value === true ? handleUserLogin() : console.log('not ok');
};
</script>
<style lang=""></style>
