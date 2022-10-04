<script setup>
import {init} from "@/composables/map";
import {reactive,onMounted} from "vue";
import 'leaflet/dist/leaflet.css';
import Map from '@/components/section/map/index.vue';


onMounted(() => {
    Map.setContainerId("map");
    Map.init();
})
</script>
<template>
        <div id="map"/>
</template>