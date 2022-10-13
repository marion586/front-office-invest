<script setup>
    import { reactive, onMounted } from 'vue';
    import 'leaflet/dist/leaflet.css';
    import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
    import Map from '@/composables/map';
    import 'leaflet-draw/dist/leaflet.draw.css';

    const props = defineProps({
        mapCenterCoordinate: {
            type: [Array, Object],
            default: () => ({ lat: 50.84535101789271, lng: 4.352409839630127 }),
        },
        needMarkerLayer: {
            type: Boolean,
            default: false,
        },
        markersCoordinates: {
            type: [Array, Object],
            default: () => [],
        },
        getFeatures: {
            type: Function,
            default: () => {},
        },
    });

    const emit = defineEmits(['touched']);

    onMounted(() => {
        const map = new Map('map');
        if (props.needMarkerLayer) {
            map.fitBound(props.mapCenterCoordinate);
            props.markersCoordinates.forEach((marker) => {
                map.addMarker(marker, () => {
                    emit('touched', marker);
                });
            });
        }
        map.addDrawControl();
        map.addPrintControl();
        map.DrawingLayerListener();
    });
    const getFeatures = () => props.getFeatures(map.layers);
    //marker1.onClick()
</script>
<template>
    <div class="fix-z-index" id="map" />
</template>
<style lang="scss" scoped>
    .fix-z-index {
        z-index: -100;
    }
</style>
