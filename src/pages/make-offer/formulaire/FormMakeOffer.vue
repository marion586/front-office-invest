<script setup lang="ts">
    import Title from "@/components/Common/Title/Title.vue";
    import AppInput from "@/components/Common/Input/Input.vue";
    import Singature from "@/components/Display/signatureCard/SignatureCard.vue";
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import AddIcon from '@/components/Icon/AddIcon.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import DocsResult from '@/pages/make-offer/doc-offer/ResultMakeOffer.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
import { reactive, ref } from "vue";



    let title = "Voir l'aperçu du document";
    let titleContent = "Faire une offre";


    const classFlex = "flex flex-row items-center gap-6";

    let names = reactive([]);
    let conditions = reactive([]);

    let elementOffer = [
        {
            title: "Les soussignes(es)",
            name: names,
            hasAdd: true,
            dataInput: [
                {
                    id: "name",
                    placeholder: "Votre nom",
                    type: "text",
                    label: '',
                    unitMesure: ''
                },
            ]
        },
        {
            hasInputFull: true,
            title: "Prix proposé",
            dataInput: [
                {
                    id: "priceOffer",
                    placeholder: "Votre proposition",
                    type:"number",
                    label: '',
                    unitMesure: ''
                }
            ]
        },
        {
            title: "Conditions",
            hasListCondition: true,
            hasAdd: true,
            dataInput: [
                {
                    id: "conditions",
                    placeholder: "Ajouter votre condition",
                    type: "text",
                    label: '',
                    unitMesure: ''
                }
            ]
        },
        {
            title: "Conditions suspensives",
            checkGroup: "conditionSuspens",
            hasRadio: true,
            class: classFlex,
            align: "horizontal",
            dataRadio: [
                {
                    label: "Avec",
                    value: "withCondition",
                },
                {
                    label: "Sans",
                    value: "noCondition"
                }
            ]
        },
        {
            // class: classFlex,
            dataInput: [
                {
                    id: "conditionCredit",
                    label: "Condition de crédit",
                    placeholder: "Montant de crédit",
                    type: "number",
                    unitMesure: ''
                },
                {
                    id: "durationCredit",
                    label: "Délai de ",
                    placeholder: "0",
                    unitMesure: "semaine(s)",
                    type: "number",
                }
            ]
        },
        {
            title: "Valabilité de l'offre",
            hasInputFull: true,
            dataInput: [
                {
                    id: "dateOffer",
                    placeholder: "Select Date",
                    type: "date",
                    label: '',
                    unitMesure: ''
                }
            ]
        },
        {
            // class: classFlex,
            dataInput: [
                {
                    id: "depositSignature",
                    label: "Accompte à la signature",
                    placeholder: "0",
                    unitMesure: '%',
                    type: "number",
                },
                {
                    id: "depositSignature",
                    label: "Signature devant notaire",
                    placeholder: "0",
                    unitMesure: ''
                }
            ]
        },
        {
            titleInput: "Détail du document",
            // class: classFlex,
            dataInput: [
                {
                    id: "documentDwelling",
                    label: "Document fait à ",
                    placeholder: "Lieu",
                    unitMesure: ''
                },
                {
                    id: "documentDate",
                    label: "Le ",
                    placeholder: "22/10/2022",
                    type: "date",
                    unitMesure: ''
                }
            ]
        },
     
        {
            titleInput: "Que voulez-vous fiare de cette offre ? ",
            checkGroup: "wantWidthOffer",
            hasRadio: true,
            dataRadio: [
                {
                    label: "M'envoyer par e-mail",
                    value: "sendWithMail",
                },
                {
                    label: "Soumettre au notaire",
                    value: "notary",
                },
                {
                    label: "Envoyer au vendeur",
                    value: "sendSeller",
                }
            ]
        },
        {
            titleInput: "Signature ",
            checkGroup: "signatureOffered",
            hasRadio: true,
            dataRadio: [
                {
                    label: "Signature simple",
                    value: "signatureSimple",
                },
                {
                    label: "Signature Electronique avec one span",
                    value: "signatureElectronic",
                }
            ]
        },
    ];

    const handleChange = (e: Event) => {
    console.log(e);
    console.log("Value", (e.target as HTMLInputElement).value);
}

    const handleInput = (e: Object) => {
        console.log('handleInput', e);
        dataParams = {
            ...dataParams,
            ...e,
        };

        console.log('dataParams', dataParams);
    };


    let dataParams = ref<{name: String, conditions: String}>({
        name: '',
        conditions: ''
    });


    const handleAddNameCondition = (name: String) => {
        switch (name) {
            case 'name':
            names.push(dataParams.name);
                console.log('Name add clicked', names);
                
                break;

            case 'conditions':
            conditions.push(dataParams.conditions);
            console.log('Condition add clicked', conditions);
            
            break;
        
            default:
                break;
        }
        
    }

</script>


<template>
        <!-- Head 'Faire un offre' mobile -->
        <div class="offer__head-mobile">
            <InfoIcon class="offer__head-info-icon" />

            <Title type="h3" 
            :label="title" 
            weight="bold"
            class="offer__head-mobile-title"
            />
        </div>

        <!-- Froms to add new 'Faire un offre' -->
        <div class="offer__content">
            <div class="offer__title-content">
                <Title type="h4" 
                :label="titleContent" 
                weight="bold"
                class="offer__title"
                />
            </div>
            <hr class="separator-form">
            
            <div class="offer__content-inline-lg">
                <div class="offer__content-form">
                    <div v-for="(element, index) in elementOffer"
                    :key="index"
                    class="mb-3.5"
                    >
                        <p class="title-input-dark">{{ element.titleInput }}</p>
                        <div :class="element.class">
                            <span class="offer__form-label">
                                {{ element.title }}
                            </span>

                            <ul class="condtion-list"
                            v-if="element.hasListCondition"
                            >
                                <li 
                                class="list-decimal ml-6"
                                v-for="(condition, index) in conditions" :key="index"
                                >
                                    {{ condition }}
                                </li>
                            </ul>
                            
                            <div v-if="element.hasRadio">
                                <Radio :element="element.dataRadio"
                                :align="element.align"
                                class="radioElementClass"
                                :radioDefaultCheck="element.dataRadio[0].value"
                                :name="element.checkGroup"
                                @get-radio-input="handleChange($event)"
                                />
                            </div>
                        </div>


                        <ul class="name-list">
                            <li v-for="(listName, iList) in element.name" :key="iList"
                            class="list-disc ml-6"
                            >
                                {{ listName }}
                            </li>
                        </ul>
                        
                        <div :class="`offer__form-inline ${ element.hasAdd ? 'flex-nowrap' : 'flex-wrap'}`">
                            <div  v-for="(data, key) in element.dataInput" :key="key"
                            class="offer__form-input"
                            >
                                <AppInput
                                :name-input="data.id"
                                :label="data.label"
                                :inputType="data.type"
                                :class="` ${ element.hasAdd || element.hasInputFull ? 'basis-full' : '' }`"
                                :placeholder="data.placeholder"
                                :id="data.id"
                                @onInput="handleInput($event)"
                                /> 
                                <span>{{ data.unitMesure }}</span>
                                <div class="offer__icon-add" v-if="element.hasAdd"
                                @click="handleAddNameCondition(data.id)"
                                >
                                    <AddIcon class="icon-add" />
                                </div>
                            </div>
                        </div>

                    </div>

            <!-- This is the signature -->
            <div class="offer__signature">
                <Singature title="Signature" width="100%" height="120px" />
            </div>
            <hr>
    
            <div class="offer__btn-valid">
                <Button type="primary" class="btn-valid-content" width="100%">
                    Valider
                </Button>
            </div>
        </div>

        <!-- This is the docs result of the form -->
        <div class="offer__content-result">
                <DocsResult
                :names="names"
                :conditions="conditions"
                 />
            </div>
        </div>
    


    </div>
</template>


<style lang="scss" scoped>
.offer{
    &__head-mobile{
        @apply mt-2.5 mb-2.5 mb-5 bg-[#fff] rounded-lg flex flex-row items-center py-2.5 gap-2.5 ;
        margin-left: 2%;
        margin-right: 2%;
    }

    &__head-info-icon{
        margin-left: 10px;
    }

    &__head-mobile-title{
        width: 192px;
        height: 17px;

        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;

        color: #000000;
    }

    &__content{
        @apply bg-[#fff] p-2.5 ;
        margin-left: 2%;
        margin-right: 2%;
    }
        
    &__title-content{
        @apply flex flex-row items-center justify-between overflow-hidden rounded-lg ;
    }

    
    &__title{
        @apply mb-2.5 ;
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
    }

    &__content-form{
        @apply flex flex-col ;
        @screen lg{
            @apply w-full ;
        }
    }

    
    &__content-inline-lg{
        @screen lg {
            @apply flex flex-row gap-2.5 ;
        }
    }

    &__content-result{
        @apply hidden;

        @screen lg {
            @apply inline-block w-full bg-[#F2F2F2] p-4 ;
        }
    }


    &__form-inline{
        @apply flex flex-row items-center justify-start gap-2 w-full ;
        &:deep() {
            .fields {
                @apply mb-0 flex flex-row flex-nowrap w-full items-center ;
                
                label{
                    min-width: fit-content;
                    margin-bottom: 0px
                }
            }
        }
    }

    &__icon-add{
        @apply p-[6px] bg-[#F2F2F2] rounded-full ml-[14px] cursor-pointer ;
    }

    &__form-input{
        @apply flex flex-row flex-nowrap items-center justify-start gap-1 sm:flex-1 basis-full ;
        
    }

    &__form-input label{
        color: red ;
    }
    
    &__signature{
        @apply mb-2.5 ;
    }

    &__btn-valid{
        @apply mt-3.5 ;
    }
}

.separator-form{
    @apply mb-2.5 lg:hidden ;
}

.btn-valid-content{
    @apply w-full ;
}

.name-list{
    @apply my-1.5 ;
}


.title-input-dark{
    @apply my-2.5 font-normal text-[#949FB5] ;
}

.radioElementClass{
    &:deep(){
        .ant-radio-group{
        @apply sm:flex sm:flex-row gap-9 ;
        }
    }
}

.condtion-list{
    @apply my-1.5 ;
}
</style>