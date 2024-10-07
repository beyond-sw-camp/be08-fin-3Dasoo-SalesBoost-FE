<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
/* Chart 1 */
const Chart1 = computed(() => {
    return {
        series: [
            {
                name: "Sales C",
                data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
            },
        ],
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
            },
        },
        colors: [getSecondary.value],
        fill: {
            type: "solid",
            opacity: 1,
        },
        chart: {
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
            width: 0,
        },
        tooltip: {
            theme: "dark",
        },
    }
});

/* Chart 2 */
const Chart2 = computed(() => {
    return {
        series: [
            {
                name: "Sales B",
                data: [0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2],
            },
        ],
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
            },
        },
        colors: [getPrimary.value],
        fill: {
            type: "solid",
            opacity: 1,
        },
        chart: {
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
            width: 0,
        },
        tooltip: {
            theme: "dark",
        },
    }
});

/* Chart 3 */
const Chart3 = computed(() => {
    return {
        series: [
            {
                name: "Sales A",
                data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
            },
        ],
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
            },
        },
        colors: ["#7460ee"],
        fill: {
            type: "solid",
            opacity: 1,
        },
        chart: {
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
            width: 0,
        },
        tooltip: {
            theme: "dark",
            fillSeriesColor: false,
        },
    }
});
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4">
            <v-card elevation="10" class="overflow-visible">
                <div class="pa-5">
                    <h5 class="text-h5 title">Product A Sales</h5>
                    <div class="d-flex align-center mt-2">
                        <div class="pr-4 py-2">
                            <h6 class="font-weight-light text-subtitle-2">
                                Monthly
                            </h6>
                            <span class="font-weight-medium">80.40%</span>
                        </div>
                        <v-divider vertical></v-divider>
                        <div class="px-3 py-2">
                            <h6 class="font-weight-light text-subtitle-2">
                                Daily
                            </h6>
                            <span class="font-weight-medium">20.40%</span>
                        </div>
                    </div>
                </div>

                <apexchart type="area" height="50px" :options="Chart1" :series="Chart1.series">
                </apexchart>
            </v-card>
        </v-col>
        <v-col cols="12" lg="4">
            <v-card elevation="10" class="overflow-visible">
                <div class="pa-5">
                    <h5 class="text-h5 title">Product B Sales</h5>
                    <div class="d-flex align-center mt-2">
                        <div class="pr-4 py-2">
                            <h6 class="font-weight-light text-subtitle-2">
                                Monthly
                            </h6>
                            <span class="font-weight-medium">80.40%</span>
                        </div>
                        <v-divider vertical></v-divider>
                        <div class="px-3 py-2">
                            <h6 class="font-weight-light text-subtitle-2">
                                Daily
                            </h6>
                            <span class="font-weight-medium">20.40%</span>
                        </div>
                    </div>
                </div>

                <apexchart type="area" height="50px" :options="Chart2" :series="Chart2.series">
                </apexchart>
            </v-card>
        </v-col>
        <v-col cols="12" lg="4">
            <v-card elevation="10" class="overflow-visible">
                <div class="pa-5">
                    <h5 class="text-h5 title">Product C Sales</h5>
                    <div class="d-flex align-center mt-2">
                        <div class="pr-4 py-2">
                            <h6 class="font-weight-light text-subtitle-2">
                                Monthly
                            </h6>
                            <span class="font-weight-medium">80.40%</span>
                        </div>
                        <v-divider vertical></v-divider>
                        <div class="px-3 py-2">
                            <h6 class="font-weight-light text-subtitle-2">
                                Daily
                            </h6>
                            <span class="font-weight-medium">20.40%</span>
                        </div>
                    </div>
                </div>

                <apexchart type="area" height="50px" :options="Chart3" :series="Chart3.series">
                </apexchart>
            </v-card>
        </v-col>
    </v-row>
</template>

  