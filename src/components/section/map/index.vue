<script setup>
import {init} from "@/composables/map";
import {reactive,onMounted} from "vue";
import 'leaflet/dist/leaflet.css';
import Map from "@/composables/map";

onMounted(() => {
    console.log("DBG eto")
    const map = new Map("map");
    map.init();
    })

</script>
<template>
        <div id="map"/>
</template>