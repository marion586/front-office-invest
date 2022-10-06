<template>
    <div class="auth">
        <div class="auth__form-container">
            <div
                v-if="usertype !== ''"
                @click="onBack"
                class="auth__form-container__back"
            >
                <ArrowBack />
            </div>
            <div class="auth__head">
                <figure class="auth__image">
                    <img src="" alt="" />
                </figure>
                <Title type="h3" label="Inscription" :weight="700" />
            </div>
            <template v-if="usertype === ''">
                <transition appear name="fade" mode="in-out">
                    <UserType @on-click-choices="handleChoices" />
                </transition>
            </template>
            <template v-else>
                <transition appear name="fade-step" mode="in-out">
                    <RegistrationForm :usertype="usertype" />
                </transition>
            </template>
            <div class="auth__link-bottom">
                <span>Ou</span><br />
                <router-link to="/connexion">
                    <Paragraphe is="span"
                        ><span class="auth__link-bottom__redirect"
                            >Connexion</span
                        ></Paragraphe
                    >
                </router-link>
            </div>
        </div>
        <figure class="auth__bg">
            <img src="" alt="" />
        </figure>
    </div>
</template>
<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';
    import UserType from './RegistrationSection/UserType/UserType.vue';
    import RegistrationForm from './RegistrationSection/RegistrationFrom/RegistrationForm.vue';
    import '@/assets/style/auth.scss';
    import ArrowBack from '../../components/Icon/ArrowBack.vue';
    import { useRouter } from 'vue-router';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

    const router = useRouter();

    const addPaddingTop = ref<string>('0px');
    const usertype = ref<'particulier' | 'professionnel' | ''>('');

    watch(usertype, (v) => {
        if (v !== '') {
            addPaddingTop.value = '100px';
        } else {
            addPaddingTop.value = '0px';
        }
    });
    function handleChoices(
        userType: 'particulier' | 'professionnel' | ''
    ): void {
        usertype.value = userType;
    }

    function onBack() {
        usertype.value = '';
    }
</script>
<style lang="scss" scoped>
    .auth {
        &__form-container {
            padding-top: v-bind('addPaddingTop');
            padding-bottom: 20px;
            &__back {
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .fade-step-enter-active,
        .fade-step-leave-active {
            transition: all 0.3s ease-in-out;
        }

        .fade-step-enter-from,
        .fade-step-leave-to {
            opacity: 0;
            transform: translateX(50px);
        }
    }
</style>
