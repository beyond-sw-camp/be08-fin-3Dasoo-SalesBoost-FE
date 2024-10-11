<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const actData = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/acts');

        actData.value = response.data.result;
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
                    <v-toolbar-title>일정 정보</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <router-link :to="`/apps/calendar`">
                        <v-btn color="primary" variant="flat" dark> + 더보기 </v-btn>
                    </router-link>
                </v-toolbar>
            </template>
            <thead>
                <tr>
                    <th class="text-h6">시간</th>
                    <th class="text-h6">활동내용</th>
                    <th class="text-h6">목적</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(act, actNo) in actData" :key="actNo" class="month-item">
                    <td>
                        <div class="d-flex align-center">
                            <h6 class="text-h6">{{ act.startTime }} ~ {{ act.endTime }}</h6>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-center">
                            <h6 class="text-h6">{{ act.planContent }} / 고객명</h6>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-right">
                            <h6 class="text-h6 font-weight-medium text-medium-emphasis">{{ act.purpose }}</h6>
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>
