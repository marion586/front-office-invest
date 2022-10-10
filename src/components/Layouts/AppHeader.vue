<script setup lang="ts">
    import store from '@/store';
    import { ref, watch, onMounted } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import { dataMenu } from './dataHeader';
    import {
        Affix as AAffix,
        Menu as AMenu,
        SubMenu as ASubMenu,
        MenuItemGroup as AMenuItemGroup,
        MenuItem as AMenuItem,
    } from 'ant-design-vue';

    /* icon */
    import IconMenu from '@/components/Icon/IconMenu.vue';
    import Search from '@/components/Icon/Search.vue';
    /* end icon */

    const isLoggedIn = ref<boolean>(false);
    const isMenu = ref<boolean>(false);

    const handleShowMenu = () => {
        isMenu.value = !isMenu.value;
    };
    onMounted(() => {
        console.log('update');
    });
    watch(
        () => store.getters['UserModule/getUserDetails'],
        function (user) {
            isLoggedIn.value = !!user;
            console.log(
                isLoggedIn.value,
                store.getters['UserModule/getUserDetails']
            );
        },
        { immediate: true, deep: true }
    );
</script>

<template>
    <a-affix :offset-top="0">
        <header class="header">
            <div class="header__mobile">
                <div>
                    <Paragraphe type="bold"> Accueil </Paragraphe>
                </div>
                <div class="header__menu" @click="handleShowMenu">
                    <IconMenu />
                </div>
                <div
                    class="header__content-menu-mobile"
                    :class="{ 'menu-active': isMenu }"
                >
                    <a-menu mode="inline">
                        <template v-for="(d, index) in dataMenu">
                            <template v-if="!d.submenu">
                                <a-menu-item :key="`alipay-${index}`">
                                    <router-link
                                        @click="handleShowMenu"
                                        :to="d.path"
                                    >
                                        {{ d.label }}
                                    </router-link>
                                </a-menu-item>
                            </template>
                            <a-sub-menu :key="`sub-${index}`" v-else>
                                <template #title>
                                    <span>{{ d.label }}</span>
                                </template>
                                <a-menu-item-group
                                    v-for="(s, key) in d.submenu"
                                    :key="key"
                                >
                                    <a-menu-item :key="`setting:${key}`">
                                        <router-link
                                            @click="handleShowMenu"
                                            :to="s.path"
                                        >
                                            {{ s.label }}
                                        </router-link>
                                    </a-menu-item>
                                </a-menu-item-group>
                            </a-sub-menu>
                        </template>
                        <template v-if="!isLoggedIn">
                            <a-menu-item :key="`setting:100`">
                                <router-link
                                    @click="handleShowMenu"
                                    to="/connexion"
                                    >Connexion</router-link
                                >
                            </a-menu-item>
                        </template>
                        <template v-else>
                            <a-menu-item :key="`setting:1002`">
                                <router-link
                                    @click="handleShowMenu"
                                    to="/logout"
                                    >Deconnection</router-link
                                >
                            </a-menu-item>
                        </template>
                    </a-menu>
                </div>
            </div>
            <div class="header__desc">
                <Paragraphe type="bold"> Immo </Paragraphe>
                <div class="header__content-menu">
                    <a-menu mode="horizontal">
                        <template v-for="(d, index) in dataMenu">
                            <template v-if="!d.submenu && d.view === 'all'">
                                <a-menu-item :key="`alipay-${index}`">
                                    <router-link :to="d.path">
                                        {{ d.label }}
                                    </router-link>
                                </a-menu-item>
                            </template>
                            <a-sub-menu
                                :key="`sub-${index}`"
                                v-else-if="d.submenu && d.view !== 'mobile'"
                            >
                                <template #title>
                                    <span>{{ d.label }}</span>
                                    <ArrowBottom
                                        v-if="d.submenu && d.submenu.length > 0"
                                    />
                                </template>
                                <a-menu-item-group
                                    v-for="(s, key) in d.submenu"
                                    :key="key"
                                >
                                    <a-menu-item :key="`setting:${key}`">
                                        <router-link :to="s.path">
                                            {{ s.label }}
                                        </router-link>
                                    </a-menu-item>
                                </a-menu-item-group>
                            </a-sub-menu>
                        </template>
                    </a-menu>
                </div>
                <div v-if="!isMenu" class="header__user header__menu-rigth">
                    <a-menu mode="horizontal">
                        <a-menu-item key="20">
                            <router-link to="/">
                                <Search />
                            </router-link>
                        </a-menu-item>
                        <a-sub-menu key="sub-100">
                            <template #title>
                                <figure class="header__avatar">
                                    <img src="" alt="" />
                                </figure>
                                <ArrowBottom />
                            </template>
                            <a-menu-item-group v-if="!isLoggedIn">
                                <a-menu-item :key="`setting:100`">
                                    <router-link to="/connexion"
                                        >Connexion</router-link
                                    >
                                </a-menu-item>
                                <a-menu-item :key="`setting:1001`">
                                    <router-link to="/inscription"
                                        >Inscription</router-link
                                    >
                                </a-menu-item>
                            </a-menu-item-group>
                            <a-menu-item-group v-else>
                                <a-menu-item :key="`setting:1002`">
                                    <router-link to="/logout"
                                        >Deconnection</router-link
                                    >
                                </a-menu-item>
                            </a-menu-item-group>
                        </a-sub-menu>
                    </a-menu>
                </div>
            </div>
        </header>
    </a-affix>
</template>

<style lang="scss" scoped>
    .header {
        background-color: #fff;
        padding: 14px 15px;
        position: relative;
        z-index: 9;
        box-shadow: 0 0 3px var(--color-primary);
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
            max-width: 1170px;
            width: 100%;
            margin: auto;
            @screen lg {
                @apply flex justify-between;
            }
            p {
                @apply flex items-center;
            }
        }
        &__content-menu {
            @apply flex gap-[35px];
        }
        &__avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: var(--color-primary);
        }
        &__content-menu-mobile {
            position: fixed;
            width: calc(100vw - 50px);
            transform: translateX(100%);
            top: 49px;
            right: 0;
            background-color: #fff;
            height: calc(100vh - 49px);
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            overflow: auto;
            transition: transform 0.25s ease;
        }
        .menu-active {
            transform: translateX(0);
            transition: transform 0.25s ease;
        }
        &__menu-rigth {
            body & {
                .ant-menu-overflow {
                    @apply gap-[10px];
                }
            }
        }
        &:deep() {
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
                @apply gap-[35px];
            }
            .ant-menu-overflow-item {
                padding: 0;
            }
            .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover {
                color: var(--color-secondary);
            }
            .ant-menu-vertical {
                padding-top: 10px;
            }
        }
    }
</style>
