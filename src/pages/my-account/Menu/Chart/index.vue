<script lang="ts" setup>
    import PieChartVue from '@/components/Common/Chart/PieChart.vue';
    import { ref } from 'vue';
    const chartData = ref({
        labels: ['un', 'un', 'un', 'un', 'un', 'un', 'un', 'un'],
        datasets: [
            {
                backgroundColor: [
                    '#E46651',
                    '#ccc',
                    '#00D8FF',
                    '#0000000',
                    '#AE1B16',
                    '#41B883',
                    '#fe2a16',
                    '#DD1B16',
                ],
                data: [1, 2, 1, 2, 4, 5, 6, 8],
            },
        ],
    });
</script>

<template>
    <div>
        <h1>Mon chairt</h1>
        <h1>Mon Cart 2</h1>
        <PieChartVue />
    </div>
</template>

<style lang="scss" scoped></style>
