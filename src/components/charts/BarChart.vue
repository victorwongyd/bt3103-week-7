<template>
    <div class="chart">
        <h1>Bar Chart</h1>
        <bar-chart></bar-chart>
    </div>
</template>

<script>
import Chart from "./BarChart.js";

export default {
    components: {
        'bar-chart': Chart
    }
}
</script>

<style>
</style>