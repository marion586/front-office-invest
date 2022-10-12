<script lang="ts" setup>
const emit = defineEmits(['onPrev', 'onNext'])

</script>

<template>
      <h3>Adresse</h3>
      <button @click="() => emit('onPrev')">Prev</button>
      <button @click="() => emit('onNext')">Next</button>
</template>