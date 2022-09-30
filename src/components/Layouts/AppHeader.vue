<script setup lang="ts">
    import store from '@/store';
    import { ref, watch } from 'vue';
    import IconMenu from '@/components/Icon/IconMenu.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import AAffix from 'ant-design-vue/lib/affix';
    import AMenu from 'ant-design-vue/lib/menu';
    import ASubMenu from 'ant-design-vue/lib/menu/src/SubMenu';
    import AMenuItemGroup from 'ant-design-vue/lib/menu/src/ItemGroup';
    import AMenuItem from 'ant-design-vue/lib/menu/src/MenuItem';
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';

    const isLoggedIn = ref<boolean>(false);
    watch(
        () => store.getters['UserModule/getUserDetails'],
        function (user) {
            isLoggedIn.value = !!user;
            console.log(
                isLoggedIn.value,
                store.getters['UserModule/getUserDetails']
            );
        },
        { immediate: true }
    );
    const dataMenu = [
        {
            label: 'Accueil',
            path: '/',
        },
        {
            label: 'Immobilier',
            path: '#',
            submenu: [
                {
                    label: 'Vendre un bien',
                    path: '/',
                },
                {
                    label: 'Acquérir un bien',
                    path: '/',
                },
                {
                    label: 'Mettre un bien en location',
                    path: '/',
                },
                {
                    label: 'Louer un bien',
                    path: '/',
                },
                {
                    label: 'ImmoGo',
                    path: '/',
                },
            ],
        },
        {
            label: 'Finance',
            path: '#',
            submenu: [
                {
                    label: 'Vendre un bien',
                    path: '/',
                },
                {
                    label: 'Acquérir un bien',
                    path: '/',
                },
                {
                    label: 'Mettre un bien en location',
                    path: '/',
                },
                {
                    label: 'Louer un bien',
                    path: '/',
                },
                {
                    label: 'ImmoGo',
                    path: '/',
                },
            ],
        },
        {
            label: 'Travaux',
            path: '#',
            submenu: [
                {
                    label: 'Vendre un bien',
                    path: '/',
                },
                {
                    label: 'Acquérir un bien',
                    path: '/',
                },
                {
                    label: 'Mettre un bien en location',
                    path: '/',
                },
                {
                    label: 'Louer un bien',
                    path: '/',
                },
                {
                    label: 'ImmoGo',
                    path: '/',
                },
            ],
        },
        {
            label: 'Transport',
            path: '/',
        },
        {
            label: 'Art’home',
            path: '/',
        },
    ];
</script>

<template>
    <a-affix :offset-top="0">
        <header class="header">
            <div class="header__mobile">
                <div>
                    <Paragraphe type="bold"> Accueil </Paragraphe>
                </div>
                <div class="header__menu">
                    <IconMenu />
                </div>
            </div>
            <div class="header__desc">
                <Paragraphe type="bold"> Immo </Paragraphe>
                <div class="header__content-menu">
                    <a-menu mode="horizontal">
                        <a-sub-menu key="sub1">
                            <template #title>
                                <span>Immobilier</span>
                                <ArrowBottom />
                            </template>
                            <a-menu-item-group title="Item 1">
                                <a-menu-item key="setting:1"
                                    >Option 1</a-menu-item
                                >
                                <a-menu-item key="setting:2"
                                    >Option 2</a-menu-item
                                >
                            </a-menu-item-group>
                            <a-menu-item-group title="Item 2">
                                <a-menu-item key="setting:3"
                                    >Option 3</a-menu-item
                                >
                                <a-menu-item key="setting:4"
                                    >Option 4</a-menu-item
                                >
                            </a-menu-item-group>
                        </a-sub-menu>
                    </a-menu>
                    <router-link
                        v-for="(d, index) in dataMenu"
                        :key="index"
                        :to="d.path"
                    >
                        {{ d.label }}
                    </router-link>
                </div>
                <div class="header__user"></div>
            </div>
        </header>
        <!-- <router-link to="/">HOME</router-link> |
        <router-link to="/about">ABOUT</router-link> |
        <router-link v-if="!isLoggedIn" to="/connexion">CONNEXION</router-link> |
        <router-link v-if="!isLoggedIn" to="/inscription">INSCRIPTION</router-link>
        | <router-link to="/mon-compte">MON COMPTE</router-link> |
        <router-link v-if="isLoggedIn" to="/logout">DECONNEXION</router-link> -->
    </a-affix>
</template>

<style lang="scss" scoped>
    .header {
        background-color: #fff;
        padding: 14px 12px;
        &__menu {
            cursor: pointer;
        }
        &__mobile {
            @apply flex justify-between;
            @screen lg {
                display: none;
            }
        }
        &__desc {
            display: none;
            @screen lg {
                @apply flex justify-between;
            }
        }
        &__content-menu {
            @apply flex gap-[35px];
        }
        &::v-deep {
            .ant-menu-horizontal {
                border-bottom: 0;
            }
            .ant-menu-horizontal:not(.ant-menu-dark)
                > .ant-menu-submenu:hover::after {
                content: none;
            }
            .ant-menu-title-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .ant-menu-overflow {
                align-items: center;
                line-height: normal;
            }
        }
    }
</style>
