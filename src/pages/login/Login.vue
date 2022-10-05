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
                />
                <Input
                    label="Mot de passe"
                    placeholder="Mot de passe"
                    :model="formParams.password"
                    @on-input="handleInput"
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
                    <router-link to="/">
                        <Paragraphe is="span">Créer un compte</Paragraphe>
                    </router-link>
                </div>
            </form>
        </div>
        <figure class="auth__bg">
            <img src="" alt="" />
        </figure>
    </div>
    <!-- <div>
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
    </div> -->
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

    // route
    const route = useRoute();
    const router = useRouter();

    // ref
    const username = ref(null);
    onMounted(() => {
        console.log(username.value, '>>>');
    });
    const isEmailValid = ref<boolean>(false);
    const isFormValid = ref<boolean>(false);
    let formParams = ref<{ username: string; password: string }>({
        username: '',
        password: '',
    });

    // fn
    const handleInput = (e: object) => {
        // const name: string = (e.target as HTMLInputElement).name;
        // const value: string = (e.target as HTMLInputElement).value;
        // switch (name) {
        //     case 'username':
        //         isEmailValid.value = emailValidation(value);
        //         break;
        //     default:
        //         break;
        // }
        formParams = {
            ...formParams,
            ...e,
        };
    };

    const handleUserLogin = async (): Promise<void> => {
        try {
            const { token, user } = await UserService.login(formParams);
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

    const handleSubmit = (e: any) => {
        console.log('event', e);

        const isDataValid: Boolean = Object.values(formParams).every(
            (value) => value !== ''
        );
        isFormValid.value = isDataValid && isEmailValid.value ? true : false;
        isFormValid.value === true ? handleUserLogin() : console.log('not ok');
    };
</script>
<style lang="scss" scoped>
    .auth {
        background-color: #fff;
        min-height: calc(100vh);
        @apply grid grid-cols-1 items-center mt-[-50px];
        @screen lg {
            @apply grid-cols-2;
        }
        &__image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            background-color: var(--color-gray);
            margin: auto;
        }
        &__form-container {
            @apply container;
            @screen lg {
                max-width: 400px;
                width: 100%;
                margin: auto;
            }
        }
        &__head {
            text-align: center;
            @apply mb-[40px];
        }
        &__link {
            text-align: right;
            display: block;
            margin-bottom: 40px;
        }
        &__link-bottom {
            @apply text-center mt-[20px];
        }
        &__bg {
            display: none;
            background-color: var(--color-gray);
            width: 100%;
            height: 100%;
            @screen lg {
                @apply inline-block;
            }
        }
    }
</style>
