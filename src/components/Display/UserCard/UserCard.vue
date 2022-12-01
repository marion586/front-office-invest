<script lang="ts" setup>
    import { onMounted, defineProps } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';

    defineProps({
        dataUser: {
            type: Object,
            required: true,
        },
    });
</script>

<template>
    <div class="card">
        <figure class="card__head">
            <img :src="dataUser.image" alt="user photos" />
        </figure>
        <Title
            type="h3"
            :label="dataUser.firstName + dataUser.lastName"
            class="card__name"
            weight="bold"
        />
        <Title type="h3" :label="dataUser.typeUser" class="card__role" />
    </div>
</template>

<style lang="scss" scoped>
    .card {
        background: rgb(226, 223, 223);
        height: 287px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        align-items: center;
        transition: transform 1s ease;
        &__head {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            img {
                height: 100%;
                object-fit: cover;
                width: 100%;
            }
        }
        &__role {
            color: grey;
        }
    }
    .card:hover {
        transform: translateY(-30px);
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
</style>
