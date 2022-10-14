<template>
    <div class="filter">
        <div class="filter__left">
            <div class="filter__left-icon">
                <Cart v-if="filterObject.isListCards" @click="showCart" />
                <ListBullet v-if="filterObject.isShowCart" @click="showCard" />
            </div>
            <div class="filter__left-subtitle">
                <Title
                    v-if="!isMap"
                    type="h4"
                    label="Acquérir un bien"
                    weight="bold"
                />
            </div>
            <Title v-if="isMap" type="h4" label="Map View" weight="bold" />
        </div>

        <div class="filter__right">
            <Button
                v-if="filterObject.isListCards"
                @on-click="showCart"
                typeButton="secondary"
            >
                <div>
                    <Cart color="#fff" />
                    <span> Sur carte </span>
                </div>
            </Button>
            <Button
                @on-click="filterObject.showCart"
                v-if="
                    (filterObject.isShowCart || filterObject.isShowInfo) &&
                    !isMap
                "
                typeButton="secondary"
            >
                <div @click="showCard">
                    <ListBullet color="#fff" />
                    <span> Sur Liste</span>
                </div>
            </Button>
            <FullScreen v-if="isMap" @click="showCart" />
            <div v-if="filterObject.isListCards" class="filter__right-content">
                <Title type="h4" label="Filtrer par:" weight="bold" />
                <div class="filter__right-content-select">
                    <Select
                        name="select"
                        placeholder="select"
                        :options="options"
                        @change-select="(n) => handleSelect(n)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Cart from '@/components/Icon/Cart.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import ListBullet from '@/components/Icon/ListBullet.vue';
    import { inject, ref } from 'vue';
    import FullScreen from '../../../components/Icon/FullScreen.vue';

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
    interface filters {
        isShowCart: boolean;
        isListCards: boolean;
        isShowInfo: boolean;
    }
    let filterObject: any = inject('filterObject');

    const emit = defineEmits<{
        (e: 'on-show-cart'): void;
        (e: 'on-show-card'): void;
        (e: 'on-show-info'): void;
        (e: 'change-select', value: object): void;
    }>();

    const showCart = () => {
        emit('on-show-cart');
    };
    const showInfo = () => {
        emit('on-show-info');
    };
    const showCard = () => {
        emit('on-show-card');
    };
    const handleSelect = (n: object) => {
        emit('change-select', n);
    };
    defineProps({
        isMap: {
            tpe: Boolean,
            default: false,
        },
    });
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
                width: 126px;
                padding: 6px 10px;
                div {
                    @apply flex flex-row justify-center items-center gap-3;
                }
                height: 33px;
            }

            &-content {
                @apply flex  gap-4;
                height: 33px;
                &-select {
                    width: 126px;
                    .custom-select__wrapper {
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
