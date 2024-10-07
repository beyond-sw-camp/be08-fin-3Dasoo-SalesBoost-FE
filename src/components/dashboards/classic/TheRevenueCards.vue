<script setup lang="ts">
import { ref } from "vue";
import { revenueCardsData } from '@/_mockApis/components/dashboards/ClassicData';
</script>
<template>
    <v-row>
        <v-col cols="12" lg="3" sm="6" v-for="revenuecard in revenueCardsData" :revenuecard="revenuecard"
            :key="revenuecard.title" class="py-0 mb-3">
            <VCard elevation="10">
                <v-card-text class="pa-5">
                    <div class="d-flex align-center">
                        <v-btn :class="[revenuecard.iconcolor]" class="elevation-0 mr-2" icon dark>
                            <component :is="revenuecard.icon" stroke-width="1.5" size="24" />
                        </v-btn>
                        <div class="">
                            <h2 class="text-h4">
                                {{ revenuecard.number }}
                            </h2>
                            <h4 class="text-subtitle-1 mt-1">
                                {{ revenuecard.title }}
                            </h4>
                        </div>
                    </div>
                </v-card-text>
            </VCard>
        </v-col>
    </v-row>
</template>
  
  
  