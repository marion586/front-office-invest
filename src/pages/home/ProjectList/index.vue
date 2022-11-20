<script lang="ts" setup>
    import categorieService from '@/services/categorieService';
    import ProjectCard from '@/components/Display/ProjectCard/ProjectCard.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Common/Modal/content/Modal.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import detailPaiementService from '@/services/detailPaiementService';

    import { useRouter } from 'vue-router';
    import { data } from './data';

    import { computed, inject, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';

    const isBordered = inject('isBordered');
    const border = ref(isBordered ? '1px solid #ccc' : 'none');
    const props = defineProps({
        isPublic: {
            type: Boolean,
            default: true,
        },
        dataProps: {
            type: Object,
            required: true,
        },
    });

    const router = useRouter();

    const store = useStore();
    const userData = computed(() => store.getters['UserModule/getUserDetails']);
    const onload = ref(false);
    const dataCard = ref<any>(props.dataProps);

    const showModal = ref(false);
    const urlImgData = ref('');

    let selectData = ref<any>([]);
    let filterData = ref<any>([]);
    let filterPostuledData = ref<any>([
        {
            value: 'Postulé',
            label: 'Postulé',
        },
        {
            value: 'Non Postulé',
            label: 'Non Postulé',
        },
    ]);
    let amountFilter = ref([
        {
            value: 'Mont asc',
            label: 'Mont asc',
        },
        {
            value: 'Mont dsc',
            label: 'Mont dsc',
        },
    ]);
    const addData = ref({
        title: null,
        amountMin: null,
        amount: null,
        content: null,
        description: null,
        categorie: null,
        image: null,
        user: userData.value,
    });

    function handleInput(e: any) {
        addData.value = { ...addData.value, [e.target.name]: e.target.value };
    }

    async function handleAddFile(event: any) {
        let name = event.target.name;
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (e.target.result) {
                    urlImgData.value = e.target.result;
                    addData.value = {
                        ...addData.value,
                        [name]: urlImgData.value,
                    };
                }
            };
            await reader.readAsDataURL(file);
        }
    }
    function handleShowModal() {
        showModal.value = !showModal.value;
        console.log(showModal.value);
    }

    async function getCategorie() {
        const { data } = await categorieService.getCategorie();
        data.forEach((d: any) => {
            const obj = {
                value: d.name,
                label: d.name,
            };

            selectData.value.push(obj);
            filterData.value.push(obj);
        });
        filterData.value.push({
            value: 'Tous',
            label: 'Tous',
        });
    }
    function handleSelect(e: any) {
        let key = Object.keys(e)[0];
        addData.value = { ...addData.value, [key]: e[key] };
    }

    function handleTextArea(e: any) {
        console.log(e);
        addData.value = { ...addData.value, [e.target.name]: e.target.value };
    }

    async function addProject() {
        onload.value = true;
        await store.dispatch('ProjectModule/setData', addData.value);
        dataCard.value.push(addData.value);
        showModal.value = false;
        onload.value = false;
    }

    function categorieFilter(e: any) {
        console.log(e);
        if (e['filter'] !== 'Tous') {
            dataCard.value = props.dataProps.filter(
                (item: any) => e['filter'] === item.categorie
            );
        } else {
            dataCard.value = props.dataProps.map((item: any) => item);
        }

        console.log(dataCard.value);
    }
    function handleSearch(e: any) {
        if (e.target.value === '') {
            dataCard.value = props.dataProps.map((item: any) => item);
        } else {
            dataCard.value = dataCard.value.filter((item: any) =>
                item.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
        }
    }
    function filterAmount(e: any) {
        console.log(e);
        if (e.trier === 'Mont asc') {
            dataCard.value = dataCard.value.sort(
                (a: any, b: any) => a.amount - b.amount
            );
        } else {
            dataCard.value = dataCard.value.sort(
                (a: any, b: any) => b.amount - a.amount
            );
        }
    }

    function filterPostuled(e: any) {
        console.log(e);
        if (e['postule'] === 'Postulé') {
            dataCard.value = dataCard.value.filter(
                (item: any) => item.isPostuled == true
            );
        } else {
            dataCard.value = dataCard.value.filter(
                (item: any) => item.isPostuled == false
            );
        }
    }

    async function showDetails(id: any) {
        let Details = props.dataProps.find((item: any) => item._id === id);
        await store.dispatch('ProjectModule/setDetails', Details);
        const { data } = await detailPaiementService.getDetail();
        if (userData.value._id === Details.user._id) {
            router.push(`/Details/${id}`);
        } else {
            if (data.length > 0) {
                const dataUserPayed = data.find(
                    (item: any) =>
                        item.user_id === userData.value._id &&
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

    onMounted(() => {
        getCategorie();
    });
</script>

<template>
    <div class="project container">
        <div class="project__btn">
            <Button @on-click="handleShowModal" v-if="isPublic">
                Nouveau Projet
            </Button>
            <Input
                placeholder="Rechercher"
                nameInput="search"
                inputType="text"
                @onInput="handleSearch"
            />
            <Select
                name="filter"
                placeholder="select"
                :options="filterData"
                label="Filtrer Catégorie:"
                @change-select="categorieFilter"
            />
            <Select
                name="trier"
                placeholder="select"
                :options="amountFilter"
                label="Trier Montant:"
                @change-select="filterAmount"
            />
            <Select
                name="postule"
                placeholder="select"
                :options="filterPostuledData"
                label="Filtrer Postule:"
                @change-select="filterPostuled"
                v-if="isPublic"
            />
            <div id="myModal">
                <Modal
                    :isShowModal="showModal"
                    titleModal="Creation Nouveau Categorie"
                    contentId="myModal"
                    modalWidth="700px"
                >
                    <template #content>
                        <div class="content">
                            <template v-for="(d, index) in data" :key="index">
                                <Input
                                    v-if="d.elementType === 'inputFile'"
                                    :placeholder="d.hint"
                                    :label="d.label"
                                    :nameInput="d.name"
                                    :inputType="d.type"
                                    @onInput="handleAddFile"
                                />
                                <Input
                                    v-if="d.elementType === 'input'"
                                    :placeholder="d.hint"
                                    :label="d.label"
                                    :nameInput="d.name"
                                    :inputType="d.type"
                                    @onInput="handleInput"
                                />

                                <TextArea
                                    v-if="d.elementType === 'textarea'"
                                    :label="d.label"
                                    :required="true"
                                    :nameInput="d.name"
                                    :show-count="true"
                                    @on-input-area="handleTextArea"
                                />
                            </template>

                            <Select
                                name="categorie"
                                placeholder="select"
                                :options="selectData"
                                label="catégorie"
                                @change-select="handleSelect"
                            />
                            <div class="button-section">
                                <Button typeButton="secondary">
                                    <span>Annuler</span>
                                </Button>

                                <Button
                                    typeButton="secondary"
                                    @on-click="addProject"
                                >
                                    <a-spin v-if="onload" /><span>Valider</span>
                                </Button>
                            </div>
                        </div>
                    </template>
                </Modal>
            </div>
        </div>

        <div :class="isPublic ? 'project__list-public' : 'project__list'">
            <ProjectCard
                v-for="data in dataCard"
                @showDetails="showDetails"
                :key="data._id"
                :DataCard="data"
                :isPublic="isPublic"
            />
        </div>
        <div v-if="dataCard.length == 0" class="project__empty">
            <a-empty description="Donnée vide" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .project {
        @apply flex flex-col gap-[24px] items-center mt-[20px];

        &__btn {
            @apply flex justify-end p-[20px] gap-[20px] items-end w-full  rounded-md;
            background-color: #fff;
            border: v-bind(border);
        }
        &__list {
            @apply grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full  gap-[24px];
        }
        &__list-public {
            @apply grid sm:grid-cols-1 lg:grid-cols-2 w-full  gap-[24px];
        }
        &__empty {
            @apply h-[50vh] flex items-center justify-center;
        }
        .content {
            @apply flex flex-col gap-[10px];
        }
        .button-section {
            @apply flex justify-end gap-[12px];
        }
    }
</style>
