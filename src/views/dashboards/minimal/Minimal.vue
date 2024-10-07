<script setup lang="ts">
import { ref } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import TheEarningCard from "@/components/dashboards/minimal/TheEarningCard.vue";
import CurrentVisits from "@/components/dashboards/classic/CurrentVisits.vue";
import TheBrowserStats from "@/components/dashboards/minimal/TheBrowserStats.vue";
import TheTotalRevenue from "@/components/dashboards/minimal/TheTotalRevenue.vue";
import TheSalesPrediction from "@/components/dashboards/minimal/TheSalesPrediction.vue";
import TheSalesDifference from "@/components/dashboards/minimal/TheSalesDifference.vue";
import TheBlogCard from "@/components/dashboards/minimal/TheBlogCard.vue";
import WeeklyStats from "@/components/dashboards/minimal/WeeklyStats.vue";
import MedicalProBranding from "@/components/dashboards/minimal/MedicalProBranding.vue";

const page = ref({ title: "Minimal" });
const breadcrumbs = ref([
    {
        text: "Dashboard",
        disabled: false,
        href: "#",
    },
    {
        text: "Minimal",
        disabled: true,
        href: "#",
    },
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <!---Earning card---->
        <v-col cols="12" lg="12">
            <TheEarningCard />
        </v-col>
        <!---Current visits---->
        <v-col cols="12" lg="8">
            <CurrentVisits />
        </v-col>
        <!---Browser states---->
        <v-col cols="12" lg="4">
            <TheBrowserStats />
        </v-col>
        <!---Total revenue---->
        <v-col cols="12" lg="8">
            <TheTotalRevenue />
        </v-col>
        <!---Sales prediction / Sales Diffrences---->
        <v-col cols="12" lg="4">
            <TheSalesPrediction />
            <div class="mb-7"></div>
            <TheSalesDifference />
        </v-col>
        <!--The blog card---->
        <v-col cols="12" lg="4">
            <TheBlogCard />
        </v-col>
        <!--Weekly states---->
        <v-col cols="12" lg="4">
            <WeeklyStats />
        </v-col>
        <v-col cols="12" lg="4">
            <MedicalProBranding />
        </v-col>
    </v-row>
</template>
