<template>
    <div class="container-filter">
        <div class="flex flex-col sm:self-start gap-2">
            <div class="block sm:hidden">
                <Map />
            </div>
            <div class="hidden sm:block">
                <Title type="h4" label="Acquérir un bien" weight="bold" />
            </div>
        </div>

        <div class="flex flex-col items-end gap-2">
            <Button class="hidden sm:block" type="secondary">
                <div class="flex flex-row items-center gap-2">
                    <Map />
                    <span> Sur carte </span>
                </div>
            </Button>
            <div class="container__content flex items-center gap-3">
                <Title type="h4" label="Filtrer par:" weight="bold" />
                <div class="container__content-select">
                    <Select
                        name="select"
                        placeholder="select"
                        :options="options"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Map from '../../../components/Icon/Map.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { ref } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';

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
        @apply flex items-center justify-between px-4 py-4;
        background-color: white;
        border-radius: 8px;

        &__content {
        }
    }
    .ant-select-selector {
        border-radius: 17px !important;
        background-color: red;
    }
</style>
