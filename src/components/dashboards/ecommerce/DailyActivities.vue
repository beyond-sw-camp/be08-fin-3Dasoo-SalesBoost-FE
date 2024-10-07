<script setup lang="ts">
import { ref } from "vue";
import { DotsCircleHorizontalIcon, DotsIcon } from "vue-tabler-icons";

const items = ref([
  { title: "Action" },
  { title: "Another Action" },
  { title: "Something else here" },
]);
</script>

<template>
  <v-card elevation="10">
    <v-card-text>
      <div class="d-flex align-center mb-5">
        <h2 class="text-h5">Daily Activities</h2>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-menu anchor="left" transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn icon color="inherit" v-bind="props" flat>
                <DotsIcon size="20"/>
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

      <img
        src="@/assets/images/backgrounds/blog-bg-2x.jpg"
        alt="image"
        style="width: 100%"
      />

      <h4 class="text-h6 mt-6">
        React 18 coming soon!
      </h4>
      <h5 class="text-subtitle-2">By Johnathan Doe</h5>
      <p class="mt-4 mb-4">
        This will be the small description for the news you have shown here.
        There could be some great info.
      </p>
      <v-btn color="secondary" flat>Read More</v-btn>
    </v-card-text>
  </v-card>
</template>
