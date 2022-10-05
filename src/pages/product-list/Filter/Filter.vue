<template>
    <div class="container-filter">
        <Map />
        <div class="container__content flex items-center gap-3">
            <Title type="h4" label="Filtrer par:" weight="bold" />
            <div class="container__content-select">
                <Select name="select" placeholder="select" :options="options" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Map from '../../../components/Icon/Map.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { ref } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';

    interface Option {
        value: string;
        label: string;
    }

    const options = ref<Option[]>([
        {
            value: 'Prix asc',
            label: 'Prix asc',
        },
        {
            value: 'Prix dsc',
            label: 'Prix dsc',
        },
    ]);
</script>

<style lang="scss">
    .container-filter {
        @apply flex items-center justify-between px-4 py-2;
        background-color: white;
        border-radius: 8px;

        &__content {
        }
    }
</style>
