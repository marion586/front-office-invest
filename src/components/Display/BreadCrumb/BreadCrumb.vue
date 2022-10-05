<template>
    <div
        class="flex justify-start items-center px-2.5 py-2 mx-2 bg- rounded-lg h-8 breadContainer"
    >
        <a-breadcrumb separator="|">
            <a-breadcrumb-item v-for="(item, index) in items" :key="index">
                <router-link v-if="item.url" :to="`${item.url}`">
                    <span  class="mr-2">{{ item.label }}</span>
                </router-link>
                <span class="mr-2" v-else>{{ item.label }}</span>
                <a-breadcrumb-separator
                    class="mr-2"
                    v-if="index < items.length - 1"
                    >|</a-breadcrumb-separator
                >
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script setup>
    import {ref,reactive} from "vue"
    defineProps({
        items: {
            type: Array,
            required: true,
        },
    });
    //active not OP
    // const state = reactive({
    //     isActive : true 
    // })



</script>

<style lang="scss" scoped>
    $bg-color: #ffffff;
    .breadContainer {
        // background-color: $bg-color;
        background-color: red;
    }

    .activeUrl{
        color: aqua;
    }
</style>
