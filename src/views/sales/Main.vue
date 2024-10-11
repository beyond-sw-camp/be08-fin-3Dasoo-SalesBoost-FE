<script setup>
import { ref } from 'vue';

import Act from '@/components/sales/main/Act.vue';
import Notice from '@/components/sales/main/Notice.vue';
import Lead from '@/components/sales/main/Lead.vue';
import MonthSale from '@/components/sales/main/MonthSale.vue';
</script>
<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="6"><Notice /> </v-col>
            <v-col cols="12" md="6"><Act /> </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6"><Lead /> </v-col>
            <v-col cols="12" md="6"><MonthSale /> </v-col>
        </v-row>
    </v-container>
</template>
