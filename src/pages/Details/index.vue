<script lang="ts" setup>
    import ProjectCard from '@/components/Display/ProjectCard/ProjectCard.vue';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    const route = useRoute();

    const store = useStore();
    let dataStore = computed(() => store.getters['ProjectModule/getData']);

    let details = computed(() => store.getters['ProjectModule/getDetails']);
</script>

<template>
    <div class="details">
        <div class="details__details">
            <figure>
                <img :src="details.image" alt="" />
            </figure>
        </div>
        <div class="details__list">
            <ProjectCard
                :DataCard="item"
                v-for="(item, index) in dataStore"
                :key="index"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .details {
        @apply grid grid-cols-2 gap-[20px] w-full;

        &__details {
            @apply grid-cols-3;
        }
    }
</style>
