<template>
    <AppChartRadar
        :chart-data="chartData"
        :chart-options="chartOptions"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import cssVariables from '@/common/configs/css-variables';
import { selfEvaluationStore } from '@/store/self-evaluation';
import AppChartRadar from '@/components/AppChartRadar.vue';

const store = selfEvaluationStore();
const radarData = computed(() => store.getRadarChartData);

const chartData = computed(() => {
    return {
        labels: radarData.value.labels,
        datasets: [{
            label: 'Self-Evaluation',
            data: radarData.value.data,
            fill: true,
            backgroundColor: cssVariables.color_pink,
            borderColor: cssVariables.color_pink,
            pointBackgroundColor: cssVariables.color_pink,
            pointBorderColor: cssVariables.color_white,
            pointHoverBackgroundColor: cssVariables.color_white,
            pointHoverBorderColor: cssVariables.color_pink,
        }],
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                font: {
                    size: 20,
                    weight: 600,
                },
            },
        },
    },
    scales: {
        r: {
            angleLines: {
                display: false,
            },
            suggestedMin: 0,
            suggestedMax: 100,
            pointLabels: {
                font: {
                    size: 14,
                },
            },
            ticks: {
                stepSize: 20,
            },
        },
    },
}
</script>