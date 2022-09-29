<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input :value="formParams.username" @input="handleInput" type="username" name="username" id="username">
            <input :value="formParams.password" @input="handleInput" type="password" name="password" id="password">
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>
<script setup lang="ts">
    import UserService from '@/services/userService';
    import emailValidation from '@/utils/validation/email_validation'; 
    import { reactive, ref } from 'vue';
    import { InputTextEvent } from '@/interfaces/input';
    const isEmailValid = ref<boolean>(false)
    const isFormValid = ref<boolean>(false);
    let formParams = reactive<{username: string, password: string}>({
        username: '',
        password: '',
    })

    const handleInput = (e: Event) => {
        const name: string = (e.target as HTMLInputElement).name;
        const value: string = (e.target as HTMLInputElement).value;
        switch (name) {
            case 'username':
                isEmailValid.value = emailValidation(value)
                break;
            default:
                break;
        }
        formParams = {
            ...formParams,
            [name]: value,
        }
        console.log(formParams);
    }

    const postLoginData = async (): Promise<void> => {
        try {
            const res = await UserService.login(formParams)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = () => {
        const isDataValid: Boolean = Object.values(formParams).every(value => value !== "");
        isFormValid.value = isDataValid && isEmailValid.value ? true : false;
        isFormValid.value === true ? postLoginData() : console.log('not ok');
    }


</script>
<style lang="">
    
</style>