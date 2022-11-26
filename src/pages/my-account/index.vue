<template>
    <ProfilPrototype
        :AsideMenuProps="AsideMenu"
        :DefaultMenu="defMenu"
        :defaultMenuLabel="defLabel"
    />
</template>
<script lang="ts" setup>
    import { useStore } from 'vuex';
    import { computed, onBeforeMount, onMounted, ref, shallowRef } from 'vue';
    import AsideMenu from './Menu/AsideMenu/AsideMenu.vue';
    import Project from './Menu/project/project.vue';
    import ProjectInvestit from './Menu/Investisseurs/projetInvestit/index.vue';
    import { useRoute, useRouter } from 'vue-router';
    import ProfilPrototype from './ProfilPrototype/ProfilPrototype.vue';
    import { MENU_LIST } from './Menu/AsideMenu/account.data';

    const route = useRoute();
    const router = useRouter();

    const store = useStore();
    const userData: any = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    const defMenu = shallowRef<any>(null);
    const defLabel = shallowRef('');

    onMounted(() => {});
    onBeforeMount(() => {
        const selectedMenu =
            store.getters['AccountMenuSelectedModule/getSelectedMenu'];
        if (selectedMenu) {
            MENU_LIST.forEach((item: any) => {
                if (item.label === selectedMenu) {
                    defMenu.value = item.value;
                    defLabel.value = selectedMenu;
                }
            });
        } else {
            if (userData.value.typeUser === 'Investisseur') {
                defMenu.value = ProjectInvestit;
                defLabel.value = 'Mes projet investit';
            } else {
                defMenu.value = Project;
                defLabel.value = 'Mes Projets';
            }
        }
    });
</script>

<style lang="scss" scoped></style>
