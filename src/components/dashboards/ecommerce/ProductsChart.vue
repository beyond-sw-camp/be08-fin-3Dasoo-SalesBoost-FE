<script setup lang="ts">
import { ref, computed } from "vue";
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
/* Chart */
const Chart1 = computed(() => {
    return {
        series: [
            {
                name: "Products Performance",
                data: [35, 60, 30, 55, 40],
            },
        ],

        grid: {
            show: false,
        },
        colors: [getSecondary.value],
        chart: {
            toolbar: {
                show: false,
            },
            foreColor: "#adb0bb",
            fontFamily: `inherit`,
            type: "line",
            height: 30,
            sparkline: {
                enabled: true,
            },
        },
        markers: {
            size: 0,
        },
        legend: {
            show: false,
        },
        stroke: {
            show: true,
            width: 2,
            curve: "smooth",
        },
        tooltip: {
            theme: "dark",
        },
    }
});

/* Chart 2*/
const Chart2 = computed(() => {
    return {
        series: [
            {
                name: "Expence",
                data: [300, 300, 180, 320, 250, 300, 300],
            },
            {
                name: "Budget",
                data: [60, 90, 80, 60, 70, 100, 80],
            },
        ],

        grid: {
            show: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "25%",
                borderRadius: [8],
                borderRadiusApplication: 'end',
            },
        },
        colors: [getPrimary.value, getSecondary.value],
        fill: {
            type: "solid",
            opacity: 1,
        },
        chart: {
            type: "bar",
            height: 285,
            stacked: true,
            toolbar: {
                show: false,
            },
            foreColor: "#adb0bb",
            fontFamily: `inherit`,
            sparkline: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        legend: {
            show: false,
        },
        xaxis: {
            type: "category",
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            min: 100,
            max: 400,
            tickAmount: 3,
        },

        stroke: {
            show: true,
            width: 2,
            curve: "smooth",
        },
        tooltip: {
            theme: "dark",
        },
    }
});
</script>

<template>
    <v-card elevation="10">
        <v-card-text class="pb-0">
            <div class="d-sm-flex align-center mb-5">
                <h2 class="text-h5">Products Performance</h2>
                <v-spacer></v-spacer>
                <div>
                    <div class="d-flex align-center">
                        <div class="d-flex align-center px-2">
                            <span class="text-primary">
                                <span class="overline">
                                    <i class="mdi mdi-brightness-1 mx-1"></i>
                                </span>
                                <span class="font-weight-regular">Budget</span>
                            </span>
                        </div>
                        <div class="d-flex align-center px-2">
                            <span class="text-secondary">
                                <span class="overline">
                                    <i class="mdi mdi-brightness-1 mx-1"></i>
                                </span>
                                <span class="font-weight-regular">Expence</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <v-row>
                <v-col lg="4" cols="12">
                    <h3 class="text-h5 mt-3">$93,438.78</h3>
                    <span class="text-subtitle-2">Budget</span>

                    <h3 class="text-h5 mt-6">$32,839</h3>
                    <span class="text-subtitle-2">Expense</span>

                    <!-- chart -->
                    <div class="my-3">
                        <apexchart type="line" height="30px" :options="Chart1" :series="Chart1.series"></apexchart>
                    </div>

                    <v-btn color="secondary" class="mt-3" flat>Download Report</v-btn>
                </v-col>
                <v-col lg="8">
                        <div>
                            <apexchart type="bar" height="285px" :options="Chart2" :series="Chart2.series"></apexchart>
                        </div>
                    </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>