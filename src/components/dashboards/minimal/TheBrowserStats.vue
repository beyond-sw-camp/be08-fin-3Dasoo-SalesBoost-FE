<script setup lang="ts">
  import { ref } from "vue";
    import { browserStatesData } from '@/_mockApis/components/dashboards/MinimalData';
  </script>
<template>
    <v-card elevation="10">
      <v-card-text>
        <h3 class="text-h5">Browser Stats</h3>
        <div
          class="d-flex align-center pb-1 mt-5"
          v-for="item in browserStatesData"
          :key="item.name"
        >
          <div>
            <img :src="item.img" alt="logo" />
          </div>
          <div class="mx-2">{{ item.name }}</div>
          <v-spacer></v-spacer>
          <div class="ml-auto">
            <v-chip class="ma-2" small label :color="item.color">{{
              item.visit
            }}</v-chip>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  
  