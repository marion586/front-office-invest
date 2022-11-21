<script lang="ts" setup>
    import Signature from '@/components/Display/signatureCard/SignatureCard.vue';
    import { ref } from 'vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Title from '@/components/Common/Title/Title.vue';

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
    function saveSignature(e: any) {
        imageSignature.value = e;
    }

    function deleteSignature(e: any) {
        imageSignature.value = null;
    }
    function handleInput(e: any) {}

    function handleSelect(e: any) {}
</script>

<template>
    <div class="container">
        <Title type="h3" label="Formulaire d'investissement" weight="bold" />
        <div class="container__form">
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
                nameInput="datePayement"
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

    <img v-if="imageSignature" :src="imageSignature" alt="signature photos" />
</template>

<style lang="scss" scoped>
    .container {
        @apply flex flex-col gap-[40px] justify-center h-full;

        h3 {
            align-self: center;
        }

        &__form {
            @apply flex flex-col gap-[20px];
        }
    }
</style>
