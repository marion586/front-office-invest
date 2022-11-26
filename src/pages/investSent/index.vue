<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';

    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import success from '@/components/Icon/success.vue';

    const store = useStore();
    const router = useRouter();
</script>

<template>
    <div class="success">
        <Title
            type="h1"
            label="Demande d'investissement anvoyé avec succes"
            color="#ccc"
        />

        <success />

        <span>
            <router-link :to="`/`"> Accueil </router-link>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .success {
        @apply h-[80vh] flex flex-col justify-center items-center gap-[20px] container mt-[20px] rounded-lg;
        background-color: #fff;
        #Capa_1 {
            width: 41px;
        }
        span {
            color: #ccc;
        }
    }
</style>
