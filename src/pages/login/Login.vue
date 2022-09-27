<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input :value="formParams.email" @input="handleInput" type="email" name="email" id="email">
            <input :value="formParams.password" @input="handleInput" type="password" name="password" id="password">
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>
<script setup>
    import emailValidation from '@/utils/validation/email_validation';
    import { reactive, ref } from 'vue';
    const isEmailValid = ref(false)
    const isFormValid = ref(false);
    let formParams = reactive({
        email: '',
        password: '',
    })


    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'email':
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

    const handleSubmit = () => {
        const isDataValid = Object.values(formParams).every(value => value !== "");
        isFormValid.value = isDataValid && isEmailValid.value ? true : false;
        isFormValid.value === true ? console.log('ok') : console.log('not ok');
    }


</script>
<style lang="">
    
</style>