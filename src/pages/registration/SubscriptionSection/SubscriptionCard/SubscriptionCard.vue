<template>
    <div>
        CARD

        <button @click="onClickChoose">CHOISIR</button>
    </div>
</template>
<script lang="ts" setup>
    const emit = defineEmits<{
        (e: 'on-click-choose'): void;
    }>();

    function onClickChoose() {
        emit('on-click-choose');
    }
</script>
<style lang=""></style>
