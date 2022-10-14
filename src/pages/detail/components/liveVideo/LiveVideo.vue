<template>
    <div class="video">
        <div class="video__headVideo">
            <span class="video__title">Vidéo Live</span>
            <CloseIcon @click="changeView" />
        </div>
        <div class="video__play">
            <iframe
                class="video__iframe"
                height="360"
                src="https://www.youtube.com/embed/Zc-EKDhqwWg?list=RDZc-EKDhqwWg"
                title="Mila Revolution official Video Maddy Roots"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import CloseIcon from '@/components/Icon/Close.vue';

    const emit = defineEmits(['return']);
    function changeView(): void {
        emit('return');
    }
</script>

<style lang="scss" scoped>
    .video {
        @apply bg-white rounded p-2 mr-2 ml-2;
        //responsive
        @apply lg:block lg:p-0;
        &__headVideo {
            @apply flex flex-row justify-between items-center mb-[10px];
        }
        &__title {
            @apply font-semibold text-sm;
        }
        &__play {
            margin-left: 1.25rem;
            margin-right: 1.25rem;
        }
        &__iframe {
            @apply w-full rounded h-[223px];
            //responsive
            @apply lg:h-[440px];
        }
    }
</style>
