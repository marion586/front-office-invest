<script lang="ts" setup>
    import PieChartVue from '@/components/Common/Chart/PieChart.vue';
    import projectService from '@/services/projectService';
    import Title from '@/components/Common/Title/Title.vue';
    import { onMounted, ref } from 'vue';

    const chartData = ref({
        labels: [
            'Janvier',
            'Fevrier',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Decembre',
        ],
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
    });

    async function getAllProject() {
        const { data } = await projectService.getProject();
        data.forEach((item: any) => {
            let date = new Date(item.created_at);
            let mounth = date.getMonth();
            chartData.value.datasets[0].data[mounth]++;
        });
    }

    onMounted(() => {
        getAllProject();
    });
</script>

<template>
    <div class="container">
        <Title
            type="h3"
            label="Chart graphique qui ulistre le nombre project par rapport au mois"
            weight="bold"
        />

        <PieChartVue class="" :chartData="chartData" />
    </div>
</template>

<style lang="scss" scoped>
    .container {
        @apply flex flex-col items-center gap-[20px];
    }
</style>
