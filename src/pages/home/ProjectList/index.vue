<script lang="ts" setup>
    import projectService from '@/services/projectService';
    import ProjectCard from '@/components/Display/ProjectCard/ProjectCard.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Common/Modal/content/Modal.vue';
    import Input from '@/components/Common/Input/Input.vue';

    import { computed, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    const userData = computed(() => store.getters['UserModule/setUserDetails']);
    const onload = ref(false);
    console.log(userData.value);
    const dataCard = ref<any>([]);

    const showModal = ref(false);
    const urlImgData = ref('');

    const addData = ref({
        name: null,
        title: null,
        amountMin: null,
        amount: null,
        content: null,
        description: null,
        categorie: null,
        user: userData.value,
    });

    function handleInput(e: any) {
        addData.value = { ...addData.value, [e.target.name]: e.target.value };
    }

    async function handleAddFile(e: any) {
        if (e.target.files) {
            console.log(e);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (e.target.result) {
                    urlImgData.value = e.target.result;
                    console.log(urlImgData.value, 'value');
                    addData.value = {
                        ...addData.value,
                        [e.target.name]: urlImgData.value,
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
    async function getProducts() {
        const { data } = await projectService.getProject();
        console.log('data', data);
        data.forEach((d: object) => {
            dataCard.value.push(d);
        });
    }
    onMounted(() => {
        getProducts();
    });
</script>

<template>
    <div class="project container">
        <div class="project__btn">
            <Button @on-click="handleShowModal"> Nouveau Projet </Button>
            <div id="myModal">
                <Modal
                    :isShowModal="showModal"
                    titleModal="Creation Nouveau Categorie"
                    contentId="myModal"
                    modalWidth="700px"
                >
                    <template #content>
                        <Input
                            placeholder="categorie Name"
                            label="Nom du categorie:"
                            name="name"
                            inputType="number"
                            @onInput="handleInput"
                        />

                        <Input
                            class="input-file"
                            placeholder="categorie Name"
                            label="Image"
                            name="file"
                            inputType="file"
                            @onInput="handleAddFile"
                        />
                        <div class="button-section">
                            <Button typeButton="secondary">
                                <span>Annuler</span>
                            </Button>

                            <Button typeButton="secondary">
                                <a-spin v-if="onload" /><span>Valider</span>
                            </Button>
                        </div>
                    </template>
                </Modal>
            </div>
        </div>

        <div class="project__list">
            <ProjectCard
                v-for="data in dataCard"
                :key="data._id"
                :DataCard="data"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .project {
        @apply flex flex-col gap-[24px] items-center mt-[20px];

        &__btn {
            @apply flex justify-end p-[30px] w-full border-[1px] border-[#ccc] rounded-md;
        }
        &__list {
            @apply grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3   gap-[24px];
        }
    }
</style>
