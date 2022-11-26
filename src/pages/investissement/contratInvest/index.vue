<script lang="ts" setup>
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import Title from '@/components/Common/Title/Title.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import html2pdf from 'html2pdf.js';
    import moment from 'moment';
    import { ref } from 'vue';
    const loadSpin = ref(false);
    defineProps({
        dataInvest: {
            type: Object,
            required: true,
        },

        DataResult: {
            type: Object,
            required: true,
        },
    });
    const emit = defineEmits<{
        (e: 'return'): void;
    }>();

    function returnEmit(): void {
        emit('return');
    }
    function exportToPDF() {
        loadSpin.value = true;
        html2pdf(document.getElementById('element-to-convert'), {
            margin: 1,
            filename: 'contrat-investissement.pdf',
        });
        setTimeout(function () {
            loadSpin.value = false;
        }, 30000);
    }
    const date = new Date();
</script>

<template>
    <div class="invest" ref="document">
        <BackButton class="invest__back" @return="returnEmit" />

        <div class="mb-3.5" id="element-to-convert">
            <Title
                type="h4"
                label="Contrat d'investissement"
                weight="600"
                class="invest__result-title"
            />

            <span class="invest__result-span"> Les soussignées(es): </span>
            <ul class="condition-list">
                <li class="list-disc ml-6">{{ DataResult.name }}</li>
            </ul>

            <h4 class="invest__result-title-dark">
                Font, par les présentes, offre d’investissement pour le projet
                ci apprès ci-après:
            </h4>

            <div class="invest__result-head">
                <p>Titre : {{ dataInvest.title }}</p>
                <p>
                    Montant du projet :
                    {{ separatorMillier(dataInvest.amount) }}
                </p>
                <p>
                    Montant Minimale du projet :
                    {{ separatorMillier(dataInvest.amount) }}
                </p>
                <p>Catégorie : {{ dataInvest.categorie }}</p>
                <p>
                    Au Montant de : {{ separatorMillier(DataResult.amount) }} €
                </p>
            </div>

            <div>
                <Paragraphe>
                    Si cette offre d'investissement sera accepté je vais faire
                    le payement le :
                    <span>{{ DataResult.DatePayment }}</span>
                </Paragraphe>
            </div>

            <div class="invest__result-footer">
                <div class="invest__result-footer-signature">
                    <p>
                        Fait à
                        <span class="invest__address">
                            {{ DataResult.address }}
                        </span>
                        le :
                        <span span class="invest__value"
                            >{{ moment(date).format('DD-MM-YYYY') }}
                        </span>
                    </p>

                    <div
                        class="signature__img"
                        v-if="DataResult.imageSignature != ''"
                    >
                        <p>Nom et signatures</p>
                        <img
                            :src="`${DataResult.imageSignature}`"
                            alt="img signature"
                        />
                        <p class="text-center">
                            {{ DataResult.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-btn">
            <Button class="btn-export" @on-click="exportToPDF">
                <a-spin v-if="loadSpin"></a-spin>
                Export to pdf
            </Button>
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .invest {
        @apply flex flex-col gap-[40px] p-4 rounded-md relative;
        border: 1px solid #ccc;
        &__back {
            position: absolute;
        }
        &__result-head {
            @apply font-semibold mb-3 ml-3;
        }

        &__result-title-dark {
            @apply mt-2.5 font-normal text-[#949FB5];
        }

        &__result-content {
            @apply mt-3.5;
        }

        &__result-footer {
            @apply flex flex-row justify-between font-normal mt-4;
        }

        &__value {
            @apply font-medium;
        }
        &__result-title {
            text-align: center;
            margin-bottom: 20px;
        }
        &__result-footer-signature {
            @apply flex flex-row justify-between w-full;
        }
    }

    .signature {
        &__img {
            &:deep(img) {
                @apply w-36 h-32;
            }
            img {
                @apply h-[100px] mt-1;
            }
        }
    }
    .name-list .condition-list {
        @apply my-1.5;
    }

    .paragraphe__normal {
        @apply mb-2 text-justify font-light;
    }

    .my-btn {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .btn-export {
            align-self: end;
        }
    }
</style>
