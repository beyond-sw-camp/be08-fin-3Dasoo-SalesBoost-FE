<template>
    <v-container fluid>
        <v-row>
            <!-- Left Sidebar (Search Options) -->
            <v-col cols="12" md="3">
                <v-card outlined>
                    <v-card-title>검색조건</v-card-title>
                    <v-card-text>
                        <!-- Search Filter -->
                        <v-select label="전체" :items="['전체', '키맨', '현존']" v-model="filters.type"></v-select>

                        <!-- Search Keyword -->
                        <v-text-field label="검색어" v-model="filters.keyword"></v-text-field>

                        <!-- Select 키맨 and 현존 -->
                        <v-select label="키맨" :items="['키맨(전체)', '기본형', '맞춤형']" v-model="filters.keyman"></v-select>
                        <v-select label="현존" :items="['현존(전체)', 'Yes', 'No']" v-model="filters.status"></v-select>

                        <!-- Search Button -->
                        <v-btn color="primary" block @click="search">검색</v-btn>
                    </v-card-text>

                    <!-- Filter and Upload Options -->
                    <v-divider></v-divider>
                    <v-card-title>필터/정렬</v-card-title>
                    <v-card-text>
                        <v-checkbox v-model="filters.assignedOnly" label="담당없음"></v-checkbox>
                        <v-select label="필터" :items="['필터 옵션 1', '필터 옵션 2']"></v-select>
                        <v-select label="등록일" :items="['등록일 옵션 1', '등록일 옵션 2']"></v-select>
                        <v-btn text icon>
                            <v-icon>mdi-arrow-up-down</v-icon>
                        </v-btn>
                    </v-card-text>

                    <v-divider></v-divider>
                    <!-- Upload Options -->
                    <v-card-title>업로드</v-card-title>
                    <v-card-text>
                        <v-btn outlined color="green" block>Excel</v-btn>
                        <v-btn outlined block>Remember</v-btn>
                        <v-btn outlined block>Google</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Right Panel (Search Results) -->
            <v-col cols="12" md="9">
                <v-card outlined>
                    <v-card-title>검색결과: 2 건</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="6" v-for="(result, index) in results" :key="index">
                                <v-card outlined>
                                    <v-card-title class="d-flex align-center">
                                        <v-avatar>
                                            <v-img :src="result.image"></v-img>
                                        </v-avatar>
                                        <div class="ml-4">
                                            <span
                                                >{{ result.name }} <br />
                                                ({{ result.department }} / {{ result.position }})</span
                                            >
                                        </div>
                                    </v-card-title>
                                    <v-card-subtitle>{{ result.company }} - {{ result.project }}</v-card-subtitle>
                                    <v-card-text>
                                        <v-chip color="success" label>{{ result.status }}</v-chip>
                                        <p>{{ result.email }} | {{ result.phone }}</p>
                                    </v-card-text>
                                    <v-card-actions>
                                        <span>{{ result.date }}</span>
                                        <v-btn icon color="primary"> <v-icon>mdi-briefcase</v-icon>{{ result.cases }}건 </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            filters: {
                type: '전체',
                keyword: '',
                keyman: '',
                status: '',
                assignedOnly: false
            },
            results: [
                {
                    name: '홍길동',
                    department: '영업관리팀',
                    position: '',
                    company: '[샘플] 핑거포스트',
                    project: '프로젝트 명',
                    status: '현존',
                    email: 'jangdo95@gmail.com',
                    phone: '01012345678',
                    date: '2024.10.10',
                    cases: 1,
                    image: 'https://via.placeholder.com/50'
                },
                {
                    name: '이나연',
                    department: '영업부',
                    position: '과장',
                    company: '[샘플] 핑거포스트',
                    project: '프로젝트 명',
                    status: '현존',
                    email: 'nylee@crm.co.kr',
                    phone: '010-1234-5678 | 070-4066-5904',
                    date: '2024.09.05',
                    cases: 2,
                    image: 'https://via.placeholder.com/50'
                }
            ]
        };
    },
    methods: {
        search() {
            // Search logic
            console.log('Search clicked with filters:', this.filters);
        }
    }
};
</script>

<style scoped>
.ml-4 {
    margin-left: 1rem;
}
</style>
