<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input
                placeholder="Nom"
                @input="handleInput"
                type="text"
                name="name"
                id="name"
                :value="registerData.name"
            />
            <input
                placeholder="email"
                @input="handleInput"
                type="text"
                name="email"
                id="email"
                :value="registerData.email"
            />
            <input
                placeholder="logo"
                @input="handleInput"
                type="text"
                name="logo"
                id="logo"
                :value="registerData.logo"
            />
            <input
                placeholder="addresse"
                @input="handleInput"
                type="text"
                name="adress"
                id="adress"
                :value="registerData.adress"
            />
            <input
                placeholder="nom inc."
                @input="handleInput"
                type="text"
                name="nameEntreprise"
                id="nameEntreprise"
                :value="registerData.nameEntreprise"
            />
            <input
                placeholder="nb inc."
                @input="handleInput"
                type="text"
                name="numberEntreprise"
                id="numberEntreprise"
                :value="registerData.numberEntreprise"
            />
            <input
                @input="handleInput"
                placeholder="Mot de passe"
                type="text"
                name="password"
                id="password"
                :value="registerData.password"
            />
            <input
                @input="handleInput"
                placeholder="confirmer mot de passe"
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                :value="registerData.confirmPassword"
            />
            <!-- SHOW ERROR -->
            <p
                v-if="
                    isSubmitClicked &&
                    (isValid?.name === false || !isErrorObjEmpty)
                "
            >
                Nom obligatoire
            </p>

            <button type="submit">Enregister</button>
        </form>
    </div>
</template>
<script lang="ts" setup>
    import useFormValidation from '@/composables/useFormValidation';
    import { computed } from '@vue/reactivity';
    import { reactive, ref } from 'vue';
    import { Router, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';

    const store: Store<any> = useStore();
    const router: Router = useRouter();
    const props = defineProps({
        usertype: {
            type: String,
            require: true,
            default: '',
        },
    });
    const { isValid, validateNameField } = useFormValidation();
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

    let resetFields = reactive<IUser>({ ...registerData });

    const isErrorObjEmpty: any = computed(() => {
        return Object.values(isValid).length;
    });

    function isPasswordConfirmed(): boolean {
        return (
            registerData?.password !== '' &&
            registerData?.confirmPassword !== '' &&
            registerData?.password === registerData?.confirmPassword
        );
    }

    function handleInput(e: Event) {
        const name: string = (e.target as HTMLInputElement).name;
        const value: string = (e.target as HTMLInputElement).value;

        /**Validate input value for checking some errors */
        validateNameField(name, value);
        registerData = { ...registerData, [name]: value };
    }

    function sendFormData() {
        /** Keep data user into store */
        store.dispatch('UserModule/setRegisteredUser', {
            registerData,
            usertype: props.usertype,
        });

        // go to subscription section
        router.push({
            name: 'authSubscription',
        });
        registerData = { ...resetFields };
    }

    const isSubmitClicked = ref<boolean>(false);
    function handleSubmit() {
        /**
         * activate the error mode on isSubmitClicked to true
         * dont show the errors on mounted status
         */
        isSubmitClicked.value = true;
        const requiedFields = [
            'email',
            'adress',
            'password',
            'confirmPassword',
        ] as Array<string>;
        let isFormFieldsNotEmpty: boolean = false;
        requiedFields.forEach((key) => {
            isFormFieldsNotEmpty = isValid[key] === true ? true : false;
        });

        /**Ensure call API when all valid */
        isFormFieldsNotEmpty && isPasswordConfirmed() && sendFormData();
    }
</script>
