<template>
    <div class="rounded-lg w-full columns-1 bg-white p-3 my-3 border">
        <p class="text-start">
            <b>
                {{ props.title }}
            </b>
        </p>
    </div>
</template>
<script setup>
    const props = defineProps({
        title : {
            type : String,
            default : "",
            required : true
        }
    }) 
</script>
