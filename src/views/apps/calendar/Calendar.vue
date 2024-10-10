<script setup lang="ts">
import { ref } from 'vue';
import { useDate } from 'vuetify'
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import FullCalendar from './FullCalender.vue';
import CalendarFilters from './CalendarFilters.vue';
const date = ref(new Date());
const seldate = ref(new Date('2018-03-02'))
const adapter = useDate()

function allowedDates(val: unknown) {
    return parseInt(adapter.toISO(val).split('-')[2], 10) % 2 === 0
}




const page = ref({ title: 'Calendar' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Calendar',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
	<v-row>
			<v-col class="d-flex">
        <v-col cols="3" class="d-flex justify-start">
							<CalendarFilters />
					</v-col>
					<v-col cols="11">
							<UiParentCard title="SalesBoost Calendar">
									<FullCalendar />
							</UiParentCard>
					</v-col>
			</v-col>
	</v-row>
</template>
