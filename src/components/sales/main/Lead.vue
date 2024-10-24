<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/axiosinterceptor';

const leadData = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
    try {
        const response = await api.get('/leads');

        leadData.value = response.data.result;
    } catch (error) {
        error.value = '데이터를 가져오는 중 오류가 발생했습니다.';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <v-card class="border" elevation="0">
        <v-table class="month-table">
            <template v-slot:top>
                <v-toolbar class="bg-lightsecondary" flat>
                    <v-toolbar-title>영업기회</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <router-link :to="`/apps/calendar`">
                        <v-btn color="primary" variant="flat" dark> + 더보기 </v-btn>
                    </router-link>
                </v-toolbar>
            </template>
            <thead>
                <tr>
                    <th class="text-h6">이름</th>
                    <th class="text-h6">고객</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lead, leadNo) in leadData" :key="leadNo" class="month-item">
                    <td>
                        <div class="d-flex align-left">
                            <h6 class="text-h6">{{ lead.name }}</h6>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-right">
                            <h6 class="text-h6">{{ lead.customerName }}</h6>
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>
