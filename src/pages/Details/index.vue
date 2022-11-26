<script lang="ts" setup>
    import ProjectCard from '@/components/Display/ProjectCard/ProjectCard.vue';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import HeadProduct from '@/components/Display/HeadProduct/HeadProduct.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ButtonMenuVue from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import Finance from '@/components/Icon/Finance.vue';

    import detailPaiementService from '@/services/detailPaiementService';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const route = useRoute();

    const store = useStore();
    let dataStore = computed(() => store.getters['ProjectModule/getData']);

    let details = computed(() => store.getters['ProjectModule/getDetails']);
    const userData = computed(() => store.getters['UserModule/getUserDetails']);

    async function showDetails(id: any) {
        let Details = dataStore.value.find((item: any) => item._id === id);
        await store.dispatch('ProjectModule/setDetails', Details);
        const { data } = await detailPaiementService.getDetail();
        if (userData.value.id === Details.user.id) {
            router.push(`/Details/${id}`);
        } else {
            if (data.length > 0) {
                const dataUserPayed = data.find(
                    (item: any) =>
                        item.user_id === userData.value.id &&
                        Details._id === item.project_id
                );

                if (dataUserPayed) {
                    router.push(`/Details/${id}`);
                } else {
                    router.push(`/detail-paiement`);
                }
            } else {
                router.push(`/detail-paiement`);
            }
        }
    }

    async function makeInvest(id: any) {
        let Details = await computed(
            () => store.getters['ProjectModule/getDetails']
        );
        await store.dispatch(
            'ProjectModule/setSingleProjectInvest',
            Details.value
        );

        router.push('/investissement');
    }
</script>

<template>
    <div class="details">
        <div class="details__details">
            <figure class="details__image">
                <img :src="details.image" alt="" />
            </figure>
            <div class="details__header">
                <HeadProduct
                    :image="details.user.image"
                    :Text="details.user.email"
                    :label="`${details.user.firstName} ${details.user.lastName} `"
                />
            </div>

            <Title type="h2" :label="details.title" :weight="600" />

            <div class="details__content">
                <div class="details__content-type">
                    <Title type="h5" label="Mountant Totale:" />
                    <span>{{ details.amount }} £</span>
                </div>
                <div class="details__content-type">
                    <Title type="h5" label="Mountant Minimale:" />
                    <span>{{ details.amountMin }} £</span>
                </div>
            </div>
            <div class="details__content">
                <div>
                    <Title type="h5" label="Description:" :weight="600" />
                    <Paragraphe>{{ details.description }}</Paragraphe>
                </div>

                <div>
                    <Title type="h5" label="Contenu:" :weight="600" />
                    <Paragraphe>{{ details.content }}</Paragraphe>
                </div>
            </div>

            <div class="details__btn">
                <ButtonMenuVue
                    :isIcon="Finance"
                    @on-click="makeInvest"
                    width="400px"
                >
                    Investir
                </ButtonMenuVue>
                <!-- <ButtonMenuVue :isIcon="Finance" width="400px">
                    Postuler
                </ButtonMenuVue> -->
            </div>
        </div>
        <div class="details__list">
            <ProjectCard
                @showDetails="showDetails"
                :DataCard="item"
                v-for="(item, index) in dataStore"
                :key="index"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .details {
        @apply p-[20px] grid grid-cols-4 gap-[20px] w-full;

        &__btn {
            @apply flex gap-[20px] mt-[50px];
        }
        &__details {
            @apply col-span-3  relative w-full h-[100vh];
        }
        &__image {
            object-fit: cover;
            @apply w-full h-[400px];

            img {
                @apply w-full h-full rounded-md;
                object-fit: cover;
            }
        }
        &__header {
            background-color: #432f2f3d;
            @apply p-[10px] rounded-md;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
        }
        h2 {
            text-align: center;
            color: 14223c;
            margin-bottom: 20px;
        }
        &__content {
            @apply border-[1px] rounded-md p-[20px] flex flex-col gap-[10px] mb-[10px];
            &-type {
                @apply flex justify-center gap-[100px];
                span {
                    color: var(--color-alert-str-rose);
                    background: rgba(255, 130, 130, 0.15);
                    border-radius: 15px;
                    padding: 4px 12px;
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 17px;
                }
            }
        }
        &__list {
            @apply flex flex-col col-span-1 gap-[20px];
        }
    }
</style>
