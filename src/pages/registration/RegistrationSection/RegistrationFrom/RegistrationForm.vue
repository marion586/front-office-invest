<template>
    <div>
        <form @submit.prevent="handleSubmit" class="auth__form">
            <Input
                v-for="(field, index) in formParams"
                :key="index"
                :label="field.label"
                :required="field.required"
                :placeholder="field.placeholder"
                :name-input="field.name"
                :inputType="field?.type"
                @input="handleInput"
                :has-error="{
                    status: !!(errors as any)[field.name] && (errors as any)[field.name] !== '' && activeError,
                    errorMsg: (errors as any)[field.name] || '',
                }"
            />
            <Button type="secondary" html-type="submit" width="100%"
                ><span>S'inscrire</span></Button
            >
        </form>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { onMounted, PropType, reactive, ref } from 'vue';
    import { Router, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import {
        particularUserForm,
        professionnalUserForm,
    } from './registration.data';

    const store: Store<any> = useStore();
    const router: Router = useRouter();
    const props = defineProps({
        usertype: {
            type: String as PropType<'particulier' | 'professionnel'>,
            require: true,
        },
    });
    onMounted(() => {
        switch (props.usertype) {
            case 'particulier':
                formParams.value = [...particularUserForm];
                break;
            case 'professionnel':
                formParams.value = [...professionnalUserForm];
                break;
            default:
                break;
        }
    });

    const errors = reactive<Object>({
        name: 'Le nom est obligatoire',
        firstname: 'Le prénom est obligation',
    });
    const activeError = ref<boolean>(false);

    const formParams = ref<Array<IUserField>>([]);

    // function isPasswordConfirmed(): boolean {
    //     return (
    //         // registerData?.password !== '' &&
    //         // registerData?.confirmPassword !== '' &&
    //         // registerData?.password === registerData?.confirmPassword
    //     );
    // }

    function handleInput(e: object) {
        for (const key in e) {
            formParams.value.forEach((field) => {
                if (key === field.name) {
                    formParams.value.splice(
                        formParams.value.indexOf(field),
                        1,
                        { ...field, value: (e as any)[key] }
                    );
                    if (field.required && field.errorMsg) {
                        const isEmpty = (e as any)[key] === '';
                        (errors as any)[key] = isEmpty ? field.errorMsg : '';
                    }
                }
            });
        }
        console.log(errors);
    }

    function sendFormData() {
        /** Keep data user into store */
        // store.dispatch('UserModule/setRegisteredUser', {
        //     registerData,
        //     usertype: props.usertype,
        // });
        // // go to subscription section
        // router.push({
        //     name: 'authSubscription',
        // });
        // registerData = { ...resetFields };
    }

    function handleSubmit() {
        /**
         * activate the error mode on isSubmitClicked to true
         * dont show the errors on mounted status
         */
        activeError.value = true;
        const isFormValid = Object.values(errors).every((v) => v === '');
        isFormValid ? console.log('ok') : console.log('not ok');
        /**Ensure call API when all valid */
        // isFormFieldsNotEmpty && isPasswordConfirmed() && sendFormData();
    }
</script>

<style lang="scss" scoped></style>
