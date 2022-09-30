<template>
    <div>
        <form @submit.prevent="handleSubmit" action="post">
            <input @input="handleInput" type="text" name="name" id="name" />
            <input @input="handleInput" type="text" name="email" id="email" />
            <input @input="handleInput" type="text" name="logo" id="logo" />
            <input @input="handleInput" type="text" name="adress" id="adress" />
            <input
                @input="handleInput"
                type="text"
                name="nameEntreprise"
                id="nameEntreprise"
            />
            <input
                @input="handleInput"
                type="text"
                name="numberEntreprise"
                id="numberEntreprise"
            />
            <input
                @input="handleInput"
                type="text"
                name="password"
                id="password"
            />
            <input
                @input="handleInput"
                type="text"
                name="confirmPassword"
                id="confirmPassword"
            />

            <button type="submit">Enregister</button>
        </form>
    </div>
</template>
<script lang="ts" setup>
    import { reactive } from 'vue';
    import useForm from '@/composables/useForm';
    interface IUser {
        name?: string;
        email: string;
        logo?: string;
        adress: string;
        nameEntreprise?: string;
        numberEntreprise?: string;
        password: string;
        confirmPassword: string;
    }
    let registerData = reactive<IUser>({
        name: '',
        email: '',
        logo: '',
        adress: '',
        nameEntreprise: '',
        numberEntreprise: '',
        password: '',
        confirmPassword: '',
    });
    function handleInput(e: Event) {
        const name: string = (e.target as HTMLInputElement).name;
        const value: string = (e.target as HTMLInputElement).value;
        registerData = { ...registerData, [name]: value };
        console.log(registerData);
    }
    function handleSubmit() {}
</script>
