<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import ContractDetailView from './ContractDetailView.vue';
// theme breadcrumb
const page = ref({ title: '계약 정보' });


</script>

<template>
    <BaseBreadcrumb :title="page.title" ></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <ContractDetailView/>
        </v-card-text>
    </v-card>
</template>
