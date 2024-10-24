<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

// 페이지 제목
const page = ref({ title: 'Process' });

// 테이블 헤더1 (하위 프로세스)
const headers1 = ref([
    { title: '세부 코드', align: 'start', key: 'code' },
    { title: '프로세스', align: 'start', key: 'name' },
    { title: '진행 단계', align: 'start', key: 'step' },
    { title: '성공 확률(%)', align: 'start', key: 'probability' },
    { title: '상세', align: 'start', key: 'description' },
    { title: '예상 소요 기간(일)', align: 'start', key: 'estimatedTime' },
]);

// 테이블 헤더2 (상위 프로세스)
const headers2 = ref([
    { title: '프로세스', align: 'start', key: 'name' },
    { title: '기본 프로세스', key: 'isDefault' },
    { title: '내용', key: 'description' },
    { title: '예상 소요기간', key: 'estimatedTime' }
]);

const dialog = ref(false);

// 상위 프로세스 데이터
const processes = ref([
    { id: 1, name: '영업기회1', isDefault: 'True', description: 'test 프로세스1', estimatedTime: 20 },
    { id: 2, name: '영업기회2', isDefault: 'False', description: 'test 프로세스2', estimatedTime: 25 },
]);

// 하위 프로세스 데이터
const subProcesses = ref([]);

// 선택된 상위 프로세스 ID에 따라 하위 프로세스를 가져오는 함수
function fetchSubProcesses(processId) {
    const response = [
        { processId: 1, code: '001', name: '기회 인지', step: '1단계', probability: 60, description: '세부 사항1', estimatedTime: 5 },
        { processId: 1, code: '002', name: '제품 소개', step: '2단계', probability: 80, description: '세부 사항2', estimatedTime: 3 },
        { processId: 2, code: '003', name: '계약 협상', step: '3단계', probability: 90, description: '세부 사항3', estimatedTime: 7 },
    ];

    subProcesses.value = response.filter(subProcess => subProcess.processId == processId);

    console.log('Selected SubProcesses:', subProcesses.value);
}

function selectRow(process) {
    console.log('Selected Process:', process);
    if (process && process.id) {
        fetchSubProcesses(process.id);
    } else {
        console.error('Invalid process object:', process);
    }
}
</script>

<template>
    <BaseBreadcrumb :title="page.title" />

    <v-row>
        <v-col cols="12">
            <UiParentCard title="Sales Process">
                <v-data-table
                    class="border rounded-md"
                    :headers="headers2"
                    :items="processes"
                    item-value="id"
                >
                    <template v-slot:item="{ item }">
                        <tr @click="selectRow(item)">
                            <td>{{ item.name }}</td>
                            <td>{{ item.isDefault }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.estimatedTime }}</td>
                        </tr>
                    </template>
                    <template v-slot:top>
                        <v-toolbar class="bg-lightsecondary" flat>
                            <v-toolbar-title>Process</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  variant="flat" dark>신규</v-btn>
                            <v-btn color="primary"  variant="flat" dark>삭제</v-btn>
                            <v-btn color="primary"  variant="flat" dark>저장</v-btn>
                        </v-toolbar>
                    </template>
                </v-data-table>

                <!-- Sub Process Table -->
                <v-data-table 
                    class="border rounded-md mt-6" 
                    :headers="headers1" 
                    :items="subProcesses"
                    :key="subProcesses"
                >
                    <template v-slot:top>
                        <v-toolbar class="bg-lightsecondary" flat>
                            <v-toolbar-title>Sub Process</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  variant="flat" dark>신규</v-btn>
                            <v-btn color="primary"  variant="flat" dark>삭제</v-btn>
                            <v-btn color="primary"  variant="flat" dark>저장</v-btn>
                        </v-toolbar>
                    </template>
                </v-data-table>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

<style>
.v-btn{
    margin-left: 1rem;
}
</style>