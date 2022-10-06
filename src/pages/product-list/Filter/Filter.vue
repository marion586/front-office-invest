<template>
    <div class="filter">
        <div class="filter__left">
            <div class="filter__left-icon">
                <Cart />
            </div>
            <div class="filter__left-subtitle">
                <Title type="h4" label="Acquérir un bien" weight="bold" />
            </div>
        </div>

        <div class="filter__right">
            <Button type="secondary">
                <div>
                    <Cart />
                    <span> Sur carte </span>
                </div>
            </Button>
            <div class="filter__right-content">
                <Title type="h4" label="Filtrer par:" weight="bold" />
                <div class="filter__right-content-select">
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
    import Cart from '@/components/Icon/Cart.vue';
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

<style lang="scss" scoped>
    .filter {
        @apply flex items-center justify-between px-4 py-3;
        background-color: white;
        border-radius: 8px;

        &__left {
            @apply flex flex-col sm:self-start gap-2;
            &-icon {
                @apply block sm:hidden;
            }
            &-subtitle {
                @apply hidden sm:block;
            }
        }
        &__right {
            @apply flex flex-col items-end gap-2;
            button {
                @apply hidden sm:block;
                div {
                    @apply flex flex-row items-center gap-2;
                }
                height: 33px;
            }
            &-content {
                @apply flex items-center gap-4;
                &-select {
                    width: 126px;
                    .select {
                        &:deep() {
                            .ant-select-selector {
                                border: none;
                                font-size: 14px;
                                height: 33px;
                                border-radius: 15px;
                                background-color: #f2f2f2;
                                span {
                                    font-weight: bold;
                                }
                            }
                            .ant-select-selection-placeholder {
                                @apply flex items-center;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
