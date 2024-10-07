<script setup lang="ts">
import { ref } from "vue";
import { recentTransactionData } from "@/_mockApis/components/dashboards/EcommerceData";
</script>

<template>
    <v-card elevation="10">
        <v-card-text>
            <h2 class="text-h5 mb-5">Recent Transactions</h2>
            <!-- lists -->
            <div class="px-0" v-for="(item, i) in recentTransactionData" :key="i">
                <div class="d-flex align-center py-3">
                    <div class>
                        <v-btn color="inherit" height="45" width="45" min-width="45" flat :class="
                            'pa-0 mr-3 text-' +
                            item.color +
                            ' bg-light' +
                            item.bgcolor
                        ">
                            <component :is="item.icon" stroke-width="2" size="18" />
                        </v-btn>
                    </div>
                    <div class="ml-2">
                        <h4 class="text-h6 mb-1">
                            {{ item.title }}
                        </h4>
                        <span class="
                        text-subtitle-2 textSecondary
                    d-block
                    text-truncate
                  ">{{ item.desc }}</span>
                    </div>
                    <div class="ml-auto">
                        <span :class="item.status" class="font-weight-light text-subtitle-2"> {{ item.price }}</span>
                    </div>
                </div>
            </div>
            <v-divider class="my-4"></v-divider>
            <div class="d-flex justify-space-between align-center">
                <v-btn color="secondary" flat>Add</v-btn>
                <p class="text-body-2 ma-0 text-grey-darken-1">
                    36 Recent Transactions
                </p>
            </div>
        </v-card-text>
    </v-card>
</template>
