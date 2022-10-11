<template>
    <div>
        <form @submit.prevent="handleSubmit" class="auth__form">
            <div
                class="auth__form__title-section"
                v-if="usertype === 'professional'"
            >
                <Paragraphe>Information sur l'entreprise</Paragraphe>
                <hr />
            </div>
            <Select
                placeholder="Selectionnez"
                name="typeRole"
                :options="professionnalUserOption"
                @change="handleChangeSelect"
                label="Vous etes"
                :required="true"
                :mode="usertype !== 'particular' ? 'multiple' : undefined"
                :defaultValue="
                    usertype === 'particular' ? particularUserOption : undefined
                "
                :disabled="usertype === 'particular'"
                :has-error="{
                        status: usertype === 'professional' && (!!(errors as any).typeRole && (errors as any).typeRole !== '' && activeError),
                        errorMsg: (errors as any).typeRole || '',
                    }"
            />
            <template v-if="usertype === 'professional'">
                <div v-if="loadAgenciesList" class="flex justify-center">
                    <LoadingButton theme="dark" />
                </div>
                <Select
                    v-else
                    placeholder="Selectionnez"
                    name="agency"
                    :options="agenciesListLabel"
                    @change="handleChangeSelect"
                    label="Agence(s) disponible(s)"
                    :required="true"
                    defaultValue="Ajoutez une agence"
                />
            </template>

            <div v-for="(field, index) in formParams">
                <div
                    class="auth__form__title-section"
                    v-if="
                        usertype === 'professional' &&
                        field.name === 'firstname'
                    "
                >
                    <Paragraphe>Information personnelle</Paragraphe>
                    <hr />
                </div>
                <Input
                    :id="field.id"
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
            <input type="text" id="addresss" />
            <Button type="secondary" html-type="submit" width="100%"
                ><span>S'inscrire</span></Button
            >
        </form>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import {
        useGoogleMapAPI,
        removeScript,
        // @ts-ignore
    } from '@/composables/google-maps-api';
    import Input from '@/components/Common/Input/Input.vue';
    import { SelectValue } from 'ant-design-vue/lib/select';
    import {
        onMounted,
        watchEffect,
        PropType,
        reactive,
        ref,
        onUnmounted,
    } from 'vue';
    import emailValidation from '@/utils/validation/email_validation';
    import { Router, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import Select from '../../../../components/Common/Select/Select.vue';
    import {
        particularUserForm,
        professionnalUserForm,
        professionnalUserFormWithAgencies,
        particularErrorFields,
        professsionnalErrorFields,
        professsionnalErrorFieldsWithAgencies,
    } from './registration.data';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import AgencyService from '@/services/agencyService';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    /** */

    /**
     * utils
     */
    const store: Store<any> = useStore();
    const router: Router = useRouter();

    /**Props */
    const props = defineProps({
        usertype: {
            type: String as PropType<'particular' | 'professional'>,
            require: true,
        },
        logo: {
            type: String,
        },
    });

    /**REF & REACTIVE */
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
    const gm_inputAutocomplete = ref<any>();
    const hasAgenciesList = ref<boolean>();
    let agenciesListLabel = ref<Array<any>>([
        {
            label: 'Ajoutez une agence',
            value: -1,
        },
    ]);
    let agenciesListValues = ref<Array<any>>([]);
    const loadAgenciesList = ref<boolean>(false);

    /**
     * INITIALIZATION STATE
     */
    watchEffect(() => {
        /**init usertype option on watchEffect (its immediatly reactive) */
        if (props.usertype === 'particular') {
            particularUserOption.value = {
                value: 'particular',
                label: 'Particulier',
            };
        } else {
            professionnalUserOption.value = [
                { value: 'agent', label: 'Agent' },
                // { value: 'professional', label: 'Professional' },
                { value: 'prestataire', label: 'Fournisseurs de services' },
                { value: 'syndic', label: 'Syndic' },
                { value: 'huissier', label: 'Huissier' },
                { value: 'notaire', label: 'Notaire' },
            ];
        }

        /**
         * assign LOGO
         */
        finalFormParams.value = {
            ...finalFormParams.value,
            logo: props.logo,
        };
    });
    onMounted(() => {
        getAgenciesList();
        initGoogleMap();
        /**
         * Init fields, errors and memorize errors on mount
         */
        switch (props.usertype) {
            case 'particular':
                formParams.value = [...particularUserForm];
                errors = Object.assign(errors, particularErrorFields);
                tmpErrors = Object.assign(tmpErrors, particularErrorFields);
                // disable error on type
                (errors as any).type = '';
                /**assign type */
                finalFormParams.value = {
                    ...finalFormParams.value,
                    type: props.usertype,
                };
                break;
            case 'professional':
                formParams.value = [...professionnalUserForm];
                errors = Object.assign(errors, professsionnalErrorFields);
                tmpErrors = Object.assign(tmpErrors, professsionnalErrorFields);
                break;
            default:
                break;
        }
    });
    // watch()
    onUnmounted(() => {
        removeScript();
        delete (window as any).google;
    });

    /**
     * ACTONS
     */

    async function getAgenciesList() {
        loadAgenciesList.value = true;
        try {
            const res: Array<any> = await AgencyService.getAgenciesList();
            if (Array.isArray(res) && !res.length) {
                formParams.value = [...professionnalUserForm];
            } else {
                // hasAgenciesList.value = true;
                agenciesListValues.value = [...res];
                agenciesListLabel.value = [
                    ...agenciesListLabel.value,
                    ...res.map((item) => ({
                        label: item.name,
                        value: item.name,
                    })),
                ];
            }
        } catch (error) {
            console.log(error);
        } finally {
            loadAgenciesList.value = false;
        }
    }

    async function initGoogleMap() {
        let autocomplete: any;
        if (!!(window as any).google) {
            // useGoogleMapAPI();
            gm_inputAutocomplete.value = new (
                window as any
            ).google.maps.places.Autocomplete(
                document.getElementById('gm_address')
            );
            // setAutoComplte(autocomplete);
        } else {
            const initGmp = useGoogleMapAPI();

            initGmp.then((googleInit: any) => {
                autocomplete = new googleInit.maps.places.Autocomplete(
                    document.getElementById('gm_address')
                );
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    try {
                        const location = JSON.parse(
                            JSON.stringify(place.geometry.location)
                        );
                        /**assigne address paramaters */
                        finalFormParams.value = {
                            ...finalFormParams.value,
                            address: place.formatted_address,
                            longitude: JSON.stringify(location.lng),
                            latitude: JSON.stringify(location.lat),
                        };
                        (errors as any).address = '';
                    } catch (error) {
                        /**handle error if not valid value */
                        (errors as any).address = 'Votre addrèsse est invalide';
                    }
                });
            });
        }
    }

    function handleChangeSelect(objValue: object) {
        for (const key in objValue) {
            switch (key) {
                case 'typeRole':
                    if ((objValue as any).typeRole.length) {
                        (errors as any).typeRole = '';
                        // finalFormParams.value = {
                        //     ...finalFormParams.value,
                        //     ...objValue,
                        // };
                    } else {
                        (errors as any).typeRole = (tmpErrors as any).typeRole;
                    }
                    console.log(errors);
                    break;
                case 'agency':
                    console.log((objValue as any)[key]);
                    // switch on with agencies and without agencies
                    if ((objValue as any)[key] !== -1) {
                        // 1 agency choose
                        hasAgenciesList.value = true;
                        formParams.value = [
                            ...professionnalUserFormWithAgencies,
                        ];
                        finalFormParams.value = {
                            ...finalFormParams.value,
                            agency: getIdAgency((objValue as any)[key]),
                        };
                        console.log(errors);
                        /**
                         * assign errors
                         */
                        errors = Object.assign(professsionnalErrorFields);
                        tmpErrors = Object.assign(professsionnalErrorFields);
                    } else {
                        // no agency choose
                        hasAgenciesList.value = false;
                        formParams.value = [...professionnalUserForm];
                        finalFormParams.value = {
                            ...finalFormParams.value,
                            agency: {},
                        };
                        /**
                         * assign errors
                         */
                        errors = Object.assign(professsionnalErrorFields);
                        tmpErrors = Object.assign(professsionnalErrorFields);
                    }
                    break;
            }
        }
        // console.log(finalFormParams.value);
    }

    function getIdAgency(params: string): Object {
        return agenciesListValues.value
            .filter((item) => item.name === params)
            .at(-1).id;
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
                        /**HANLDE ERROR IF EMPTY */
                        const isEmpty = (e as any)[key] === '';
                        (errors as any)[key] = isEmpty
                            ? (tmpErrors as any)[key]
                            : '';

                        /**specific errors */
                        switch (key) {
                            case 'email':
                                if (
                                    (e as any)[key] !== '' &&
                                    !emailValidation((e as any)[key])
                                )
                                    (errors as any)[key] =
                                        'Votre email est invalide';
                                break;
                            case 'confirmPassword':
                            case 'password':
                                handleCofirmedPassword(e, key);
                            default:
                                break;
                        }
                    }
                }
            });
        }
    }

    function handleCofirmedPassword(e: object, key: string): void {
        const pwdValue: any = formParams.value
            .filter((field) => field.name === 'password')
            .at(-1)?.value;
        const cfrmPwdValue: any = formParams.value
            .filter((field) => field.name === 'confirmPassword')
            .at(-1)?.value;
        switch (key) {
            case 'confirmPassword':
                if ((e as any)[key] !== '' && (e as any)[key] !== pwdValue) {
                    (errors as any).confirmPassword = 'Mot de passe incorrect';
                }
                break;
            case 'password':
                if (
                    (e as any)[key] !== '' &&
                    (e as any)[key] !== cfrmPwdValue
                ) {
                    (errors as any).confirmPassword = 'Mot de passe incorrect';
                }
            default:
                break;
        }
    }

    /**
     * hanlde error before submit
     */
    function hanldeError(): boolean {
        const isAddressValid = !!(finalFormParams.value as any).longitude;
        (errors as any).address = !isAddressValid
            ? 'Votre addrèsse est invalide'
            : '';
        const isFormValid = Object.values(errors).every((v) => v === '');

        return isFormValid;
    }
    /**
     * handle actions after error handling
     */
    function formateData() {
        /**control field
         * address field will be handle by google api
         */
        console.log(formParams.value);
        const mappedArray = Object.fromEntries(
            formParams.value
                /** remove address from initial state */
                .filter((field) => field.name !== 'address')
                .filter((field) => field.name !== 'confirmPassword')
                .map((field) => [field.name, field.value])
        );

        finalFormParams.value = {
            ...finalFormParams.value,
            /**assign input values */
            ...mappedArray,
            /**assign usertype */
            type: props.usertype,
        };

        /**
         * if has agency => parse obj
         */
        if (!hasAgenciesList.value) {
            let obj: any;
            console.log('object');
            // get agency values
            const agency = {
                name: (finalFormParams.value as any).agencyName,
                number: (finalFormParams.value as any).agencyNumber,
                tva: (finalFormParams.value as any).agencyTva,
            };
            // remove agency input values
            Object.keys(finalFormParams.value).forEach((key) => {
                if (
                    key !== 'agencyName' &&
                    key !== 'agencyNumber' &&
                    key !== 'agencyTva'
                ) {
                    obj = {
                        ...obj,
                        [key]: (finalFormParams.value as any)[key],
                    };
                }
            });
            finalFormParams.value = {
                ...obj,
                /**assign agency values */
                agency,
            };
        }

        console.log(finalFormParams.value);
    }
    function handleSubmit() {
        console.log(errors);
        activeError.value = true;
        /**
         * HANDLE ERROR AND EMPTY FIELD
         */
        const isFormValid: boolean = hanldeError();

        formateData();

        isFormValid && prossToStripSection();
    }
    function prossToStripSection() {
        // add [] in typeRole if particular user
        if (!!!(finalFormParams.value as any).typeRole) {
            finalFormParams.value = {
                ...finalFormParams.value,
                typeRole: [],
                isAdmin: props.usertype === 'professional',
            };
        }
        /** Keep data user into store */
        store.dispatch('UserModule/setRegisteredUser', finalFormParams.value);
        // go to subscription section
        router.push({
            name: 'authSubscription',
        });
    }
</script>

<style lang="scss" scoped>
    .auth__form {
        &__title-section {
            :deep() {
                // text-transform: uppercase;
                color: var(--color-gray-icon);
                margin: 40px 0 10px 0;
                font-weight: 700;
                // font-size: 50px;
            }
        }
    }
</style>
