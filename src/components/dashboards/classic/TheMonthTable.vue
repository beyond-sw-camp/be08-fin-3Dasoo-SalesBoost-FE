<script setup lang="ts">
import { ref } from "vue";
import { projectTableData } from "@/_mockApis/components/dashboards/ClassicData";
const select = ref({ state: "January", abbr: "FL" });
const items = ref([
    { state: "January", abbr: "FL" },
    { state: "February", abbr: "GA" },
    { state: "March", abbr: "NE" },
    { state: "April", abbr: "CA" },
]);
</script>
<template>
    <VCard elevation="10">
        <v-card-text>
            <div>
                <h3 class="text-h5 title mb-1">Project Data</h3>
                <h5 class="text-subtitle-1">Table data</h5>
            </div>
            <v-table class="month-table mt-7 mb-5">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-subtitle-1 font-weight-medium">Assigned</th>
                            <th class="text-subtitle-1 font-weight-medium">Name</th>
                            <th class="text-subtitle-1 font-weight-medium">Priority</th>
                            <th class="text-subtitle-1 font-weight-medium">Budget</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in projectTableData" :key="item.leadname" :class="item.activestate" class="month-item">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar size="40">
                                        <img :src="item.img" alt="user" width="45" />
                                    </v-avatar>
                                    <div class="mx-4">
                                        <h4 class="text-subtitle-1 text-no-wrap font-weight-medium">
                                            {{ item.leadname }}
                                        </h4>
                                        <h6 class="text-subtitle-2 text-no-wrap textSecondary mt-1">
                                            {{ item.leademail }}
                                        </h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h5 class="text-no-wrap text-body-1">
                                    {{ item.projectname }}
                                </h5>
                            </td>
                            <td>
                                <v-chip class="ma-2" :color="item.statuscolor" size="small" label>{{ item.statustext
                                }}</v-chip>
                            </td>
                            <td >
                                <h4 class="text-no-wrap text-body-1">{{ item.money }}</h4>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-table>
        </v-card-text>
    </VCard>
</template>
  
  
  