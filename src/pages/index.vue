<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

import HelloWorld from "@/components/HelloWorld.vue";

const loading = ref(true);

const store = useStore();

onMounted(async () => {
  await store.dispatch("HomeModule/setData");
  loading.value = false;
});

const homeData = computed(() => store.getters["HomeModule/getHomeData"]);
</script>

<template>
  <HelloWorld name="world" />
  <div v-if="loading">Loading ...</div>
  <ul v-else>
    <li v-for="(d, index) in homeData" :key="`home-${index}`">
      {{ d.name }}
    </li>
  </ul>
</template>
