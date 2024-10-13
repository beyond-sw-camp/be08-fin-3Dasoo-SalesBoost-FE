<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import SalesDetailView from './SalesDetailView.vue';
// theme breadcrumb
const page = ref({ title: '매출 정보' });


</script>

<template>
    <BaseBreadcrumb :title="page.title" ></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <SalesDetailView/>
        </v-card-text>
    </v-card>
</template>
