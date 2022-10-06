<template>
    <div class="list">
        <div class="list__container">
            <Filter>
                <template #left>
                    <div class="list__container-icon">
                        <Cart />
                    </div>
                    <div class="list__container-subtitle">
                        <Title
                            type="h4"
                            label="Acquérir un bien"
                            weight="bold"
                        />
                    </div>
                </template>

                <template #right>
                    <Button type="secondary">
                        <div>
                            <Cart color="#fff" />
                            <span> Sur carte </span>
                        </div>
                    </Button>
                    <div class="list__container-content">
                        <Title type="h4" label="Filtrer par:" weight="bold" />
                        <div class="list__container-content-select">
                            <Select
                                name="select"
                                placeholder="select"
                                :options="options"
                            />
                        </div>
                    </div>
                </template>
            </Filter>
            <div class="list__container-product">
                <CardProducts />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CardProducts from './CardProducts/CardProducts.vue';
    import Filter from './Filter/Filter.vue';
    import Cart from '@/components/Icon/Cart.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { ref } from 'vue';

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
    .list {
        @apply container;
        &__container {
            @apply flex flex-col py-5 gap-4;
            &-product {
                @apply grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4;
            }
            &-icon {
                @apply block sm:hidden;
            }
            &-subtitle {
                @apply hidden sm:block;
            }
            button {
                @apply hidden sm:block;
                width: 126px;
                padding: 6px 10px;
                div {
                    @apply flex flex-row justify-center items-center gap-3;
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
