<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import { data } from './data';
    import Button from '@/components/Common/Button/Button.vue';
    import userService from '@/services/userService';
    import { useStore } from 'vuex';
    import Aspin from 'ant-design-vue/lib/spin';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const router = useRouter();
    const onload = ref(false);
    type loginData = {
        email: String;
        password: String;
    };

    const signUpData = ref<loginData>({
        email: '',
        password: '',
    });

    function handleInput(e: any) {
        // Object.keys(e).forEach((key) => {
        //     switch (key) {
        //         case 'email':
        //             signUpData.value.email = e.email;
        //             break;
        //         case 'password':
        //             signUpData.value.password = e.password;
        //             break;
        //     }
        // });

        signUpData.value = {
            ...signUpData.value,
            [e.target.name]: e.target.value,
        };
    }
    async function handleClick() {
        try {
            onload.value = true;
            let params = { ...signUpData.value };
            const { data, token, errors } = await userService.login(params);
            if (data) {
                store.dispatch('UserModule/setUserDetails', {
                    detail: { ...data.user },
                    token,
                });
                router.push('/');
            } else {
                alert(errors[0].msg);
            }
            onload.value = false;
        } catch (error) {
            alert('une erruer est passé');
            onload.value = false;
        }
    }
    const isDisabled = computed(
        () => signUpData.value.email !== '' && signUpData.value.password !== ''
    );
</script>

<template>
    <div class="auth">
        <div class="auth__head">
            <Title type="h3" label="Créer un compte" :weight="700" />

            <template v-for="d in data" :key="d.label">
                <Input
                    :label="d.label"
                    @on-input="handleInput"
                    :placeholder="d.hint"
                    :nameInput="d.name"
                />
            </template>

            <Button
                type-button="secondary"
                @on-click="handleClick"
                html-type="submit"
                width="100%"
                :disabled="!isDisabled"
            >
                <Aspin v-if="onload" spin="true" />
                <span> Connecter</span></Button
            >
        </div>
    </div>
</template>
<style scoped lang="scss">
    .auth {
        @apply w-[400px];
        &__head {
            @apply w-full flex flex-col items-center gap-[10px];
            .custom-input__fields,
            .custom-select__wrapper {
                width: 100%;
            }
        }
        &__image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            background-color: var(--color-gray);
            margin: auto;
            display: flex;
            align-items: center;
            align-self: center;
            justify-content: center;
            img {
                width: 60px;
            }
            .img-photo {
                width: 35px;
                height: 35px;
                border: 2px solid #fff;
                bottom: -8px;
                right: 0;
                background-color: var(--color-gray);
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                border-radius: 50%;
            }
            .image-guest {
                width: 100%;
                height: 100%;
                object-fit: cover;
                &--overlay {
                    transition: all 0.3s ease;
                    opacity: 0;
                    background-color: #0000008f;
                    border-radius: 50%;
                    @apply flex justify-center items-center w-full h-full absolute;
                }
            }
            &:not(#take-photo):hover {
                .image-guest--overlay {
                    opacity: 1;
                    cursor: pointer;
                }
            }
        }
        &__form-container {
            padding-bottom: 20px;
            &__back {
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .fade-step-enter-active,
        .fade-step-leave-active {
            transition: all 0.3s ease-in-out;
        }

        .fade-step-enter-from,
        .fade-step-leave-to {
            opacity: 0;
            transform: translateX(50px);
        }
    }
</style>
