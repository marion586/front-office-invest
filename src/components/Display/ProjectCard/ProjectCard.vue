<script lang="ts" setup>
    import HeadProduct from '@/components/Display/HeadProduct/HeadProduct.vue';
    import { ref, PropType, inject, watch, onMounted } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Room from '@/components/Icon/Room.vue';
    import Bath from '@/components/Icon/Bath.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import CardType from './CardType';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    const router = useRouter();

    const isBordered = inject('isBordered');
    const border = ref(isBordered ? '1px solid #ccc' : 'none');

    const store = useStore();

    const props = defineProps({
        DataCard: {
            type: Object as PropType<CardType>,
            required: true,
        },

        isPublic: {
            type: Boolean,
            default: true,
        },
    });

    const status = ref('pending');

    function setStatus() {
        switch (props.DataCard.status) {
            case 'En attente':
                status.value = 'pending';
                break;
            case 'En cours':
                status.value = 'progress';
                break;
            case 'Fini':
                status.value = 'Finished';
                break;
        }
    }
    watch(
        () => props.DataCard.status,
        function (value) {
            setStatus();
        },
        {
            immediate: true,
            deep: true,
        }
    );

    async function postulate(data: any) {
        await store.dispatch('StripeModule/initializeProjectData', data);
        router.push('/postule');
    }

    onMounted(() => {
        setStatus();
        console.log(props.DataCard.status);
    });
</script>

<template>
    <div class="card max-w-xl">
        <HeadProduct
            :image="DataCard.user.image"
            :Text="DataCard.user.email"
            :label="`${DataCard.user.firstName} ${DataCard.user.lastName} `"
        />
        <figure class="card__image" @click="$emit('showDetails', DataCard._id)">
            <img
                :src="DataCard.image ? DataCard.image : ' '"
                alt=" card product"
            />
        </figure>
        <div class="card__content-type">
            <Title type="h4" :label="DataCard.title" weight="bold" />
            <Title type="h5" :label="DataCard.categorie" weight="bold" />
        </div>

        <div :class="`card__action card--${status}`">
            <span> {{ DataCard.status }}</span>
        </div>

        <div class="card__content">
            <div class="card__content-type">
                <Title type="h5" label="Mountant Totale:" />
                <span>{{ DataCard.amount }} £</span>
            </div>
            <div class="card__content-type">
                <Title type="h5" label="Mountant Minimale:" />
                <span>{{ DataCard.amountMin }} £</span>
            </div>

            <div class="card__content-type">
                <Title type="h5" label="Description:" />
                <p
                    class="card__content-type--description text-clip overflow-hidden"
                >
                    {{ DataCard.description }}
                </p>
            </div>
        </div>

        <div class="card__value" v-if="isPublic">
            <div class="card__value--item">
                <Room />
                <span>Edit</span>
            </div>
            <div class="card__value--item">
                <Bath />
                <span>Supprimer</span>
            </div>
        </div>
        <template v-if="isPublic">
            <Button
                v-if="DataCard.isPotuled"
                :disabled="true"
                width="100%"
                type="primary"
                @click="postulate(DataCard)"
            >
                Postulée
            </Button>
            <Button
                v-else
                width="100%"
                type="primary"
                @click="postulate(DataCard)"
            >
                Postuler
            </Button>
        </template>
    </div>
</template>

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
        width: auto;
        border: v-bind(border);
        &__image {
            width: auto;
            height: 160px;
            img {
                border-radius: 8px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__content {
            @apply flex flex-col gap-[10px] border-[1px] p-4 rounded-md;
            &-type {
                display: flex;
                justify-content: space-between;
                span,
                p {
                    color: var(--color-alert-str-rose);
                    background: rgba(255, 130, 130, 0.15);
                    border-radius: 15px;
                    padding: 4px 12px;
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 17px;
                    width: fit-content;
                }
                &--description {
                    text-align: end;
                    width: min-content;
                }
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
                    font-size: 12px;
                    line-height: 16.44px;
                }
            }
        }
        &__action {
            width: 100%;
            text-align: center;

            align-self: end;
            span {
                font-style: normal;
                font-weight: 600;
                font-size: 12px;
                line-height: 16px;
                color: #797575;
            }
        }
        &--pending {
            @apply rounded-sm bg-[#ccc] p-1;
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
