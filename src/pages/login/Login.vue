<template>
    <div class="auth">
        <div class="auth__form-container">
            <div class="auth__head">
                <figure class="auth__image">
                    <img src="" alt="" />
                </figure>
                <Title type="h3" label="Connexion" :weight="700" />
            </div>
            <form @submit.prevent="handleSubmit" class="auth__form">
                <Input
                    label="Email ou nom d’utilisateur"
                    placeholder="Email ou nom d’utilisateur"
                    :model="formParams.username"
                    name-input="username"
                    @on-input="handleInput"
                    :has-error="{
                        status: errors.username !== '' && activeError,
                        errorMsg: errors.username,
                    }"
                />
                <Input
                    label="Mot de passe"
                    name-input="password"
                    placeholder="Mot de passe"
                    :model="formParams.password"
                    @on-input="handleInput"
                    :has-error="{
                        status: errors.password !== '' && activeError,
                        errorMsg: errors.password,
                    }"
                />
                <router-link to="/" class="auth__link">
                    <Paragraphe is="span" type="bold"
                        >Mot de passe oublier?</Paragraphe
                    >
                </router-link>
                <Button type="secondary" html-type="submit" width="100%">
                    Connexion
                </Button>
                <div class="auth__link-bottom">
                    <span>Ou</span><br />
                    <router-link to="/inscription">
                        <Paragraphe is="span">Créer un compte</Paragraphe>
                    </router-link>
                </div>
            </form>
        </div>
        <figure class="auth__bg">
            <img src="" alt="" />
        </figure>
    </div>
</template>
<script setup lang="ts">
    import Input from '@/components/Common/Input/Input.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

    import UserService from '@/services/userService';
    import store from '@/store';
    import emailValidation from '@/utils/validation/email_validation';
    import { onMounted, reactive, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import '@/assets/style/auth.scss';

    // route
    const route = useRoute();
    const router = useRouter();

    // interface
    interface IFormParams {
        username: string;
        password: string;
    }

    // ref
    // const isEmailValid = ref<boolean>(false);
    const activeError = ref<boolean>(false);
    const isFormValid = ref<boolean>(false);
    let formParams = reactive<IFormParams>({
        username: '',
        password: '',
    });
    const errors = reactive<IFormParams>({
        username: 'Ce champ est obligatoire',
        password: 'Ce champ est obligatoire',
    });

    // fn
    const handleInput = (e: IFormParams | Object) => {
        for (const key in e) {
            (formParams as any)[key] = (e as any)[key];
            if ((formParams as any)[key] === '') {
                (errors as any)[key] = 'Ce champ est obligatoire';
            } else {
                switch (key) {
                    case 'username':
                        let isEmailValid: boolean = emailValidation(
                            (formParams as any)[key]
                        );
                        if (!isEmailValid) {
                            (errors as any)[key] = 'Votre email est invalid';
                        } else {
                            (errors as any)[key] = '';
                        }
                        break;
                    default:
                        (errors as any)[key] = '';
                        break;
                }
            }
        }
    };

    const handleUserLogin = async (): Promise<void> => {
        try {
            const { token, user } = await UserService.login(formParams);
            user &&
                store.dispatch('UserModule/setUserDetails', {
                    detail: user,
                    token,
                });
            const redirectTo = route.query.redirect?.toString();
            redirectTo ? router.push(redirectTo) : router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = () => {
        console.log(errors);
        activeError.value = true;
        const isDataValid: Boolean = Object.values({ ...errors }).every(
            (value) => value === ''
        );
        console.log(isDataValid);
        // isFormValid.value = isDataValid ? true : false;
        isDataValid === true ? handleUserLogin() : console.log('not ok');
    };
</script>
<style lang="scss"></style>
