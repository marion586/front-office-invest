<script setup lang="ts">
    import { reactive, onMounted,ref } from 'vue';
    import 'leaflet/dist/leaflet.css';
    import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
    import Map from '@/composables/map';
    import 'leaflet-draw/dist/leaflet.draw.css';
import { LatLngExpression, LatLngLiteral } from 'leaflet';


const props = defineProps({
    mapCenterCoordinate : {
        type : [Array,Object],
        default : ()=>({"lat":50.84535101789271,"lng":4.352409839630127})
            },
    needMarkerLayer : {
        type : Boolean,
        default : false,
    },
    markersCoordinates : {
        type : [Array,Object],
        default : ()=>[]
    },
    needPolygonLayer : {
        type : Boolean,
        default : false
    },
    polygonCoordinates : {
        type : Array,
        default : []
    },
    needDrawControl:{
        type : Boolean,
        default : false
    },
    needPrintControl:{
        type : Boolean,
        default : false
    }
})
let map : Map;

const currentCreatedLayer = ref<{}>();
const allCreatedLayer = ref<{}>();

// const emit = defineEmits(['touched']);

const emit = defineEmits<{
    (e : "touched",payload : any) : void
    (e: 'on-polygon-created', payload : any) : void
    (e: 'on-marker-created', payload : any) : void
    }>();

onMounted(() => {
     map = new Map("map");
    if (props.needMarkerLayer) {
        map.fitBound((props.mapCenterCoordinate as any));

        props.markersCoordinates.forEach((marker :   LatLngLiteral)=>{
            map.addMarker(marker,()=>{
                emit("touched", marker);
            });
            map.fitBound(marker);
        })
    }
    if(props.needPolygonLayer){
        if(Array.isArray(props.polygonCoordinates[0])){
        props.polygonCoordinates.forEach((elt : any)=>{
                elt.forEach((polygon: any) =>{
                map.createPolygon(polygon,()=>{
                emit('touched', polygon)
            })
        })
    })
    }else{
        map.createPolygon((props.polygonCoordinates as any),()=>{
                emit('touched', props.polygonCoordinates)
            })
    }
    }


    if(props.needDrawControl){
        map.addDrawControl();
        map.DrawingLayerListener(polygonCreationHandler,);
    }
    if(props.needPrintControl){
        map.addPrintControl();
    }
    })



const polygonCreationHandler = (layer : {})=>{
    currentCreatedLayer.value = layer;
    emit("on-polygon-created", layer)
}
const markerCreationHandler = (layer : {})=>{
    currentCreatedLayer.value = layer;
    emit("on-marker-created", layer)
}


const getCurrentCreatedLayer = ()=>{
    currentCreatedLayer.value =  map.getCurrentFeaturesCoordinates(map.layers)
    return currentCreatedLayer;
}
const getAllCreatedLayer = ()=>{
    allCreatedLayer.value = map.layers;
    return allCreatedLayer;
}

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
