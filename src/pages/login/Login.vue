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
                <!-- FIELDS -->
                <Input
                    label="Email ou nom d’utilisateur"
                    placeholder="Email ou nom d’utilisateur"
                    :model="formParams.username"
                    name-input="username"
                    @input="handleInput"
                    :value="formParams.username"
                    :has-error="{
                        status: errors.username !== '' && activeError,
                        errorMsg: errors.username,
                    }"
                />
                <Input
                    inputType="password"
                    label="Mot de passe"
                    name-input="password"
                    placeholder="Mot de passe"
                    :model="formParams.password"
                    @input="handleInput"
                    :value="formParams.password"
                    :has-error="{
                        status: errors.password !== '' && activeError,
                        errorMsg: errors.password,
                    }"
                />
                <!-- FIELDS END -->

                <!-- MOT DE PASS OUBLIER -->
                <router-link to="/" class="auth__link">
                    <Paragraphe is="span" type="bold"
                        >Mot de passe oublier?</Paragraphe
                    >
                </router-link>

                <!-- ERREUR SERVER -->
                <small
                    class="auth__form-container--error-server"
                    v-if="serverErrorMsg !== ''"
                    >{{ serverErrorMsg }}</small
                >

                <!-- BOUTTON SOUMETTRE -->
                <Button
                    :disabled="false"
                    type="secondary"
                    html-type="submit"
                    width="100%"
                    @on-click="test"
                >
                    <LoadingButton size="sm" v-if="loadingLogin" />
                    <span v-else>Connexion</span>
                </Button>

                <!-- CONNEXION -->
                <div class="auth__link-bottom">
                    <span>Ou</span><br />
                    <router-link to="/inscription">
                        <Paragraphe is="span"
                            ><span class="auth__link-bottom__redirect"
                                >Créer un compte</span
                            ></Paragraphe
                        >
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
    import { reactive, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import '@/assets/style/auth.scss';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    // route
    const route = useRoute();
    const router = useRouter();

    // interface
    interface IFormParams {
        username: string;
        password: string;
    }

    // ref
    const activeError = ref<boolean>(false);
    let formParams = reactive<IFormParams>({
        username: '',
        password: '',
    });
    let errors = reactive<IFormParams>({
        username: 'Ce champ est obligatoire',
        password: 'Ce champ est obligatoire',
    });

    const tmpErrors: IFormParams = {
        ...errors,
    };

    const loadingLogin = ref<boolean>(false);

    const serverErrorMsg = ref<string>('');

    // fn
    const handleInput = (e: IFormParams | Object) => {
        for (const key in e) {
            (formParams as any)[key] = (e as any)[key];
            if ((formParams as any)[key] === '') {
                (errors as any)[key] = (tmpErrors as any)[key];
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
        console.log(errors);
    };

    const handleUserLogin = async (): Promise<void> => {
        loadingLogin.value = true;
        try {
            const { token, user } = await UserService.login(formParams);
            user &&
                store.dispatch('UserModule/setUserDetails', {
                    detail: user,
                    token,
                });
            const redirectTo = route.query.redirect?.toString();
            loadingLogin.value = false;
            redirectTo ? router.push(redirectTo) : router.push('/');
        } catch (error) {
            loadingLogin.value = false;
            console.log(error);
            handleServerErrors(error);
        }
    };

    function test() {
        console.log('object');
    }

    function handleServerErrors({ data, status }: any) {
        /**
         * init all error and field
         */
        formParams.username = '';
        formParams.password = '';
        activeError.value = !activeError.value;
        errors = Object.assign(errors, tmpErrors);
        /**
         *
         */
        if (status === 401) {
            serverErrorMsg.value = 'Identifiants incorrects';
        }
    }

    const handleSubmit = () => {
        serverErrorMsg.value = '';
        console.log(errors);
        activeError.value = true;
        const isDataValid: Boolean = Object.values({ ...errors }).every(
            (value) => value === ''
        );
        console.log(isDataValid);
        isDataValid === true ? handleUserLogin() : console.log('not ok');
    };
</script>
<style lang="scss">
    .auth__form-container--error-server {
        color: salmon;
        font-size: 14px;
        text-align: center;
        display: block;
        margin-bottom: 10px;
    }
</style>
