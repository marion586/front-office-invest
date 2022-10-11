<template>
    <div class="confirm-subscription">
        <div class="confirm-subscription__content">
            <div class="flex items-center justify-center flex-col gap-[20px]">
                <Check size="lg" />
                <Title
                    label="Félicitations! Vous êtes inscrit."
                    type="h1"
                    weight="700"
                />
                <Paragraphe class="info">
                    Vous pouvez maintenant vous connecter.
                </Paragraphe>
                <Button @click="onRedirect" type="secondary"
                    ><LoadingButton size="sm" v-if="loadingRedirect" /><span
                        v-else
                        >Connexion</span
                    ></Button
                >
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Check from '../../components/Icon/Check.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import UserService from '@/services/userService';

    const route = useRoute();
    const router = useRouter();

    const loadingRedirect = ref<boolean>(false);
    const token = ref<any>();

    onMounted(() => {
        token.value = route.params.token;
    });

    async function onRedirect() {
        loadingRedirect.value = true;
        try {
            const res = await UserService.validate({
                id: token.value,
            });
            if (res.code === 200) {
                router.push('/connexion');
            } else if (res.code === 404) {
                console.log('user already here');
            }
            console.log(res.code, 'status');
            console.log(res, 'res');
        } catch (error) {
            console.log(error);
        } finally {
            loadingRedirect.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .confirm-subscription {
        width: 100%;
        height: 93vh;
        padding: 20px;
        @screen sm {
            padding: 50px;
        }
        @apply flex justify-center items-center;
        &__content {
            width: 100%;
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            &:deep() {
                h1 {
                    color: var(--color-primary);
                    text-align: center;
                }
            }
            .info {
                font-size: 16px;
                color: var(--color-secondary);
                font-weight: 100;
            }
            img {
                width: 150px;
            }
        }
    }
</style>
