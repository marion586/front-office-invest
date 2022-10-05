<script setup lang="ts">
    import Title from "@/components/Common/Title/Title.vue";
    import AppInput from "@/components/Common/Input/Input.vue";

    let title = "Effectuer un offre";

    let dataInput = [
        {
            id: "name",
            label: "Nom",
            placeholder: "Votre nom",
        },
        {
            id: "firstname",
            label: "Prenom",
            placeholder: "Votre Prenom",
        },
        {
            id: "phoneNumber",
            label: "Numéro de téléphone ",
            placeholder: "Votre téléphone",
        },
        {
            id: "email",
            label: "email",
            placeholder: "Votre email",
        },
        {
            id: "priceOffer",
            label: "Prix proposé",
            placeholder: "prix",
        },
        {
            id: "conditionCredit",
            label: "Condition du crédit",
            placeholder: "Condition crédit",
        },
        {
            id: "amountCredit",
            label: "Montant du crédit",
            placeholder: "Montant crédit",
        },
    ];
</script>


<template>
    <div>
        <Title type="h1" 
        :label="title" 
        weight="bold"
        class="offer__title"
        />

        <div class="offer__form" >
            <AppInput v-for="(data, key) in dataInput" :key="key"
            class="offer__form-item"
            :placeholder="data.placeholder" 
            :id="data.id" />
        </div>
        
    </div>
</template>


<style lang="scss" scoped>
    .offer{
        &__title{
            text-align: center;
        }

        &__form-item{
            max-width: 450px;
            margin: 10px auto;
        }
    }
</style>