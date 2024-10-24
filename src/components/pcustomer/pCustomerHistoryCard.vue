<script setup lang="ts">
const props = defineProps({
    title: String
});
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
    <v-card elevation="10" >
        
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>
