<template>
    <div class="card max-w-xl">
        <HeadProduct Text="Agence" label="Label Immo" />
        <figure class="card__image">
            <img :src="DataCard.image" alt=" card product img" />
        </figure>
        <div class="card__type">
            <Title type="h4" :label="DataCard.type" weight="bold" />
            <span> {{ DataCard.price }} £</span>
        </div>

        <div class="card__value">
            <div class="card__value--item">
                <Room />
                <span>{{ DataCard.roomCount }}</span>
            </div>
            <div class="card__value--item">
                <Bath />
                <span>{{ DataCard.bedroomCount }}</span>
            </div>
            <div class="card__value--item">
                <Surface />
                <span>{{ DataCard.surface }} m2</span>
            </div>
        </div>
        <div class="card__action">
            <span> ({{ DataCard.interested }}) interessé</span>
            <span> ({{ DataCard.offerSentCount }}) offre envoyé </span>
        </div>
        <div class="card__adress">
            <Map />
            <span>{{ DataCard.adress }} </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import HeadProduct from '@/components/Display/HeadProduct/HeadProduct.vue';
    import { ref, PropType } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Room from '@/components/Icon/Room.vue';
    import Bath from '@/components/Icon/Bath.vue';
    import Map from '@/components/Icon/Map.vue';

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
    defineProps({
        DataCard: {
            type: Object as PropType<DataProps>,
            required: true,
        },
    });
</script>

<style lang="scss" scoped>
    .card {
        display: flex;
        flex-direction: column;
        width: auto;
        height: auto;
        padding: 16px;
        gap: 18px;
        background: #ffffff;
        border-radius: 8px;
        &__image {
            width: auto;
            height: 160px;
            img {
                border-radius: 8px;
                width: 100%;
                height: 100%;
            }
        }

        &__type {
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
        &__value {
            display: flex;
            gap: 18px;
            &--item {
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
        &__action {
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
        &__adress {
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
</style>
