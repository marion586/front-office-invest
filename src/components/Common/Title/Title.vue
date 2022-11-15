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
    });
</script>

<style lang="scss" scoped>
    h1 {
        font-size: 30px;
        font-weight: v-bind(weight);
    }
    h2 {
        font-size: 28px;
        font-weight: v-bind(weight);
    }
    h3 {
        font-size: 18px;
        font-weight: v-bind(weight);
    }
    h4 {
        font-size: 16px;
        font-weight: v-bind(weight);
    }
    h5 {
        font-size: 14px;
        font-weight: v-bind(weight);
    }
</style>
