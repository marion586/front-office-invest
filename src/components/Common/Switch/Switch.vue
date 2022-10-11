<script lang="ts" setup>
import ASwitch from 'ant-design-vue/lib/switch/index';
import { reactive, ref } from 'vue';

const checked = ref<Boolean>(true);

defineProps({
      check :{
            type : Boolean,
            default : false
      }
})

</script>

<template>
      <div class="">
            <h3> Switch </h3>
            <a-switch 
                  checked-children="OUI"
                  un-checked-children="NON"
                  onchange="() => checked = !checked"
            />
      </div>
</template>

<style scoped lang="scss">

</style>