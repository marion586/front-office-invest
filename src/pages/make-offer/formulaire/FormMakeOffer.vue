<script setup lang="ts">
    import Title from "@/components/Common/Title/Title.vue";
    import AppInput from "@/components/Common/Input/Input.vue";
    import Singature from "@/components/Display/signatureCard/SignatureCard.vue";
    import LoadBar from '@/components/Icon/LoadBar.vue';
    import AddIcon from '@/components/Icon/AddIcon.vue';
    import Button from '@/components/Common/Button/Button.vue';
    

    let title = "Faire une offre";

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

    let elementOffer = [
        {
            title: "Les soussignes(es)",
            name: "Kary lady",
            hasDataInput: true,
            hasAdd: true,
            dataInput: [
                {
                    id: "name",
                    placeholder: "Votre nom",
                },
            ]
        },
        {
            title: "Prix proposé",
            hasDataInput: true,
            dataInput: [
                {
                    id: "priceOffer",
                    placeholder: "Votre proposition",
                }
            ]
        },
        {
            title: "Conditions",
            hasDataInput: true,
            hasAdd: true,
            dataInput: [
                {
                    id: "conditions",
                    placeholder: "Ajouter votre condition",
                }
            ]
        },
        {
            title: "Conditions suspensives",
            dataRadio: [
                {
                    name: "conditionSuspens",
                    value: "Avec",
                },
                {
                    name: "conditionSuspens",
                    value: "Sans"
                }
            ]
        },
        {
            title: "Condition de crédit",
            hasDataInput: true,
            dataInput: [
                {
                    id: "conditionCredit",
                    placeholder: "Montant de crédit",
                }
            ]
        },
        {
            title: "Délai de ",
            hasDataInput: true,
            dataInput: [
                {
                    id: "durationCredit",
                    placeholder: "0",
                }
            ]
        },
        {
            title: "Valabilite de l'offre",
            hasDataInput: true,
            dataInput: [
                {
                    id: "dateOffer",
                    placeholder: "Select Date",
                }
            ]
        },
        {
            title: "Accompte à la signature",
            hasDataInput: true,
            dataInput: [
                {
                    id: "depositSignature",
                    placeholder: "0",
                }
            ]
        },
        {
            title: "Signature devant notaire",
            hasDataInput: true,
            dataInput: [
                {
                    id: "depositSignature",
                    placeholder: "0",
                }
            ]
        },
        {
            title: "Document fait à ",
            hasDataInput: true,
            dataInput: [
                {
                    id: "documentDwelling",
                    placeholder: "Lieu",
                }
            ]
        },
        {
            title: "Le  ",
            hasDataInput: true,
            dataInput: [
                {
                    id: "documentDate",
                    placeholder: "22/10/2022",
                }
            ]
        },
        {
            title: "Que voulez-vous fiare de cette offre ? ",
            dataRadio: [
                {
                    name: "wantWidthOffer",
                    value: "M'envoyer par e-mail",
                },
                {
                    name: "wantWidthOffer",
                    value: "Soumettre au notaire",
                },
                {
                    name: "wantWidthOffer",
                    value: "Envoyer au vendeur",
                }
            ]
        },
        {
            title: "Signature ",
            dataRadio: [
                {
                    name: "signatureOffered",
                    value: "Signature simple",
                },
                {
                    name: "signatureOffered",
                    value: "Signature Electronique avec one span",
                }
            ]
        },
    ]
</script>


<template>
    <div class="offer__add">
        <div class="offer__title-content">
            <Title type="h3" 
            :label="title" 
            weight="bold"
            class="offer__title"
            />
            <Button type="secondary"
            class="btn-overview"
            ><LoadBar /> Aperçu </Button>
        </div>
        <hr>


        <div class="offer__form" >
            <div v-for="(element, index) in elementOffer" :key="index">
                <span class="offer__form-label"
                v-if="element.hasDataInput"
                >
                    {{ element.title }}
                </span>
                <ul>
                    <li>{{ element.name }}</li>
                </ul>
                <div class="offer__form-inline">
                    <AppInput v-for="(data, key) in element.dataInput" :key="key"
                    class="offer__form-item"
                    :placeholder="data.placeholder" 
                    :id="data.id" /> <AddIcon class="icon-add" v-if="element.hasAdd" />
                </div>
            </div>
        </div>


        <div class="offer__signature">
            <Singature />
        </div>
        <hr>

        <div class="offer__btn-valid">
            <Button type="secondary" class="btn-valid-content">
                Valider
            </Button>
        </div>
        
    </div>
</template>


<style lang="scss" scoped>
    .offer{
        &__add{
            margin-left: 14px;
        }
        
        &__title-content{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
        }
        &__title{
            width: 97px;
            height: 16px;
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 16px;
            margin-left: 14px;
            color: #606060;
        }

        &__form-label{
            width: 347px;
            height: 15px;
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 15px;
            color: #000000;
        }

        &__form-item{
            max-width: 450px;
            flex-basis: 85%;
            margin-bottom: 0px;
        }

        &__form-inline{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }

        &__signature{
            margin-top: 24px;
            margin-bottom: 24px;
        }

        &__btn-valid{
            margin-top: 14px;
            margin-bottom: 14px;
            margin-right: 14px;
        }

    }

    .btn-overview{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 7px;
        padding-top: 12px;
        padding-bottom: 12px;
        margin-right: -12px;
        margin-bottom: 11px;
    }

    .icon-add{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px;
        width: 20px;
        height: 20.39px;
        background: #F2F2F2;
        border-radius: 24px;
        flex: none;
        order: 1;
        flex-grow: 0;
        margin-left: 25px;
    }

    .btn-valid-content{
        width: 100%;
        margin-bottom: 14px;
    }
</style>