<script lang="ts" setup>
    import { ref, shallowRef } from 'vue';
    import PropertyType from '@/pages/addProduct/components/PropertyType/PropertyType.vue';
    import SideBar from '@/pages/addProduct/components/SideBar/SideBar.vue';
    import Button from '@/components/Common/Button/Button.vue';

    import { data } from '@/pages/addProduct/components/SideBar/data';

    let activeComp = shallowRef<Array<object>>([PropertyType]);
    const current = ref<number>(0);
    const title = ref<string>("Type d'annonce")

    function changeComponent(comp: object, label : string) {
        activeComp.value = [comp];
        title.value = label;
    }

    function next() {
        current.value++;
    }

    function prev() {
        if(current.value > 0){
            current.value--;
        }
    }
</script>

<template>
    <div class="md:container">
        <div class="add__container">
            <SideBar :currentItem="current" @component="changeComponent" />
            <div class="add__content">
                <div class="">
                    <div class="add__header">
                        <p class="add__title">{{title}}</p>
                        <hr class="add__divider" />
                    </div>
                    <component
                        :is="activeComp[activeComp.length - 1]"
                        @onNext="next"
                        @onPrev="prev"
                    />
                </div>
                <div class="add__footer">
                    <p>(*) champ obligatoire</p>
                    <div class="add__btn-foot">
                        <Button
                            class="info__my-btn"
                            type="border"
                            @click="prev"
                        >
                            Précedent
                        </Button>
                        <Button
                            class="info__my-btn"
                            type="secondary"
                            @click="next"
                        >
                            Suivant
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .add {
        &__container {
            @apply m-[12px] md:flex gap-[20px] md:gap-[10px];
        }
        &__content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            @apply bg-[white] rounded-[8px] p-[10px] md:p-[24px] sm:w-[100%] lg:w-[893px] mt-[10px] md:mt-[0px] md:h-[calc(100vh_-_100px)] overflow-y-auto;
        }
        &__btn-foot {
            @apply flex gap-[15px];
        }
        &__footer {
            border-top: 1px solid var(--color-gray);
            @apply pt-[15px] mt-[15px] flex justify-between items-center;
        }
        &__header{

        }
        &__title {
            font-weight: 600;
        }
        &__divider {
            @apply my-[18px];
        }
    }
</style>
