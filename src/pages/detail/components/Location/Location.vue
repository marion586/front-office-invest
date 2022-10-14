<template>
    <!-- <div class="w-full"> -->
    <Map
        class="my-map"
        :mapCenterCoordinate="mapData[0]"
        @touched="testEvent"
        :needMarkerLayer="true"
        :markersCoordinates="mapData"
    />
    <!-- </div> -->
</template>

<script lang="ts" setup>
    import Map from '@/components/section/map/index.vue';

    const mapData = [{ lat: 50.84535101789271, lng: 4.352409839630127 }];

    function testEvent(){
        console.log("first")
    }
</script>

<style lang="scss" scoped>
    .my-map {
        height: 100vh;
        width: 100%;
        border-radius: 8px;
        z-index: 9;
    }
</style>
