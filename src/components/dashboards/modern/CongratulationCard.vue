<script setup lang="ts">
import  { ArrowUpLeftIcon } from 'vue-tabler-icons';

</script>
<template>
  <v-card elevation="10" class="position-relative overflow-hidden">
    <img src="@/assets/images/profile/businessmen.png" class="bg-img-1" />
    <v-card-text>
      <h2 class="title text-h5 overlay-title ">
        Congratulation Julia
      </h2>
      <h2 class="font-weight-medium mt-4 d-flex align-end mb-1">
        $39,358
        <span
          class="text-subtitle-1  ml-2 d-flex align-center textSecondary"
          ><ArrowUpLeftIcon  size="18"/>+9%</span
        >
      </h2>
      <v-btn color="primary" class="mt-8" flat> Download </v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.overlay-title {
  position: relative;
  z-index: 1;
}
.bg-img-1 {
    position: absolute;
    right: -18px;
    width: 247px;
    top: -50px;
}
</style>
