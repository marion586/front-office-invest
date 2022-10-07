<script setup>
import {reactive,onMounted} from "vue";
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import Map from "@/composables/map";
import 'leaflet-draw/dist/leaflet.draw.css';

const props = defineProps({
    mapCenterCoordinate : {
        type : [Array,Object],
        default : []
    },
    needMarkerLayer : {
        type : Boolean,
        default : false,
    },
    markersCoordinates : {
        type : Array,
        default : []
    }
})
onMounted(() => {
    console.log("DBG eto")
    const map = new Map("map");
    console.log(props.markersCoordinates[0])
    map.fitBound([props.markersCoordinates[0].lat,props.markersCoordinates[0].lng]);
    if (props.needMarkerLayer) {
            props.markersCoordinates.forEach((marker)=>{
                map.addMarker(marker);
            })
    }
    map.addMarker([51.505, -0.09]);
    map.addDrawControl();
    map.addPrintControl();
    map.DrawingLayerListener();
    })

</script>
<template>
        <div id="map"/>
</template>