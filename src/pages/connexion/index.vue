<script lang="ts" setup>
    import connexion from './connexion.vue';
</script>

<template>
    <div class="inscription">
        <connexion />
    </div>
</template>

<style scoped lang="scss">
    .inscription {
        background-image: url('@/static/images/bg-auth.png');
        background-size: cover;
        height: 100vh;
        @apply flex justify-center items-center;
    }
</style>
