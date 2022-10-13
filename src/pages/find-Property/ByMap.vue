
<template>
    <div class="w-screen flex flex-wrap">
        <div class="container-wrapper">
            <Map 
                class="map-container"
                :markersCoordinates="data.PlaceCoordinates"
                :needMarkerLayer="true"
                :mapCenterCoordinate="data.PlaceCoordinates[0]"
            />
            <div class="map-actions">
                    <Button
                        type="secondary"
                        class="map-actions-reset"
                        @onClick="handleBtn"
                    >
                        <template #default>
                            Réinitialiser
                        </template>
                    </Button>
                    <Button
                    class="map-actions-search"
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
    PlaceCoordinates : [{"lat":50.84535101789271,"lng":4.352409839630127},{"lat":50.84548921460665,"lng":4.351868033081701}],
})

const toggleMitable = ()=>{
    data.mutable= ! data.mutable
}

//lifecycle
 onMounted( () =>{
    // const proomise = geocode("Bruxelles Belgique");
    // proomise.then(result =>{
    //     console.log(result)
    //     data.isMapReady = true,
    //     data.PlaceCoordinates.push(result.coordinates);
    //     });
    
    // const input = document.getElementById("propertyLocation");
    // console.log("input : ", input);
    // autocomplet(input);

    // console.log(window.google);

})

onUnmounted(()=>{
    // console.log("component is unmounted");
    // removeScript();    
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
            
            &-reset{
                @apply w-1/2 bg-white my-1;
            }
            &-search{
                @apply w-1/2 my-1;
                background-color: var(--color-primary);
                color : var(--color-gray)

            }
        
        }
    }
    
</style>