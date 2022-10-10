
<template>
    <div class="w-screen flex flex-wrap">
        <div class="w-screen md:w-2/3 lg:2/3">
            <Map 
                v-if="data.isMapReady"
                class="w-full map-container p-5"
                :mapCenterCoordinate="data.PlaceCoordinates"
                :needMarkerLayer="true"
                :markersCoordinates="data.PlaceCoordinates"
                :getFeatures="getFeatures"
            />
        </div>
        <div v-if="data.mutable" class="md:w-1/3 sm:w-full p-5">
            <h1>{{text.title}}</h1>
            <div class="flex flex-wrap justify-center">
                <div 
                    class="container flex-col pt-5"
                    v-for="(field, idx) in data.fields"
                    :key="idx"
                    :class="field.class"
                >
                    <Input
                        v-if="field.id === 'propertyLocation'"
                        :inputId="field.id"
                        :label="field.placeholder"
                        class="w-full"
                        :placeholder="field.placeholder"
                        @change="field.handler"
                    />
                    <Select
                        v-else
                        :name="field.id"
                        :id="field.id"
                        class="w-full"
                        show-search
                        :label="field.placeholder"
                        :placeholder="field.placeholder"
                        :options="field.options"
                        @change="field.handler" 
                    />
                
                </div>
                <div>
                    <button class="m-10">
                        Rechercher
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import ASelect from "ant-design-vue/lib/select";
import {reactive,onMounted, onUnmounted,onDeactivated } from "vue";
import {geocode, removeScript, autocomplet} from "@/composables/google-maps-api";
import Map from "@/components/section/map/index.vue";
import Input from '@/components/Common/Input/Input.vue';
import Select from '@/components/Common/Select/Select.vue';


//reactive states
const text = reactive   ({
    title : "recherche de bien",
});
const data = reactive({
    mutable : true,
    isMapReady: false,
    PlaceCoordinates : [],
    fields : [{
        id : "propertyType",
        placeholder : "type de bien",
        options : [],
        class : "w-full",
        handler : ()=>{}
    },
    {
        id : "propertyLocation",
        placeholder : "Ou se trouve le bien ?",
        options : [],
        class : "w-full",
        handler : (e)=>{console.log(e)}
    },
    {
        id: "minPrice",
        placeholder : "Prix min",
        options : [],
        class : "w-1/2",
        handler : ()=>{}
    },
     {
        id : "maxPrice",
        placeholder : "Prix max",
        options : [],
        class : "w-1/2",

        handler : ()=>{}
    },
    ]
})

const toggleMitable = ()=>{
    data.mutable= ! data.mutable
}

//lifecycle
 onMounted( () =>{
    const proomise = geocode("Bruxelles Belgique");
    proomise.then(result =>{
        console.log(result)
        data.isMapReady = true,
        data.PlaceCoordinates.push(result.coordinates);
        });
    
    const input = document.getElementById("propertyLocation");
    console.log("input : ", input);
    autocomplet(input);

    console.log(window.google);

})

onUnmounted(()=>{
    console.log("component is unmounted");
    removeScript();    
})


const getFeatures = (features)=>features
//functions

</script>
<style lang="scss" scoped>
.map-container{
    height: 500px;
}
</style>