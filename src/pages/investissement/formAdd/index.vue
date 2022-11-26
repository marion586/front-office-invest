<script lang="ts" setup>
    import Signature from '@/components/Display/signatureCard/SignatureCard.vue';
    import { computed, ref } from 'vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import '@/assets/style/userprofil.scss';
    import Title from '@/components/Common/Title/Title.vue';
    import { useStore } from 'vuex';
    const store = useStore();
    const userData: any = computed(
        () => store.getters['UserModule/getUserDetails']
    );

    const imageSignature = ref(null);
    const options = ref([
        {
            value: 'Célibataire',
            label: 'Célibataire',
        },
        {
            value: 'Marié',
            label: 'Marié',
        },
        {
            value: 'Divorcé',
            label: 'Divorcé',
        },
    ]);
    const emit = defineEmits<{
        (event: 'change-data', value: any): void;
        (event: 'save-signature', value: any): void;
    }>();
    function saveSignature(e: any) {
        imageSignature.value = e;
        emit('save-signature', imageSignature.value);
    }

    function deleteSignature(e: any) {
        imageSignature.value = null;
    }
    function handleInput(e: any) {
        emit('change-data', e);
    }

    function handleSelect(e: any) {}
</script>

<template>
    <div class="wrapper">
        <Title type="h3" label="Formulaire d'investissement" weight="bold" />
        <div class="account__profil__photo__wrapper">
            <figure class="account__profil__photo__content">
                <div class="img-container">
                    <img
                        v-if="userData.image"
                        :src="userData.image"
                        alt="photo-de-profil"
                    />
                    <div class="img-container__empty-logo">
                        <User size="lg" />
                    </div>
                </div>
            </figure>
            <Title type="h2" :label="userData.firstName + userData.lastName" />
            <Paragraphe> {{ userData.email }} </Paragraphe>
        </div>
        <div class="wrapper__form">
            <Input
                label="Nom complet d'investisseur"
                @on-input="handleInput"
                placeholder="Votre nom complet"
                nameInput="name"
                inputType="text"
            />
            <Input
                label="Votre addresse actuelle"
                @on-input="handleInput"
                placeholder="Adresse actuelle"
                nameInput="address"
                inputType="text"
            />
            <Input
                label="Montant à payer"
                @on-input="handleInput"
                placeholder="Montant à payer"
                nameInput="amount"
                inputType="number"
            />
            <Input
                label="Date de payement"
                @on-input="handleInput"
                placeholder="Montant à payer"
                nameInput="DatePayment"
                inputType="date"
            />

            <Signature
                title="Votre Signature"
                width="100%"
                height="120px"
                @signature="saveSignature"
                @supp="deleteSignature"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .wrapper {
        @apply flex flex-col gap-[40px] justify-center w-full p-[20px];

        h3 {
            align-self: center;
        }

        &__form {
            @apply flex flex-col gap-[20px];
        }
    }
</style>
