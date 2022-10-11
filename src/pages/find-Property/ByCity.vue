<script setup>
import Input from "@/components/Common/Input/Input.vue" 
import SearchIcon from "@/components/Icon/Search.vue";
import Title from "@/components/Common/Title/Title.vue";
import {ref} from "vue";

const title = ref("Recherche");
const section = ref("| A partir d'une ville");
</script>

<template>
    <div class="w-full py-3">
        <div class="container-wrapper">
            <div class="w-full flex justify-start">
                <div>
                    <Title 
                        :label="title" 
                        type="normal"
                    />
                </div>
                <div>
                    <p class="font-bold">{{ section }}</p>
                </div>
            </div>
            <input 
                class="w-full"
                id="city"
                label="rechercher à partir d'une ville"
                />
        </div>

    </div>
</template>
<style lang="scss" scoped>
    .container-wrapper{
        @apply container w-full bg-white;
    }
</style>
