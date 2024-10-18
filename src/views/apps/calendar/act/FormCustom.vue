<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiChildCard from '@/components/shared/UiChildCard.vue';
import ActView from './ActView.vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const cls = route.query.cls || '';
const page = ref({ title: 'Form Layouts' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Form Layouts',
        disabled: true,
        href: '#'
    }


]);
</script>

<template>
  <v-row>
        <v-col cols="12" class="mb-12">
            <UiParentCard title="영업 활동">
                <ActView :cls="cls" />
            </UiParentCard>
        </v-col>
  </v-row>           
</template>
