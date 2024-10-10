<script setup>
import { ref, onMounted } from 'vue';

const notice = ref([]);
function initialize() {
    notice.value = [
        {
            no: 1,
            title: '[샘플] 온라인 정기교육 공지',
            writer: '길동'
        },
        {
            no: 2,
            title: '[핑거세일즈] CRM 안내 가이드 반갑습니다! 첫 사용 전 필독해주세요.',
            writer: '시스템'
        }
    ];
}

onMounted(() => {
    initialize();
});
</script>
<template>
    <v-card class="border" elevation="0">
        <v-table class="month-table">
            <template v-slot:top>
                <v-toolbar class="bg-lightsecondary" flat>
                    <v-toolbar-title>영업공지</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <router-link :to="`/sales/notice`">
                        <v-btn color="primary" variant="flat" dark> + 더보기 </v-btn>
                    </router-link>
                </v-toolbar>
            </template>
            <thead>
                <tr>
                    <th class="text-h6">공지명</th>
                    <th class="text-h6">작성자</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in notice" :key="item.no" class="month-item">
                    <td>
                        <div class="d-flex align-left">
                            <h6 class="text-h6">{{ item.title }}</h6>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-right">
                            <h6 class="text-h6 font-weight-medium text-medium-emphasis">{{ item.writer }}</h6>
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>
