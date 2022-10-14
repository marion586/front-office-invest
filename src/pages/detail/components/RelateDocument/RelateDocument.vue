<template>
    <div class="document">
        <div class="document__headDoc">
            <span class="document__titleDoc">Document relatif au bien</span>
            <CloseIcon @click="changeView" />
        </div>
        <div class="document__docList">
            <div
                v-for="(item, index) in docList"
                :key="index"
                class="flex flex-col w-fit"
                @click="openFile"
            >
                    <DocPdf class="w-fit" />
                    <span class="text-center">{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import CloseIcon from '@/components/Icon/Close.vue';
    import DocPdf from '@/components/Icon/DocPdf.vue';
    const emit = defineEmits(['return']);
    function changeView(): void {
        emit('return');
    }

    const docList: Array<any | object> = [
        {
            id: 1,
            title: 'A',
        },
        {
            id: 2,
            title: 'B',
        },
        {
            id: 3,
            title: 'C',
        },
        {
            id: 4,
            title: 'D',
        },
        {
            id: 5,
            title: 'E',
        },
    ];
    function openFile():void{
        
    }
</script>

<style lang="scss" scoped>
    .document {
        @apply bg-white rounded p-2 mx-[10px];
        //responsive
        @apply lg:block lg:p-0;

        &__headDoc {
            @apply flex flex-row justify-between items-center mb-[10px];
        }
        &__docList{
            @apply flex flex-row flex-wrap gap-[10px];
            //responsive
            @apply lg:mx-5;
        }
        &__titleDoc {
            @apply font-semibold text-sm;
        }
    }
</style>
