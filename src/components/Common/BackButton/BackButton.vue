<template>
    <button @click="returnEmit" class="backBtn">
        <ArrowBack />
        <!-- <span class="backBtn__txt" data-test="returnTxt">Retour</span> -->
    </button>
</template>

<script lang="ts" setup>
    import ArrowBack from '@/components/Icon/ArrowBack.vue';

    const emit = defineEmits<{
        (e: 'return'): void;
    }>();

    function returnEmit(): void {
        emit('return');
    }
</script>

<style lang="scss" scoped>
    .backBtn {
        @apply flex flex-row items-center w-[73px] mb-[5px];

        &__txt {
            @apply ml-[8px] font-semibold;
        }
    }
</style>
