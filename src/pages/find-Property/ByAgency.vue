<script setup>
import {removeScript, useGoogleMapAPI} from "@/composables/google-maps-api";
import Input from "@/components/Common/Input/Input.vue" 
import SearchIcon from "@/components/Icon/Search.vue";
import Title from "@/components/Common/Title/Title.vue";
import P from "@/components/Common/Paragraphe/Paragraphe.vue";

import {ref,reactive, onMounted, onBeforeMount, onUnmounted} from "vue";

const title = ref("Recherche");
const section = ref("| A partir d'une agence");
const input = ref({
    id : "agency",
    label : "Rechercher"
});
const data = reactive({
    result : ""
})

onMounted(()=>{
    let  auto;
    const input_id = document.getElementById(input.value.id);
    const options = {
                        fields : ["address_components","geometry","formatted_address"]
                    }
    if(!window.google){
        const result = useGoogleMapAPI();
        result.then((google) => {
            auto = new google.maps.places.Autocomplete(input_id,options);
            auto.addListener('place_changed', (e) => {
                const res = auto.getPlace();
                data.result = res
            }); 
        })
    }else{
            auto = new window.google.maps.places.Autocomplete(input, options);
            auto.addListener('place_changed', (e) => {
                const res = auto.getPlace();
                data.result = res
            });
    }
        
})

onUnmounted(()=>{
    removeScript();
})
</script>

<template>
    <div class="container w-full py-3">
        <div class="container-wrapper">
            <div class="container-title">
                <div>
                    <Title 
                        :label="title" 
                        type="normal"
                    />
                </div>
                <div>
                    <P type="bold">{{ section }}</P>
                </div>
            </div>
            <hr class="my-3">
            <div class="container-input">
                <input 
                    class="find-input"
                    :id="input.id"
                    :placeholder="input.label"
                />
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
        
        .container{
            &-wrapper{
                @apply w-full py-3 px-2 bg-white h-[90vh];                
            }
            &-title{
                @apply w-full flex justify-start;
            }
            &-input{
                @apply w-full pb-3;
            }
            
            
        }
        .find{
            &-input{
                @apply w-full h-[25px] p-2;
                background-color: var(--color-gray);
            }
        }
    
    @screen md{

        .container{
            &-title{
                @apply w-full flex justify-start p-5;
            }
            &-input{
                @apply w-full flex justify-center p-10;
            }

            &-wrapper{
                @apply container  bg-white flex-row justify-center h-[70vh];
            }
            
        }
        .find{
            &-input{
                @apply w-1/2 h-[38px] px-5 ;
                background-color: var(--color-gray);
            }
        }
    }
</style>
