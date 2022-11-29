<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import Photo from '@/components/Icon/Photo.vue';
    import Trash from '@/components/Icon/Trash.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { data } from './data';
    import Button from '@/components/Common/Button/Button.vue';
    import userService from '@/services/userService';
    import { useStore } from 'vuex';
    import Aspin from 'ant-design-vue/lib/spin';
    import { useRouter } from 'vue-router';
    const store = useStore();
    const router = useRouter();
    const onload = ref(false);
    type signData = {
        image: String;
        firstName: String;
        lastName: String;
        email: String;
        password: String;
        typeUser: String;
        tel: String;
        address: String;
    };

    const signUpData = ref<signData>({
        image: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        typeUser: '',
        tel: '',
        address: '',
    });

    let urlImgData = ref<string>('');
    let inputFile = ref<any>('');

    const addPaddingTop = ref<string>('110px');

    function handleDeletePhoto() {
        urlImgData.value = '';
        inputFile.value = '';
    }

    function handleAddPhoto(e: any) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if ((e.target as any).result) {
                urlImgData.value = (e.target as any).result;
                signUpData.value.image = urlImgData.value;
            }
        };
        reader.readAsDataURL(file);
    }
    function handleSelect(e: any) {
        signUpData.value = {
            ...signUpData.value,
            typeUser: e.typeUser,
        };
        console.log(signUpData.value);
    }
    function handleInput(e: any) {
        signUpData.value = {
            ...signUpData.value,
            [e.target.name]: e.target.value,
        };
    }
    async function handleClick() {
        try {
            onload.value = true;
            let params = { ...signUpData.value };
            const { data, token, errors } = await userService.signup(params);
            if (data) {
                store.dispatch('UserModule/setRegisteredUser', data.user);
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
        () =>
            signUpData.value.firstName !== '' &&
            signUpData.value.lastName !== '' &&
            signUpData.value.image !== '' &&
            signUpData.value.typeUser !== '' &&
            signUpData.value.email !== '' &&
            signUpData.value.password !== ''
    );
</script>

<template>
    <div class="auth">
        <div class="auth__head">
            <div class="relative w-fit flex justify-center">
                <figure class="auth__image">
                    <template v-if="urlImgData">
                        <img
                            class="image-guest"
                            :src="urlImgData"
                            alt="image-utilisateur"
                        />
                        <div
                            @click="handleDeletePhoto"
                            class="image-guest--overlay"
                        >
                            <Trash />
                        </div>
                    </template>
                    <img
                        v-else
                        src="@/static/images/empty-img.png"
                        alt="image-vide"
                    />
                    <label
                        @input="handleAddPhoto"
                        for="take-photo"
                        class="img-photo"
                    >
                        <Photo />
                        <input
                            id="take-photo"
                            type="file"
                            style="display: none"
                            name=""
                            :value="inputFile"
                            accept="image/*"
                        />
                    </label>
                </figure>
            </div>

            <Title type="h4" label="Créer un compte" :weight="700" />

            <template v-for="d in data" :key="d.label">
                <Select
                    v-if="d.type === 'select'"
                    :name="d.name"
                    placeholder="select"
                    :options="d.options"
                    :label="d.label"
                    @change-select="handleSelect"
                />
                <Input
                    v-else
                    :label="d.label"
                    @on-input="handleInput"
                    :placeholder="d.hint"
                    :nameInput="d.name"
                    :inputType="d.inputType"
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
                <span> S'inscrire</span></Button
            >
        </div>
    </div>
</template>
<style scoped lang="scss">
    .auth {
        @apply w-[400px];
        &__head {
            @apply w-full flex flex-col items-center gap-[7px];
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
            border: 1px solid #ccc;
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
            padding-top: v-bind('addPaddingTop');
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
