
<template>
    <div class="w-full flex">
        <div class="md:w-2/3 sm:w-full ">
            <Map 
                v-if="data.isMapReady"
                class="w-full map-container p-5"
                :mapCenterCoordinate="data.PlaceCoordinates"
                :needMarkerLayer="true"
                :markersCoordinates="data.PlaceCoordinates"
            />
        </div>
        <div class="md:w-1/3 sm:w-full p-5">
            <h1>{{text.title}}</h1>
            <div class="flex flex-wrap justify-center">
                <div 
                    class="container flex-col pt-5"
                    v-for="(field, idx) in data.fields"
                    :key="idx"
                    :class="field.class"
                >
                    <div  class="w-full pb-2">
                        <label :for="field.placeholder">{{ field.placeholder }}</label>
                    </div>
                    <div>
                        <a-select
                            class="w-full"
                            :id="field.id"
                            v-model="value"
                            show-search
                            :placeholder="field.placeholder"
                            :options="field.options"
                            :filter-option="filterOption"
                            @change="field.handler"
                        />
                    </div>
                    <div>
                    </div>
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
import {reactive,onMounted, onUnmounted} from "vue";
import {geocode, removeScript, autocomplet} from "@/composables/google-maps-api";
import Map from "@/components/section/map/index.vue";

//reactive states
const text = reactive   ({
    title : "recherche de bien",
});
const data = reactive({
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
        handler : ()=>{}
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

//lifecycle
 onMounted( () =>{
    const proomise = geocode("Bruxelles Belgique");
    proomise.then(result =>{
        console.log(result)
        data.isMapReady = true,
        data.PlaceCoordinates.push(result.coordinates);
    });    
})


onUnmounted(()=>{
    removeScript();
    autocomplet("autocomplet");
})

//functions

</script>
<style lang="scss" scoped>
.map-container{
    height: 500px;
}
</style>