<script lang="ts" setup>
    import projectService from '@/services/projectService';
    import categorieService from '@/services/categorieService';
    import ProjectCard from '@/components/Display/ProjectCard/ProjectCard.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Common/Modal/content/Modal.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { data } from './data';

    import { computed, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    const userData = computed(() => store.getters['UserModule/getUserDetails']);
    const onload = ref(false);
    const dataCard = ref<any>([]);

    const showModal = ref(false);
    const urlImgData = ref('');

    let selectData = ref<any>([]);
    let filterData = ref<any>([]);

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
    async function getProjectsList() {
        onload.value = true;
        await store.dispatch('ProjectModule/initializeData');
        const data = computed(() => store.getters['ProjectModule/getData']);
        console.log(data.value, 'value');
        data.value.forEach((d: object) => {
            dataCard.value.push(d);
        });
        onload.value = false;
    }
    async function getCategorie() {
        const { data } = await categorieService.getCategorie();
        data.forEach((d: any) => {
            const obj = {
                value: d.name,
                label: d.name,
            };

            selectData.value.push(obj);
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
        await store.dispatch('ProjectModule/setData');
        dataCard.value.push(addData.value);
        showModal.value = false;
        onload.value = false;
    }

    function categorieFilter(e: any) {
        console.log(e);
    }
    function setFilterData() {
        console.log(selectData.value, 'selectData');
        selectData.value.forEach((a: any) => {
            console.log(a);
            filterData.value.push(a);
        });
        filterData.value.push({
            value: 'Tous',
            label: 'Tous',
        });
    }

    onMounted(() => {
        getProjectsList();
        getCategorie();
        setFilterData();
    });
</script>

<template>
    <div class="project container">
        <div class="project__btn">
            <Button @on-click="handleShowModal"> Nouveau Projet </Button>
            <Select
                name="categorie"
                placeholder="select"
                :options="filterData"
                label="Filtrer Par catégorie"
                @change-select="categorieFilter"
            />
            <div id="myModal">
                <Modal
                    :isShowModal="showModal"
                    titleModal="Creation Nouveau Categorie"
                    contentId="myModal"
                    modalWidth="700px"
                >
                    <template #content>
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
                                @on-input="handleTextArea"
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
                    </template>
                </Modal>
            </div>
        </div>

        <Loader v-if="onload" />
        <div v-else class="project__list">
            <ProjectCard
                v-for="data in dataCard"
                :key="data._id"
                :DataCard="data"
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
            @apply flex justify-end p-[30px] gap-[20px] items-end w-full border-[1px] border-[#ccc] rounded-md;
        }
        &__list {
            @apply grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full  gap-[24px];
        }
        &__empty {
            @apply h-[50vh] flex items-center justify-center;
        }

        .button-section {
            @apply flex justify-end gap-[12px];
        }
    }
</style>
