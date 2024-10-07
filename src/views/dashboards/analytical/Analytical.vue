<script setup lang="ts">
import { ref } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import UiTittleSubtitleCard from "@/components/shared/UiTittleSubtitleCard.vue";
import TheSalesOverview from "@/components/dashboards/analytical/TheSalesOverview.vue";
import TotalSales from "@/components/dashboards/analytical/TotalSales.vue";
import BlogCard from "@/components/dashboards/analytical/BlogCard.vue";
import NewsletterCampaign from "@/components/dashboards/analytical/NewsletterCampaign.vue";
import TheBandwidthUsage from "@/components/dashboards/analytical/TheBandwidthUsage.vue";
import TheDownloadCount from "@/components/dashboards/analytical/TheDownloadCount.vue";
import TheWeatherCard from '@/components/dashboards/analytical/TheWeatherCardVue.vue';
import TheProfileCard from '@/components/dashboards/analytical/TheProfileCard.vue';
import TheMyContacts from '@/components/dashboards/analytical/TheMyContacts.vue';
import TheActivityTimeline from '@/components/dashboards/analytical/TheActivityTimeline.vue'
import SnackBar from '@/components/dashboards/snackbar.vue';
const page = ref({ title: "Analytical" });
const breadcrumbs = ref([
  {
    text: "Dashboard",
    disabled: false,
    href: "#",
  },
  {
    text: "Analytical",
    disabled: true,
    href: "#",
  },
]);
</script>

<template>
  <!-- Loader -->
  <SnackBar />
    <!-- Loader -->

  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <!---Sales overview--->
    <v-col cols="12" sm="12" lg="8">
      <TheSalesOverview />
    </v-col>
    <!---Our visiters--->
    <v-col cols="12" sm="12" lg="4">
      <UiTittleSubtitleCard title="Our Visitors" subtitle="Different Devices Used to Visit">
        <TotalSales />
      </UiTittleSubtitleCard>
    </v-col>
    <!---Blog cards--->
    <v-col cols="12" sm="12" lg="4">
      <BlogCard />
    </v-col>
    <!---Newsletter Campaign--->
    <v-col cols="12" sm="12" lg="8">
      <NewsletterCampaign />
    </v-col>
    <!---Bandwidth usage--->
    <v-col cols="12" sm="12" lg="4">
      <TheBandwidthUsage />
    </v-col>
    <!---Download count--->
    <v-col cols="12" sm="12" lg="4">
      <TheDownloadCount />
    </v-col>
    <v-col cols="12" sm="12" lg="4">
      <TheWeatherCard />
    </v-col>
    <!---Profile card /my contacts--->
    <v-col cols="12" sm="12" lg="4">
      <TheProfileCard />
      <div class="mt-7"></div>
      <TheMyContacts />
    </v-col>
    <!---Activity timeline tabs--->
    <v-col cols="12" sm="12" lg="8">
      <TheActivityTimeline />
    </v-col>
  </v-row>
</template>
