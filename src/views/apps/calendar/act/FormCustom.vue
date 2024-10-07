<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiChildCard from '@/components/shared/UiChildCard.vue';
import ActViewCopy from './ActView.vue'
// theme breadcrumb
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
            <UiParentCard title="영업 활동 등록">
                <ActViewCopy/>
            </UiParentCard>
        </v-col>
  </v-row>           
</template>
