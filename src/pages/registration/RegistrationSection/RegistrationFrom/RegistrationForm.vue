<template>
    <div>
        <form @submit.prevent="handleSubmit" class="auth__form">
            <div
                class="auth__form__title-section"
                v-if="usertype === 'professionnel'"
            >
                <Paragraphe>Information sur l'entreprise</Paragraphe>
                <hr />
            </div>
            <div class="auth__form__select-field">
                <label>
                    <span class="auth__form__select-field--required">*</span>
                    Type</label
                >
                <Select
                    placeholder="Selectionnez"
                    name="select"
                    :options="professionnalUserOption"
                    @change="handleChangeSelect"
                    :defaultValue="particularUserOption"
                    :disabled="usertype === 'particulier'"
                />
            </div>

            <div v-for="(field, index) in formParams">
                <div
                    class="auth__form__title-section"
                    v-if="
                        usertype === 'professionnel' &&
                        field.name === 'firstname'
                    "
                >
                    <Paragraphe>Information personnelle</Paragraphe>
                    <hr />
                </div>
                <Input
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
            </div>
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
    import { SelectValue } from 'ant-design-vue/lib/select';
    import { onMounted, watchEffect, PropType, reactive, ref } from 'vue';
    import { Router, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import Select from '../../../../components/Common/Select/Select.vue';
    import {
        particularUserForm,
        professionnalUserForm,
        particularErrorFields,
        professsionnalErrorFields,
    } from './registration.data';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    /**
     * END IMPORT
     */

    /**
     * utils
     */
    const store: Store<any> = useStore();
    const router: Router = useRouter();

    /**Props */
    const props = defineProps({
        usertype: {
            type: String as PropType<'particulier' | 'professionnel'>,
            require: true,
        },
    });

    /**ref & reactive */
    /**OPTION */
    const particularUserOption = ref<SelectValue>();
    const professionnalUserOption = ref<SelectValue>();

    /**errros */
    let errors = reactive<Object>({});
    let tmpErrors = reactive<Object>({});
    const activeError = ref<boolean>(false);

    /**FIELDS */
    const formParams = ref<Array<IUserField>>([]);
    let finalFormParams = ref<Object>({});

    /**
     * INITIALIZATION STATE
     */
    watchEffect(() => {
        /**init usertype option on watchEffect (its immediatly reactive) */
        if (props.usertype === 'particulier') {
            particularUserOption.value = {
                value: 'particulier',
                label: 'Particulier',
            };
        } else {
            professionnalUserOption.value = [
                { value: 'agent', label: 'Agent' },
                { value: 'notaire', label: 'Notaire' },
            ];
        }
    });
    onMounted(() => {
        /**
         * Init fields, errors and memorize errors on mount
         */
        switch (props.usertype) {
            case 'particulier':
                formParams.value = [...particularUserForm];
                errors = Object.assign(errors, particularErrorFields);
                tmpErrors = Object.assign(tmpErrors, particularErrorFields);
                break;
            case 'professionnel':
                formParams.value = [...professionnalUserForm];
                errors = Object.assign(errors, professsionnalErrorFields);
                tmpErrors = Object.assign(tmpErrors, professsionnalErrorFields);
                break;
            default:
                break;
        }
    });

    function handleChangeSelect(obj: object) {
        console.log(obj);
    }

    function handleInput(e: object) {
        /**check error on input event and assign value */
        for (const key in e) {
            formParams.value.forEach((field) => {
                if (key === field.name) {
                    formParams.value.splice(
                        formParams.value.indexOf(field),
                        1,
                        { ...field, value: (e as any)[key] }
                    );
                    if (field.required) {
                        const isEmpty = (e as any)[key] === '';
                        (errors as any)[key] = isEmpty
                            ? (tmpErrors as any)[key]
                            : '';
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
         * HANDLE ERROR AND EMPTY FIELD
         */
        activeError.value = true;
        const isFormInputValid = Object.values(errors).every((v) => v === '');
        isFormInputValid ? console.log('ok') : console.log('not ok');

        const mappedArray = formParams.value.map((field) => [
            field.name,
            field.value,
        ]);
        finalFormParams.value = Object.fromEntries(mappedArray);

        console.log(finalFormParams.value);
        /**Ensure call API when all valid */
        // isFormFieldsNotEmpty && isPasswordConfirmed() && sendFormData();
    }
</script>

<style lang="scss" scoped>
    .auth__form {
        &__title-section {
            :deep() {
                text-transform: uppercase;
                color: var(--color-gray-icon);
                margin: 40px 0 10px 0;
                font-weight: 700;
                // font-size: 50px;
            }
        }
        &__select-field {
            margin-bottom: 18px;
            &--required {
                color: red;
                margin-right: 5px;
            }
            label {
                font-size: 14px;
                font-weight: 500;
                color: var(--color-gray-icon);
                margin-bottom: 10px;
            }
        }
    }
</style>
