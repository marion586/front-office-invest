<template>
    <form v-show="hiddenForm" @submit.prevent="handleSubmit" class="auth__form">
        <div
            class="auth__form__title-section"
            v-if="usertype === 'professional'"
        >
            <Paragraphe>Information sur l'entreprise</Paragraphe>
            <hr />
        </div>
        <Select
            v-show="usertype === 'professional'"
            placeholder="Selectionnez"
            name="typeRole"
            :options="professionnalUserOption"
            @change-select="handleChangeSelect"
            label="Vous êtes"
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
            <template v-else>
                <Select
                    v-if="agenciesListLabel.length"
                    placeholder="Selectionnez"
                    name="agency"
                    :options="agenciesListLabel"
                    @change-select="handleChangeSelect"
                    label="Agence(s) disponible(s)"
                    :required="true"
                    defaultValue="Ajoutez une agence"
                />
            </template>
        </template>

        <div v-for="field in formParams">
            <div
                class="auth__form__title-section"
                v-if="usertype === 'professional' && field.name === 'name'"
            >
                <Paragraphe>Information personnelle</Paragraphe>
                <hr />
            </div>
            <Select
                v-if="usertype === 'professional' && field.name === 'agencyTva'"
                placeholder="Selectionnez un/des service(s)"
                name="approvals"
                :options="agenciesServicesListLabel"
                @change-select="handleChangeSelect"
                label="Services de l'entreprise"
                :required="true"
                mode="multiple"
                :has-error="{
                        status: usertype === 'professional' && (!!(errors as any).approvals && (errors as any).approvals !== '' && activeError),
                        errorMsg: (errors as any).approvals || '',
                    }"
            />
            <Input
                :disabled="(loadGoogleMap && field.name === 'address') || (field.name === 'telephone' && !(finalFormParams as any).longitude)"
                :id="field.id"
                :key="field.id"
                :label="field.label"
                :required="field.required"
                :placeholder="field.placeholder"
                :name-input="field.name"
                :inputType="field?.type"
                @input="handleInput"
                :addon-before="
                    field.name === 'telephone' && dialcodeCountry
                        ? dialcodeCountry.iso
                        : ''
                "
                :has-error="{
                        status: !!(errors as any)[field.name] && (errors as any)[field.name] !== '' && activeError,
                        errorMsg: (errors as any)[field.name] || '',
                    }"
            />
        </div>
        <input type="text" id="addresss" />
        <Button type-button="secondary" html-type="submit" width="100%"
            ><span>S'inscrire</span></Button
        >
    </form>
</template>

<script lang="ts" setup>
    import dialcodeData from '@/utils/json/dial-code-country';
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

    /**@start  agencies_list */
    const hasAgenciesList = ref<boolean>();
    let agenciesListLabel = ref<Array<any>>([
        {
            label: 'Ajoutez une agence',
            value: -1,
        },
    ]);
    let agenciesListValues = ref<Array<any>>([]);
    /**@end  agencies_list*/

    /**@start agencies_services_list */
    const agenciesServicesListLabel = ref<
        Array<{ label: string; value: number }>
    >([]);
    const agenciesServicesListValues = ref<Array<number>>([]);
    /**@end agencies_services_list */

    const loadAgenciesList = ref<boolean>(false);
    const loadGoogleMap = ref<boolean>(false);
    const hiddenForm = ref<boolean>(true);
    const dialcodeCountry = ref<{
        name: string;
        iso: string;
        countryCode: string;
    } | null>(null);

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
                { value: 'agent', label: 'Agent immobilier' },
                { value: 'notaire', label: 'Notaire' },
                { value: 'prestataire', label: 'Fournisseur de services' },
                { value: 'syndic', label: 'Syndic' },
                { value: 'huissier', label: 'Huissier' },
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
        props.usertype === 'professional' && getAgenciesList();
        getAgenciesServicesList();
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
            const { data, code }: { data: Array<any>; code: number } =
                await AgencyService.getAgenciesList();
            console.log(data);
            if (code === 200) {
                if (Array.isArray(data) && !data.length) {
                    formParams.value = [...professionnalUserForm];
                } else {
                    agenciesListValues.value = [...data];
                    agenciesListLabel.value = [
                        ...agenciesListLabel.value,
                        ...data.map((item) => ({
                            label: item.name,
                            value: item.name,
                        })),
                    ];
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            loadAgenciesList.value = false;
        }
    }

    async function getAgenciesServicesList() {
        interface TypeAgencySevices {
            id: number;
            roadWorks: string;
            status: boolean;
        }
        try {
            const {
                data,
                code,
            }: { data: Array<TypeAgencySevices>; code: number } =
                await AgencyService.getAgenciesServicesList();
            if (code === 200) {
                agenciesServicesListLabel.value = [
                    ...agenciesServicesListLabel.value,
                    ...data.map((item) => ({
                        label: item.roadWorks,
                        value: item.id,
                    })),
                ];
            }
        } catch (error) {}
    }

    async function initGoogleMap() {
        loadGoogleMap.value = true;
        const initGmp = useGoogleMapAPI();
        initGmp.then((googleInit: any) => {
            loadGoogleMap.value = false;

            gm_inputAutocomplete.value =
                new googleInit.maps.places.Autocomplete(
                    document.getElementById('gm_address')
                );
            gm_inputAutocomplete.value.addListener('place_changed', () => {
                const place = gm_inputAutocomplete.value.getPlace();
                getDialCodeCountry(place);
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

    /**
     * @start
     * search dial code by country
     */
    interface gm_IPlace {
        address_components: Array<{ types: Array<string>; short_name: string }>;
    }
    function gm_getCountry(place: gm_IPlace): string {
        let countryCode: string = '';
        place.address_components.forEach((item) => {
            if (item.types.includes('country')) {
                countryCode = item.short_name;
            }
        });
        return countryCode;
    }

    function getDialCodeCountry(place: gm_IPlace) {
        const countryCode: string = gm_getCountry(place);
        console.log(countryCode);
        dialcodeData.forEach((country) => {
            if (country.countryCode === countryCode) {
                dialcodeCountry.value = country;
                console.log(dialcodeCountry.value, 'dialcodeCountry');
                return;
            }
        });
    }
    /**
     * @end
     */

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
                            societies: getIdAgency((objValue as any)[key]),
                        };
                    } else {
                        // no societies choose
                        hasAgenciesList.value = false;
                        formParams.value = [...professionnalUserForm];
                        finalFormParams.value = {
                            ...finalFormParams.value,
                            societies: {},
                        };
                    }
                    break;
                case 'approvals':
                    agenciesServicesListValues.value =
                        objValue[key as keyof typeof objValue];
                    if (agenciesServicesListValues.value.length) {
                        (errors.value as any).approvals = '';
                    } else {
                        (errors.value as any).approvals = (
                            tmpErrors.value as any
                        ).approvals;
                    }
                    break;
            }
        }
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
    function getIdAgency(params: string): Object {
        return agenciesListValues.value
            .filter((item) => item.name === params)
            .at(-1).id;
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
            // remove agencies attributes from errors
            let obj: any;
            Object.keys(errors.value).forEach((key) => {
                if (
                    key !== 'agencyName' &&
                    key !== 'approvals' &&
                    key !== 'agencyTva'
                ) {
                    obj = {
                        ...obj,
                        [key]: (errors.value as any)[key],
                    };
                }
            });
            console.log(obj);
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
                .map((field) => {
                    if (field.name === 'telephone')
                        // assing dial code on phone number
                        return [
                            field.name,
                            `${
                                (dialcodeCountry.value as { iso: string })?.iso
                            }${field.value}`,
                        ];
                    return [field.name, field.value];
                })
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
            // get agency values
            const societies = {
                name: (finalFormParams.value as any).agencyName,
                // number: (finalFormParams.value as any).agencyNumber,
                vat: (finalFormParams.value as any).agencyTva,
                approvals: agenciesServicesListValues.value,
            };
            // remove agency input values
            Object.keys(finalFormParams.value).forEach((key) => {
                if (
                    key !== 'agencyName' &&
                    // key !== 'agencyNumber' &&
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
                societies,
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
        console.log(errors.value);
        activeError.value = true;
        /**
         * HANDLE ERROR AND EMPTY FIELD
         */
        const isFormValid: boolean = handleError();
        formateData();

        console.log(finalFormParams.value);
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

        /**
         * THIS IS NEEDED FOR AVOID BUG ON LOADING RENDING
         */
        hiddenForm.value = false;
        setTimeout(() => {
            router.push({
                name: 'authSubscription',
            });
        }, 350);
    }
</script>

<style lang="scss" scoped>
    .auth__form {
        &__title-section {
            :deep() {
                color: var(--color-gray-icon);
                margin: 40px 0 10px 0;
                font-weight: 700;
            }
        }
    }
</style>
