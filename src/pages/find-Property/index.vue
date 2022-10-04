
<template>
    <div class="w-full flex container">
        <div class="md:w-3/5 sm:w-full p-5">
            <Map class="w-full map-container" />
        </div>
        <div class="md:w-2/5 sm:w-full p-5">
            <h1>{{text.title}}</h1>
            <div class="container flex-col justify-center">
                <div 
                    class="container flex-col"
                    v-for="(field, idx) in data.fields"
                    :key="idx"
                >
                    <div>
                        <label :for="field.placeholder">Je cherche</label>
                    </div>
                    <div>
                        <a-select 
                            :id="field.placeholder"
                            v-model="value"
                            show-search
                            :placeholder="field.placeholder"
                            style="width: 200px"
                            :options="field.options"
                            :filter-option="filterOption"
                            @change="field.handler"
                        />
                    </div>
                    <div>
                    </div>
                </div>
                <div>
                    <button>
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
import {useGoogleMapAPI, removeScript} from "@/composables/google-maps-api";


//reactive states
const text = reactive   ({
    title : "recherche de bien",
});
const data = reactive({
    fields : [{
        placeholder : "type de bien",
        options : [],
        handler : ()=>{}
    },
    {
        placeholder : "Ou se trouve le bien ?",
        options : [],
        handler : ()=>{}
    },
    {
        placeholder : "Prix mix",
        options : [],
        handler : ()=>{}
    },
     {
        placeholder : "Prix mix",
        options : [],
        handler : ()=>{}
    },
    ]
})


const googleApi = reactive({
    readyState : false,
    promiseResult : null
})
//lifecycle
 onMounted(async () =>{

   googleApi.promiseResult = await useGoogleMapAPI();
    googleApi.readyState = true;
     googleApi.readyState && console.log(window.google);
    
})


onUnmounted(()=>{
    removeScript();
})

//functions

</script>
<style lang="scss" scoped>
.map-container{
    height: 500px;
}
</style>