<script setup lang="ts">
import { ref } from "vue";
import { productPerformanceData } from "@/_mockApis/components/dashboards/EcommerceData";
import { TrashIcon } from "vue-tabler-icons";
</script>

<template>
    <v-card elevation="10">
        <v-card-text>
            <h2 class="text-h5">Products Performance</h2>
            <v-table class="month-table custom-px-0 mt-4">
                <template v-slot:default>
                    <tbody>
                        <tr class="month-item" v-for="item in productPerformanceData" :key="item.name">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar class="rounded-lg overflow-hidden" size="70">
                                        <img :src="item.avatar" :alt="item.avatar" width="90" height="70"
                                            class="rounded-lg" />
                                    </v-avatar>
                                    <div class="ml-3">
                                        <h6 class="text-subtitle-1 text-no-wrap font-weight-medium">
                                            {{ item.name }}
                                        </h6>
                                        <div class="text-subtitle-2 text-no-wrap textSecondary mt-1">
                                            {{ item.category }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div v-if="item.percent >= 40">
                                    <h6 class="font-weight-medium text-body-2 mb-1">Good</h6>
                                    <v-progress-linear color="secondary" background-color="grey lighten-3"
                                        :model-value="item.percent" rounded class="mb-1"></v-progress-linear>
                                    <span class="text-body-2 textSecondary">
                                        {{ item.percent }}% sold
                                    </span>
                                </div>
                                <div v-else>
                                    <h6 class="font-weight-medium text-body-2 mb-1">Bad</h6>
                                    <v-progress-linear color="primary" background-color="primary lighten-3"
                                        :model-value="item.percent" rounded class="mb-1"></v-progress-linear>
                                    <span class="text-body-2 textSecondary">
                                        {{ item.percent }}% sold
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span class="text-body-2 textSecondary">Earnings</span>
                                <h6 class="font-weight-medium text-body-1 mb-1">
                                    ${{ item.earn }}
                                </h6>
                            </td>
                            <td class="pl-0">
                                <v-btn icon color="transparent" flat>
                                    <TrashIcon size="20" />
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-table>
        </v-card-text>
    </v-card>
</template>
