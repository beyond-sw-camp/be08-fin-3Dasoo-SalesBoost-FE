<script setup lang="ts">
import { ref, computed } from "vue";
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
/*Chart 1*/
const Chart1 = computed(() => {
    return {
        series: [
            {
                name: "",
                data: [4, 5, 2, 10, 9, 12, 4, 9],
            },
        ],
        colors: [getSecondary.value],
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: "flat",
                columnWidth: "65%",
            },
        },
        chart: {
            toolbar: {
                show: false,
            },
            sparkline: { enabled: true },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            show: false,
            labels: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        grid: {
            show: false,
            stroke: {
                show: false,
            },
            padding: {
                top: 0,
                bottom: 0,
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            x: {
                show: false,
            },
        },
    }
});

/*Chart 2*/
const Chart2 = computed(() => {
    return {
        series: [
            {
                name: "",
                data: [2, 5, 6, 10, 9, 12, 4, 9],
            },
        ],
        colors: ["#7460ee"],
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: "flat",
                columnWidth: "65%",
            },
        },
        chart: {
            toolbar: {
                show: false,
            },
            sparkline: { enabled: true },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            show: false,
            labels: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        grid: {
            show: false,
            stroke: {
                show: false,
            },
            padding: {
                top: 0,
                bottom: 0,
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            x: {
                show: false,
            },
        },
    }
});

/*Chart 3*/
const Chart3 = computed(() => {
    return {
        series: [
            {
                name: "",
                data: [4, 5, 6, 10, 9, 12, 4, 9],
            },
        ],
        colors: [getPrimary.value],
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: "flat",
                columnWidth: "65%",
            },
        },
        chart: {
            toolbar: {
                show: false,
            },
            sparkline: { enabled: true },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            show: false,
            labels: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        grid: {
            show: false,
            stroke: {
                show: false,
            },
            padding: {
                top: 0,
                bottom: 0,
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            x: {
                show: false,
            },
        },

    }
});

/*Chart 4*/
const Chart4 = computed(() => {
    return {
        series: [
            {
                name: "",
                data: [2, 5, 6, 10, 9, 12, 4, 9],
            },
        ],
        colors: ["#f62d51"],
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: "flat",
                columnWidth: "65%",
            },
        },
        chart: {
            toolbar: {
                show: false,
            },
            sparkline: { enabled: true },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            show: false,
            labels: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        grid: {
            show: false,
            stroke: {
                show: false,
            },
            padding: {
                top: 0,
                bottom: 0,
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            x: {
                show: false,
            },
        },
    }
});
</script>
<template>
    <v-row>
        <v-col cols="12" sm="12" lg="3">
            <v-card elevation="10" class="text-center">
                <v-card-text class="pa-5">
                    <h3 class="text-h6 font-weight-regular">Unique Visit</h3>
                    <div class="mt-3">
                        <div style="width: 90px; margin: 0 auto">
                            <apexchart type="bar" height="65px" :options="Chart1" :series="Chart1.series">
                            </apexchart>
                        </div>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <div class="pa-2 text-center">
                    <h4 class="mb-0 text-h6">
                        <i class="ti-angle-up success--text"></i> 12456
                    </h4>
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="3">
            <v-card elevation="10" class="text-center">
                <v-card-text class="pa-5">
                    <h3 class="text-h6 font-weight-regular">Total Visit</h3>
                    <div class="mt-3">
                        <div style="width: 90px; margin: 0 auto">
                            <apexchart type="bar" height="65px" :options="Chart2" :series="Chart2.series">
                            </apexchart>
                        </div>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <div class="pa-2 text-center">
                    <h4 class="mb-0 text-h6">
                        <i class="ti-angle-up success--text"></i> 456
                    </h4>
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="3">
            <v-card elevation="10" class="text-center">
                <v-card-text class="pa-5">
                    <h3 class="text-h6 font-weight-regular">Bounce rate</h3>
                    <div class="mt-3">
                        <div style="width: 90px; margin: 0 auto">
                            <apexchart type="bar" height="65px" :options="Chart3" :series="Chart3.series">
                            </apexchart>
                        </div>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <div class="pa-2 text-center">
                    <h4 class="mb-0 text-h6">
                        <i class="ti-angle-up success--text"></i> 12456
                    </h4>
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="3">
            <v-card elevation="10" class="text-center">
                <v-card-text class="pa-5">
                    <h3 class="text-h6 font-weight-regular">Page Views</h3>
                    <div class="mt-3">
                        <div style="width: 90px; margin: 0 auto">
                            <apexchart type="bar" height="65px" :options="Chart4" :series="Chart4.series">
                            </apexchart>
                        </div>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <div class="pa-2 text-center">
                    <h4 class="mb-0 text-h6">
                        <i class="ti-angle-up success--text"></i> 456
                    </h4>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>
  
 
  