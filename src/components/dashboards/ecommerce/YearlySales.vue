<script setup lang="ts">
import { ref, computed } from "vue";
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
import { ShoppingCartIcon } from "vue-tabler-icons";
/* Chart */
const Chart = computed(() => {
    return {
        series: [25, 25, 25, 25],
        plotOptions: {
            pie: {
                donut: {
                    size: "65%",
                    background: "transparent",
                    labels: {
                        show: false,
                        name: {
                            show: true,
                            fontSize: "18px",
                            color: undefined,
                            offsetY: -10,
                        },
                        value: {
                            show: false,
                            color: "#98aab4",
                        },
                        total: {
                            show: false,
                            label: "Our Visitors",
                            color: "#98aab4",
                        },
                    },
                },
            },
        },
        labels: ["2021", "2020", "2019", "2018"],
        colors: [getSecondary.value, "#1e4db7", "#fec90f", "#ecf0f2"],
        chart: {
            toolbar: {
                show: false,
            },
            foreColor: "#adb0bb",
            fontFamily: "'DM Sans',sans-serif",
            type: "donut",
            height: 145,
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
        stroke: {
            colors: ["transparent"],
        },
        tooltip: {
            theme: "dark",
            fillSeriesColor: false,
        },

    }
});
</script>

<template>
    <v-card elevation="10">
        <v-card-text>
            <v-row>
                <v-col sm="6">
                    <h3 class="text-h4">43,246</h3>
                    <div class="text-subtitle-1 font-weight-regular mt-1">Yearly Sales</div>
                    <div class="d-flex align-center justify-space-between mt-4">
                        <span class="d-flex align-center">
                            <span class="text-overline">
                                <i class="mdi mdi-brightness-1 text-primary mx-1"></i>
                            </span>
                            <span class="font-weight-regular">2021</span>
                        </span>
                        <span class="d-flex align-center">
                            <span class="text-overline">
                                <i class="mdi mdi-brightness-1 text-secondary mx-1"></i>
                            </span>
                            <span class="font-weight-regular">2020</span>
                        </span>
                    </div>
                    <div class="d-flex align-center justify-space-between">
                        <span class="d-flex align-center">
                            <span class="text-overline">
                                <i class="mdi mdi-brightness-1 text-warning mx-1"></i>
                            </span>
                            <span class="font-weight-regular">2019</span>
                        </span>
                        <span class="d-flex align-center">
                            <span class="text-overline">
                                <i class="mdi mdi-brightness-1 mx-1"></i>
                            </span>
                            <span class="font-weight-regular">2018</span>
                        </span>
                    </div>
                </v-col>
                <v-col sm="6">
                    <div class="position-relative ml-auto">
                        <apexchart type="donut" height="145px" :options="Chart"
                            :series="Chart.series"></apexchart>
                        <ShoppingCartIcon size="20"  class="center-icon text-medium-emphasis"/>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style lang="scss">
.center-icon {
    position: absolute;
    left: 43%;
    top: 43%;
    opacity: 0.6;
}
</style>
