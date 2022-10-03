
<template>
    <div>
        <h1>{{text.title}}</h1>
    </div>
</template>

<script setup>
import {reactive,onMounted, onUpdated, onUnmounted} from "vue";
import {useGoogleMapAPI, removeScript} from "@/composables/google-maps-api";

//reactive states
const text = reactive   ({
    title : "recherche de bien"
})

const googleApi = reactive({
    readyState : false,
    promiseResult : null
})
//lifecycle
 onMounted(async () =>{
   googleApi.promiseResult = await useGoogleMapAPI();
    googleApi.readyState = true;
     googleApi.readyState && console.log(window.google)
    
})


onUnmounted(()=>{
    removeScript();
})

//functions

</script>