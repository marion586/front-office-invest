<script lang="ts" setup>
    import inscriptionContainer from './inscriptionContainer/index.vue';
</script>

<template>
    <div class="inscription">
        <div class="inscription__right">
            <inscriptionContainer />
        </div>

        <figure>
            <img src="@/static/images/bg-auth.png" />
        </figure>
    </div>
</template>

<style scoped lang="scss">
    .inscription {
        background-image: url();
        background-size: cover;
        height: calc(100vh - 62px);
        @apply grid grid-cols-2 items-center;
        &__right {
            @apply flex justify-center;
        }
        figure {
            height: 100%;
            img {
                height: 100%;
            }
        }
    }
</style>
