<template>
    <Radar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :width="width"
        :height="height"
        :css-classes="cssClasses"
        :styles="styles"
        :plugins="plugins"
    />
</template>

<script setup lang="ts">
import { Radar } from 'vue-chartjs';
import {
    Chart,
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement,
    ChartData,
    Plugin,
} from 'chart.js';

Chart.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement,
);

interface Props {
    chartOptions: object;
    chartData: ChartData<'radar', (number | null)[], unknown>;
    chartId?: string;
    width?: number;
    height?: number;
    cssClasses?: string;
    styles?: object | undefined;
    plugins?: Plugin<'radar'>[];
}

withDefaults(defineProps<Props>(), {
    chartId: 'radar-chart',
    width: 400,
    height: 400,
    cssClasses: '',
    styles: undefined,
    plugins: () => [],
});
</script>