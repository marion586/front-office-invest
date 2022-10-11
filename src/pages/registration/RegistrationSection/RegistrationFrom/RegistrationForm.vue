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
                    :disabled="loadGoogleMap && field.name === 'address'"
                    :id="field.id"
                    :key="field.id"
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
        ref,
        onUnmounted,
        watch,
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
        // professsionnalErrorFieldsWithAgencies,
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
    let errors = ref<Object>({});
    let tmpErrors = ref<Object>({});
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
    const loadGoogleMap = ref<boolean>(false);

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
        if (!!(window as any).google) initGoogleMap();
        /**
         * Init fields, errors.value and memorize errors.value on mount
         */
        switch (props.usertype) {
            case 'particular':
                formParams.value = [...particularUserForm];
                errors.value = Object.assign(
                    errors.value,
                    particularErrorFields
                );
                tmpErrors.value = Object.assign(
                    tmpErrors.value,
                    particularErrorFields
                );
                // disable error on type
                (errors.value as any).type = '';
                /**assign type */
                finalFormParams.value = {
                    ...finalFormParams.value,
                    type: props.usertype,
                };
                break;
            case 'professional':
                formParams.value = [...professionnalUserForm];
                errors.value = Object.assign(
                    errors.value,
                    professsionnalErrorFields
                );
                tmpErrors.value = Object.assign(
                    tmpErrors.value,
                    professsionnalErrorFields
                );
                break;
            default:
                break;
        }
    });
    watch(
        () => formParams.value,
        (val, oldVal) => {
            if (oldVal && val.length !== oldVal.length) {
                console.log('changed');
                removeScript();
                delete (window as any).google;
                initGoogleMap();
            }
        },
        { deep: true, immediate: true }
    );
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
            loadGoogleMap.value = true;
            console.log('start gm');
            const initGmp = useGoogleMapAPI();
            initGmp.then((googleInit: any) => {
                loadGoogleMap.value = false;
                console.log('stop gm');

                gm_inputAutocomplete.value =
                    new googleInit.maps.places.Autocomplete(
                        document.getElementById('gm_address')
                    );
                gm_inputAutocomplete.value.addListener('place_changed', () => {
                    const place = gm_inputAutocomplete.value.getPlace();
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
                        (errors.value as any).address = '';
                    } catch (error) {
                        /**handle error if not valid value */
                        (errors.value as any).address =
                            'Votre addrèsse est invalide';
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
                        (errors.value as any).typeRole = '';
                    } else {
                        (errors.value as any).typeRole = (
                            tmpErrors.value as any
                        ).typeRole;
                    }
                    finalFormParams.value = {
                        ...finalFormParams.value,
                        ...objValue,
                    };
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
                    } else {
                        // no agency choose
                        hasAgenciesList.value = false;
                        formParams.value = [...professionnalUserForm];
                        finalFormParams.value = {
                            ...finalFormParams.value,
                            agency: {},
                        };
                    }
                    console.log(errors.value, 'errors');
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
                        (errors.value as any)[key] = isEmpty
                            ? (tmpErrors.value as any)[key]
                            : '';

                        /**specific errors.value */
                        switch (key) {
                            case 'email':
                                if (
                                    (e as any)[key] !== '' &&
                                    !emailValidation((e as any)[key])
                                )
                                    (errors.value as any)[key] =
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
                    (errors.value as any).confirmPassword =
                        'Mot de passe incorrect';
                }
                break;
            case 'password':
                if (
                    (e as any)[key] !== '' &&
                    (e as any)[key] !== cfrmPwdValue
                ) {
                    (errors.value as any).confirmPassword =
                        'Mot de passe incorrect';
                }
            default:
                break;
        }
    }

    /**
     * hanlde error before submit
     */
    function handleError(): boolean {
        const isAddressValid = !!(finalFormParams.value as any).longitude;
        (errors.value as any).address = !isAddressValid
            ? 'Votre addrèsse est invalide'
            : '';
        let isFormValid: any;
        if (!hasAgenciesList.value) {
            isFormValid = Object.values(errors.value).every((v) => v === '');
        } else {
            let obj: any;
            Object.keys(errors.value).forEach((key) => {
                if (
                    key !== 'agencyName' &&
                    key !== 'agencyNumber' &&
                    key !== 'agencyTva'
                ) {
                    obj = {
                        ...obj,
                        [key]: (errors.value as any)[key],
                    };
                }
            });
            isFormValid = Object.values(obj).every((v) => v === '');
        }

        return isFormValid;
    }
    /**
     * handle actions after error handling
     */
    function formateData() {
        /**control field
         * address field will be handle by google api
         */
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
        if (props.usertype === 'particular') {
            /**
             * if particular remove agency
             */
            let obj: any;
            Object.keys(finalFormParams.value).forEach((key) => {
                if (key !== 'agency') {
                    obj = {
                        ...obj,
                        [key]: (finalFormParams.value as any)[key],
                    };
                }
            });
            finalFormParams.value = {
                ...obj,
            };
        }
    }
    function handleSubmit() {
        activeError.value = true;
        /**
         * HANDLE ERROR AND EMPTY FIELD
         */
        const isFormValid: boolean = handleError();
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
        } else {
            finalFormParams.value = {
                ...finalFormParams.value,
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
