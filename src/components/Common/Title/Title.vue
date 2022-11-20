<template>
    <component :is="type">
        {{ label }}
    </component>
</template>

<script lang="ts" setup>
    defineProps({
        type: {
            type: String,
            required: true,
            default: 'h1',
        },
        label: {
            type: [String, Number],
            required: true,
        },
        weight: {
            type: [Number, String],
            default: 'normal',
        },
        color: {
            type: String,
            default: '#000',
        },
    });
</script>

<style lang="scss" scoped>
    h1 {
        font-size: 30px;
        font-weight: v-bind(weight);
        color: v-bind(color);
    }
    h2 {
        font-size: 28px;
        font-weight: v-bind(weight);
        color: v-bind(color);
    }
    h3 {
        font-size: 18px;
        font-weight: v-bind(weight);
        color: v-bind(color);
    }
    h4 {
        font-size: 16px;
        font-weight: v-bind(weight);
        color: v-bind(color);
    }
    h5 {
        font-size: 14px;
        font-weight: v-bind(weight);
        color: v-bind(color);
    }
</style>
