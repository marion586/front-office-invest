<script setup>
import { ref } from "vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h1>Hello {{ name }}</h1>
</template>
