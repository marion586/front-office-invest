<script setup>
    import { reactive, onMounted } from 'vue';
    import 'leaflet/dist/leaflet.css';
    import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
    import Map from '@/composables/map';
    import 'leaflet-draw/dist/leaflet.draw.css';


const props = defineProps({
    mapCenterCoordinate : {
        type : [Array,Object],
        default : ()=>[]
    },
    needMarkerLayer : {
        type : Boolean,
        default : false,
    },
    markersCoordinates : {
        type : Array,
        default : ()=>[]
    },
    getFeatures : {
        type  : Function,
        default : ()=> {}
    }
})

const emit = defineEmits(["touched"]);

onMounted(() => {
    const map = new Map("map");
    if (props.needMarkerLayer) {
    map.fitBound([props.markersCoordinates[0].lat,props.markersCoordinates[0].lng]);
            props.markersCoordinates.forEach((marker)=>{
                map.addMarker(marker,()=>{
                    emit('touched', marker);
                });
            })
    }
    map.addDrawControl();
    map.addPrintControl();
    map.DrawingLayerListener();
    })
    const getFeatures = ()=> props.getFeatures(map.layers);
    //marker1.onClick()
</script>
<template>
        <div
            class="fix-z-index"
            id="map"
        />
</template>
<style lang="scss" scoped>
.fix-z-index{
    z-index: -100;
}
</style>
