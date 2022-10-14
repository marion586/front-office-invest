
<template>
    <div class="w-screen flex flex-wrap">
        <div class="container-wrapper">
            <Map 
                class="map-container"
                :markersCoordinates="data.PlaceCoordinates"
                :needMarkerLayer="true"
                :mapCenterCoordinate="data.PlaceCoordinates[0]"
                :needPolygonLayer="true"
                @touched="handleBtn"
                :polygonCoordinates="data.polygon"
            />
            <div class="map-actions">
                    <Button
                        theme="light"
                        type="primary"
                        class="map-actions-btn"
                        @onClick="handleBtn"
                    >
                        <template #default>
                            Réinitialiser
                        </template>
                    </Button>
                    <Button
                    class="map-actions-btn"
                        type="primary"
                        @onClick="handleBtn"
                    >
                        <template #default>
                            Rechercher
                        </template>
                    </Button>
            </div>

        </div>
    </div>
</template>

<script setup>

import ASelect from "ant-design-vue/lib/select";
import {reactive,onMounted, onUnmounted,onDeactivated } from "vue";
import {geocode, removeScript} from "@/composables/google-maps-api";
import Map from "@/components/section/map/index.vue";
import Input from '@/components/Common/Input/Input.vue';
import Select from '@/components/Common/Select/Select.vue';
import Button from "@/components/Common/Button/Button.vue";


//reactive states
const text = reactive   ({
    title : "recherche de bien",

});
const data = reactive({
    isMapReady: false,
    polygon : [
        { lat: 50.84665167605899, lng: 4.350414276123048 },
        { lat: 50.84440259845273, lng: 4.349427223205567 },
        { lat: 50.84429420643197, lng: 4.354748725891114 },
        { lat: 50.84684135234525, lng: 4.3580961227417 }
    ],
    PlaceCoordinates : [{"lat":50.84535101789271,"lng":4.352409839630127},{"lat":50.84548921460665,"lng":4.351868033081701}],
})

const toggleMitable = ()=>{
    data.mutable= ! data.mutable
}

//lifecycle
 onMounted( () =>{
   

})

const handleBtn = ()=>{
console.log("button triggered");
}

const getFeatures = (features)=>features
//functions

</script>
<style lang="scss" scoped>
    .container-wrapper{
        @apply w-screen relative;
        height : 90vh;
    }
    .map{
        &-container{
            @apply w-full h-[95vh] fixed;
            z-index : 9;
        }
        &-actions{
                position: absolute;
                bottom: 0px;
                width: 100vw;
                flex-direction: column;
                z-index: 10;
                display: flex;
                align-items: center;
            &-btn{
                @apply w-fit my-1;
            }
            &-reset{
                @apply w-1/2 my-1;
            }
            &-search{
                @apply w-1/2 my-1;

            }
        
        }
    }
    
</style>