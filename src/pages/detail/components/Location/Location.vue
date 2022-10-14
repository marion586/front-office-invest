<template>
    <!-- <div class="w-full"> -->
    <Map
        class="my-map"
        :mapCenterCoordinate="mapData[0]"
        @touched="testEvent"
        :needMarkerLayer="true"
        :needPolygonLayer="true"
        :markersCoordinates="mapData"
        :polygonCoordinates="poly"
    />
    <!-- </div> -->
</template>

<script lang="ts" setup>
    import Map from '@/components/section/map/index.vue';

    const mapData = [{ lat: 50.84535101789271, lng: 4.352409839630127 }];
    const poly: Array<object> = [
        { lat: 50.84665167605899, lng: 4.350414276123048 },
        { lat: 50.84440259845273, lng: 4.349427223205567 },
        { lat: 50.84429420643197, lng: 4.354748725891114 },
        { lat: 50.84684135234525, lng: 4.3580961227417 },
    ];
    function testEvent() {
        console.log('first');
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
