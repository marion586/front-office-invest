<template>
    <div class="container-card">
        <HeadProduct Text="Agence" label="Label Immo" />
        <img :src="DataCard.image" alt=" card product img" />
        <div class="type-card">
            <Title type="h4" :label="DataCard.type" weight="bold" />
            <span> {{ DataCard.price }} £</span>
        </div>

        <div class="value-card">
            <div class="value-item-card">
                <span>H</span> <span>{{ DataCard.roomCount }}</span>
            </div>
            <div class="value-item-card">
                <span>H</span> <span>{{ DataCard.bedroomCount }}</span>
            </div>
            <div class="value-item-card">
                <span>H</span> <span>{{ DataCard.surface }} m2</span>
            </div>
        </div>
        <div class="action-card">
            <span> ({{ DataCard.interested }}) interessé</span>
            <span> ({{ DataCard.offerSentCount }}) offre envoyé </span>
        </div>
        <div class="adress-card">
            <span>H</span>
            <span>{{ DataCard.adress }} </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import HeadProduct from '@/components/Display/headProduct/HeadProduct.vue';
    import { ref, PropType } from 'vue';
    import Title from '../../Common/Title/Title.vue';
    interface DataProps {
        image: string;
        type: string;
        price: number;
        roomCount: number;
        bedroomCount: number;
        surface: number;
        interested: number;
        offerSentCount: number;
        adress: string;
    }
    const DataCardProps = defineProps({
        DataCard: {
            type: Object as PropType<DataProps>,
            required: true,
        },
    });
    const DataCard = ref(DataCardProps.DataCard);
</script>

<style lang="scss">
    .container-card {
        display: flex;
        flex-direction: column;
        width: 398px;
        height: auto;
        padding: 16px;
        gap: 18px;
        background: #ffffff;
        border-radius: 8px;
        img {
            border-radius: 8px;
            width: auto;
            height: 160px;
        }
        .type-card {
            display: flex;
            justify-content: space-between;
            span {
                color: var(--color-alert-str-rose);
                background: rgba(255, 130, 130, 0.15);
                border-radius: 15px;
                padding: 4px 12px;
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
            }
        }
        .value-card {
            display: flex;
            gap: 18px;
            .value-item-card {
                display: flex;
                align-items: center;
                gap: 5px;
                :last-child {
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 16.44px;
                }
            }
        }
        .action-card {
            display: flex;
            flex-direction: column;
            span {
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 16px;
                color: #797575;
            }
        }
        .adress-card {
            display: flex;
            align-items: center;
            gap: 5px;
            :last-child {
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                color: #a39f9f;
            }
        }
    }
    @media only screen and (min-width: 252px) and (max-width: 398px) {
        .container {
            width: auto;
        }
    }
</style>
