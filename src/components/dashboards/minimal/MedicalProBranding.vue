<script setup lang="ts">
import { ref } from "vue";
import { DotsIcon } from "vue-tabler-icons";
const items = ref([
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me" },
  { title: "Click Me 2" },
]);
</script>

<template>
    <v-card elevation="10">
    <v-card-text>
      <div class="d-flex align-center mb-4">
        <h3 class="text-h5 title mb-1">MedicalPro Branding</h3>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-menu bottom left>
            <template v-slot:activator="{ props }">
              <v-btn icon color="inherit" v-bind="props" flat>
                <DotsIcon stroke-width="1.5" size="20" />
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <v-chip color="primary" label size="small">
        16 APR, 2022
      </v-chip>
      <v-row class="mt-3">
        <v-col cols="4">
          <h4 class="text-subtitle-2">Due Date</h4>
          <h5 class="text-subtitle-1 font-weight-medium">Oct 23, 2022</h5>
        </v-col>
        <v-col cols="4">
          <h4 class="text-subtitle-2">Budget</h4>
          <h5 class="text-subtitle-1 font-weight-medium">$98,500</h5>
        </v-col>
        <v-col cols="4">
          <h4 class="text-subtitle-2">Expense</h4>
          <h5 class="text-subtitle-1 font-weight-medium">$63,000</h5>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <h5 class="title text-subtitle-1 font-weight-medium mb-2">Teams</h5>

      <v-chip label size="small" color="warning" class="mr-1"> Bootstrap </v-chip>
      <v-chip label size="small" color="error"> Angular </v-chip>
      <v-divider  class="my-4"></v-divider>
      <h5 class="title text-subtitle-1 font-weight-medium mb-2">Leaders</h5>
      <div class="d-flex align-center">
        <v-avatar size="40">
          <img width="40" src="@/assets/images/profile/1.jpg" alt="John" />
        </v-avatar>
        <v-avatar size="40" class="ml-2">
          <img width="40" src="@/assets/images/profile/2.jpg" alt="John" />
        </v-avatar>
        <v-avatar size="40" class="ml-2">
          <img width="40" src="@/assets/images/profile/3.jpg" alt="John" />
        </v-avatar>
      </div>
      <v-divider  class="my-4"></v-divider>
      <div class="d-flex justify-space-between align-center mt-5">
        <v-btn color="secondary" flat>Add</v-btn>
        <p class="text-body-1 ma-0 text-grey-darken-1">36 Recent Transactions</p>
        </div>
    </v-card-text>
  </v-card>
</template>
