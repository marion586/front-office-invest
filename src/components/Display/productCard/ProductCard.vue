<template>
    <div class="container-card">
        <HeadProduct Text="Agence" label="Label Immo" />
    </div>
</template>

<script setup lang="ts">
    import HeadProduct from '@/components/Display/headProduct/HeadProduct.vue';
</script>

<style lang="scss">
    .container-card {
        display: flex;
        flex-direction: column;
        width: 398px;
        height: 447.64px;
        padding: 16px;
        gap: 18px;
        background: #ffffff;
        border-radius: 8px;
    }
    @media only screen and (min-width: 252px) and (max-width: 398px) {
        .container {
            width: auto;
        }
    }
</style>
