<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
/*Chart*/
const Chart = computed(() => {
    return {
        series: [
            {
                name: 'Earnings',
                data: [0, 5, 6, 8, 25, 9, 11, 24]
            },
            {
                name: 'Expense',
                data: [0, 3, 1, 2, 8, 1, 5, 1]
            }
        ],
        colors: [getSecondary.value, getPrimary.value],
        fill: {
            type: 'gradient',
            opacity: ['0.1', '0.1']
        },
        chart: {
            type: 'area',
            fontFamily: 'inherit',
            height: 250,
            foreColor: '#adb0bb'
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 4,
            border: 1
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            axisBorder: {
                show: false
            }
        },
        grid: {
            show: true,
            borderColor: 'rgba(0, 0, 0, .2)',
            color: 'rgba(0, 0, 0, .2)',
            strokeDashArray: 2,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        tooltip: {
            theme: 'dark'
        }
    };
});

const select = ref('March');
const items = ref(['March', 'April', 'May', 'June']);
const elementVisible = ref(false);
onMounted(() => {
    setTimeout(() => (elementVisible.value = true), 10);
});
</script>

<template>
    <v-card elevation="10">
        <v-card-text>
            <div class="d-sm-flex align-start">
                <div>
                    <h3 class="text-h5 title mb-1">Newsletter Campaign</h3>
                    <h5 class="text-subtitle-1">Overview of Newsletter Campaign</h5>
                </div>
            </div>
            <div v-show="elementVisible" class="mt-6">
                <apexchart height="250px" :options="Chart" :series="Chart.series"></apexchart>
            </div>
        </v-card-text>
    </v-card>
</template>
