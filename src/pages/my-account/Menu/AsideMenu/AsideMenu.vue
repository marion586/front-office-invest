<template>
    <div class="account__aside-menu__wrapper">
        <div class="account">
            <div class="account__profil">
                <!-- photo header -->
                <div class="account__profil__photo__wrapper">
                    <div class="account__profil__go-back">
                        <ArrowBack @click="goBackHandler" />
                    </div>
                    <figure class="account__profil__photo__content">
                        <div class="img-container">
                            <img
                                v-if="userData.image"
                                :src="userData.image"
                                alt="photo-de-profil"
                            />
                            <div class="img-container__empty-logo">
                                <User size="lg" />
                            </div>
                        </div>
                    </figure>
                    <Title
                        type="h2"
                        :label="userData.firstName + userData.lastName"
                    />
                    <Paragraphe> {{ userData.email }} </Paragraphe>
                </div>

                <!-- profil details -->

                <div class="account__profil__details">
                    <div class="account__profil__details__row">
                        <Title label="Role user" type="h5" weight="bold" />
                        <Paragraphe>{{ userData.typeUser }}</Paragraphe>
                    </div>
                    <hr />
                    <div class="account__profil__details__row">
                        <Title label="Addresse" type="h5" weight="bold" />
                        <Paragraphe>{{ userData.address }} </Paragraphe>
                    </div>
                    <!-- <hr /> -->
                </div>

                <!-- actions buttons -->
                <!-- <div class="account__profil__actions">
                    <div class="account__profil__actions__info">
                        <Button
                            @click="
                                $emit('on-click-menu', {
                                    value: InfoPlus,
                                    label: 'Informations suplémentaires',
                                })
                            "
                            theme="light"
                            class="w-full"
                            >Info plus</Button
                        >
                        <Button class="w-full">Espace</Button>
                    </div>
                    <div class="account__profil__actions__modif">
                        <Button theme="light" class="w-full"
                            >Modier mon profil</Button
                        >
                    </div>
                </div> -->
            </div>
            <hr class="mt-[20px]" />
            <div class="account__menu">
                <ul>
                    <li
                        @click="
                            $emit('on-click-menu', menu),
                                setSelectedMenu(menu.label)
                        "
                        v-for="(menu, index) in menuList"
                        :key="index"
                        :class="{
                            'active-menu': currentLabelMenu === menu.label,
                        }"
                    >
                        <component :is="menu.icon" />
                        <Title :label="menu.label" type="h3" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Photo from '@/components/Icon/Photo.vue';
    import { MENU_LIST } from './account.data';
    import { INVESTOR_MENU_LIST } from './investor.data';
    import { useStore } from 'vuex';
    import { computed, onMounted, ref, shallowRef } from 'vue';
    import User from '@/components/Icon/User.vue';

    /**styles */
    import '@/assets/style/userprofil.scss';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    let menuList = shallowRef();

    defineProps<{
        currentLabelMenu: string;
    }>();

    const store = useStore();

    const userData: any = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    console.log(userData.value);
    onMounted(() => {
        if (userData.value.typeUser === 'Apporteur') {
            menuList.value = MENU_LIST;
        } else {
            menuList.value = INVESTOR_MENU_LIST;
        }
    });

    function goBackHandler() {
        router.go(-1);
    }
    function setSelectedMenu(label: string) {
        console.log('DBG....');
        store.dispatch('AccountMenuSelectedModule/setSelectedMenu', label);
    }
</script>

<style lang="scss" scoped>
    .account__profil__photo__content {
        transition: transform 0.3s ease 0s;
    }
    .account__profil__photo__content:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .img-container:hover {
        transform: scale(1.1);
    }
</style>
