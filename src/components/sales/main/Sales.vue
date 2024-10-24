<script setup>
import { CalendarEventIcon, CalendarIcon } from 'vue-tabler-icons';

const props = defineProps({
    yearTarget: String,
    yearResult: String,
    yearAchievement: Number,
    monthTarget: String,
    monthResult: String,
    monthAchievement: Number
});
</script>
<template>
    <v-col cols="12">
        <v-card-subtitle class="sub_title">영업현황</v-card-subtitle>
        <v-divider :thickness="3" class="border-opacity-50 mb-3" color="primary"></v-divider>
        <v-row>
            <v-col cols="12">
                <v-card class="mb-4" variant="outlined">
                    <v-row>
                        <v-col cols="12" md="2">
                            <v-card-title class="text-h6 font-weight-bold grey--text">
                                <component class="mr-2" :is="CalendarEventIcon" stroke-width="1.5" size="25" />
                                <span>년</span>
                            </v-card-title>
                        </v-col>
                        <v-col cols="12" md="10">
                            <v-row>
                                <v-col cols="4">
                                    <div class="font-weight-bold">목표</div>
                                    <div class="text-h5">{{ props.yearTarget }}</div>
                                </v-col>
                                <v-col cols="4">
                                    <div class="font-weight-bold">실적</div>
                                    <div class="text-h5">{{ props.yearResult }}</div>
                                </v-col>
                                <v-col cols="4">
                                    <div class="font-weight-bold">달성</div>
                                    <div class="text-h5 red--text">{{ props.yearAchievement }}%</div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card class="mb-4" variant="outlined">
                    <v-row>
                        <v-col cols="12" md="2">
                            <v-card-title class="text-h6 font-weight-bold grey--text">
                                <component class="mr-2" :is="CalendarIcon" stroke-width="1.5" size="25" />
                                <span>당월</span>
                            </v-card-title>
                        </v-col>
                        <v-col cols="12" md="10">
                            <v-row>
                                <v-col cols="4">
                                    <div class="font-weight-bold">목표</div>
                                    <div class="text-h5">{{ props.monthTarget }}</div>
                                </v-col>
                                <v-col cols="4">
                                    <div class="font-weight-bold">실적</div>
                                    <div class="text-h5">{{ props.monthResult }}</div>
                                </v-col>
                                <v-col cols="4">
                                    <div class="font-weight-bold">달성</div>
                                    <div class="text-h5 red--text">{{ props.monthAchievement }}%</div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>
