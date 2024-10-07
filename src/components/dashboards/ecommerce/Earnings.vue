<script setup lang="ts">
import { CurrencyDollarIcon } from 'vue-tabler-icons';
</script>
<template>
  <v-card elevation="10" class="bg-primary mb-6">
    <v-card-text>
      <div class="d-flex align-start">
        <h2 class="text-h5 title">
          Earnings
        </h2>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-btn color="secondary" icon flat>
            <CurrencyDollarIcon />
          </v-btn>
        </div>
      </div>
      <div class="mt-4 mb-3">
        <h2 class="text-h4 font-weight-regular">$93,438.78</h2>
        <div class="text-subtitle-1 mt-1"
          >Monthly revenue</div
        >
      </div>
    </v-card-text>
  </v-card>
</template>
