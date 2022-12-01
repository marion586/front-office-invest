<script setup lang="ts">
    import { ref, watch, onMounted, watchEffect, computed } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

    /* icon */
    import Login from '@/components/Icon/Login.vue';
    import Logout from '@/components/Icon/Logout.vue';
    import AddUser from '@/components/Icon/AddUser.vue';
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import Search from '@/components/Icon/Search.vue';
    import User from '@/components/Icon/User.vue';

    import { dataMenu } from './dataHeader';

    import {
        Affix as AAffix,
        Menu as AMenu,
        SubMenu as ASubMenu,
        MenuItemGroup as AMenuItemGroup,
        MenuItem as AMenuItem,
    } from 'ant-design-vue';
    import { useStore } from 'vuex';
    import router from '@/routes';

    const activeUser = ref<any>({});

    const isLoggedIn = ref<boolean>(false);
    const isMenu = ref<boolean>(false);
    const fakeLoadAvatar = ref<boolean>(true);
    const store = useStore();

    const handleShowMenu = () => {
        isMenu.value = !isMenu.value;
    };

    onMounted(async () => {
        setTimeout(() => {
            fakeLoadAvatar.value = false;
        }, 1000);

        const userStore = await computed(
            () => store.getters['UserModule/getUserDetails']
        );
        if (Object.keys(userStore.value).length !== 0) {
            isLoggedIn.value = true;
        } else {
            router.push('/inscription');
        }
        Object.assign(activeUser, userStore);
    });
    watchEffect(() => {
        window.addEventListener('resize', () => {
            fakeLoadAvatar.value = true;
            setTimeout(() => {
                fakeLoadAvatar.value = false;
            }, 1000);
        });
        window.removeEventListener('resize', () => {});
    });
    watch(
        () => store.getters['UserModule/getUserDetails'],
        function (user) {
            isLoggedIn.value = Object?.keys(user).length === 0 ? false : true;
            Object.assign(activeUser, user);
        },
        { immediate: true, deep: true }
    );
    async function logout() {
        await store.dispatch('UserModule/setUserDetails', {});
        Object.assign(activeUser, {});
        isLoggedIn.value = false;
        router.push('/connexion');
    }
</script>

<template>
    <a-affix>
        <header class="header">
            <div class="header__mobile">
                <div>
                    <Paragraphe type="bold"> Accueil </Paragraphe>
                </div>
                <div
                    class="header__menu"
                    :class="{ 'header__menu--active': isMenu }"
                    @click="handleShowMenu"
                >
                    <!-- <IconMenu /> -->
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div
                    class="header__overlay"
                    :class="{ 'overlay-active': isMenu }"
                    @click="handleShowMenu"
                ></div>
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
                                        class="header__nav"
                                    >
                                        <component :is="d.icon"></component>
                                        {{ d.label }}
                                    </router-link>
                                </a-menu-item>
                            </template>
                            <a-sub-menu :key="`sub-${index}`" v-else>
                                <template #title>
                                    <component :is="d.icon"></component>
                                    <span class="header__nav">{{
                                        d.label
                                    }}</span>
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
                                    class="header__nav"
                                >
                                    <Login />
                                    Connexion
                                </router-link>
                            </a-menu-item>
                            <a-menu-item :key="`setting:101`">
                                <router-link
                                    @click="handleShowMenu"
                                    to="/inscription"
                                    class="header__nav"
                                >
                                    <AddUser />
                                    Inscription
                                </router-link>
                            </a-menu-item>
                        </template>
                        <template v-else>
                            <a-menu-item :key="`setting:1002`">
                                <router-link
                                    @click="handleShowMenu"
                                    to="/logout"
                                    class="header__nav"
                                >
                                    <Logout />
                                    Deconnection
                                </router-link>
                            </a-menu-item>
                        </template>
                    </a-menu>
                </div>
            </div>
            <div class="header__desc">
                <Paragraphe type="bold"> INVEST </Paragraphe>
                <div class="header__content-menu">
                    <a-menu mode="horizontal">
                        <template v-for="(d, index) in dataMenu">
                            <template v-if="!d.submenu && d.view === 'all'">
                                <a-menu-item
                                    v-if="isLoggedIn"
                                    :key="`alipay-${index}`"
                                >
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
                <div class="header__user header__menu-rigth">
                    <a-menu mode="horizontal">
                        <a-menu-item key="20">
                            <router-link to="/recherche-bien">
                                <Search />
                            </router-link>
                        </a-menu-item>
                        <a-sub-menu key="sub-100">
                            <template #title>
                                <router-link v-if="isLoggedIn" to="/my-account">
                                    <figure class="header__avatar">
                                        <img :src="activeUser.image" />
                                        <!-- <img src="" alt="" /> -->
                                    </figure>
                                </router-link>
                                <router-link v-else to="/connexion">
                                    <span><User /></span>
                                </router-link>
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
                                    <span @click="logout">Deconnection</span>
                                </a-menu-item>
                            </a-menu-item-group>
                        </a-sub-menu>
                    </a-menu>
                </div>
            </div>
        </header>
        <!-- <router-link  to="/detail">detail</router-link> -->
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
        padding: 14px 15px;
        position: relative;
        z-index: 9;
        box-shadow: 0 0 3px var(--color-primary);

        &__menu {
            cursor: pointer;
            @apply flex flex-col justify-center gap-[4px];
            span {
                background-color: var(--color-secondary);
                @apply block w-[16px] h-[2px];
                &:nth-child(2) {
                    transform: translateX(100%);
                    @apply w-[8px];
                    transition: transform 0.18s ease;
                }
            }
            &--active {
                span {
                    &:nth-child(2) {
                        transform: translateX(0);
                    }
                }
            }
        }
        &__mobile {
            @apply flex justify-between;
            @screen lg {
                display: none;
            }
            &:deep() {
                .ant-menu-item,
                .ant-menu-submenu-title {
                    padding-left: 10px !important;
                }
                .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
                    background-color: var(--color-gray);
                    border-radius: 8px;
                    a {
                        color: var(--color-secondary);
                    }
                }
                .ant-menu-submenu-open {
                    .ant-menu-submenu-title {
                        background-color: var(--color-gray);
                        border-radius: 8px;
                    }
                    .ant-menu-submenu-arrow {
                        color: var(--color-secondary);
                    }
                }
                .ant-menu-submenu:hover
                    > .ant-menu-submenu-title
                    > .ant-menu-submenu-arrow {
                    color: var(--color-secondary);
                }
                .ant-menu-sub.ant-menu-inline .ant-menu-item-group-title {
                    display: none;
                }
                .ant-menu-sub {
                    body & {
                        background-color: transparent;
                        @apply pl-[25px] relative;
                    }
                    &:after {
                        content: '';
                        position: absolute;
                        left: 15px;
                        border-left: 1px solid var(--color-gray);
                        height: 100%;
                        top: 0;
                        display: inline-block;
                    }
                    .ant-menu-item {
                        @apply py-[5px];
                    }
                }
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

            &:deep() {
                .ant-menu {
                    gap: 60px !important;
                }
            }
        }
        &__avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: var(--color-stroke-gray);
            overflow: hidden;
            @apply flex justify-center items-center;
            img {
                width: 100%;
                height: 100%;
            }
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
            padding: 0 10px;
            transition: transform 0.25s ease;
        }
        .menu-active {
            transform: translateX(0);
            transition: transform 0.25s ease;
            box-shadow: 1px 1px 10px var(--color-stroke-gray);
        }
        .overlay-active {
            opacity: 0.25;
            visibility: visible;
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
            .ant-menu-vertical .ant-menu-item::after,
            .ant-menu-vertical-left .ant-menu-item::after,
            .ant-menu-vertical-right .ant-menu-item::after,
            .ant-menu-inline .ant-menu-item::after {
                content: none;
            }
            .ant-menu-inline,
            .ant-menu-vertical,
            .ant-menu-vertical-left {
                border: none;
            }
        }
        &__overlay {
            position: fixed;
            top: 49px;
            right: 0;
            width: 100vw;
            height: calc(100% - 49px);
            background-color: var(--color-secondary);
            opacity: 0;
            transition: opacity 0.25s ease;
            z-index: -1;
            visibility: hidden;
        }
        &__nav {
            @apply flex gap-[10px] items-center;
            color: var(--color-secondary);
            font-weight: 600;
        }
    }
</style>
