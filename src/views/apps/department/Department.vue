<template>
    <v-card>
        <v-card-title class="custom-card-title">
            Department
        </v-card-title>

        <v-row class="pa-4" justify="space-between">
            <v-col cols="5">
                <v-treeview
                    v-model:activated="active"
                    v-model:opened="open"
                    :items="items"
                    color="warning"
                    density="compact"
                    item-title="name"
                    item-value="no"
                    activatable
                >
                    <template v-slot:prepend="{ item }">
                        <v-icon v-if="!item.children">
                            mdi-domain
                        </v-icon>
                    </template>
                </v-treeview>
            </v-col>

            <v-col>
                <v-scroll-y-transition>
                    <div>
                        <v-card>
                            <v-row class="text-right">
                                <v-col class="text-sm-left">
                                    <span class="font-weight-black custom-margin">정보</span>
                                </v-col>
                                <v-col>
                                    <v-btn color="primary" @click="clearForm">신규</v-btn>
                                    <v-btn color="primary">저장</v-btn>
                                    <v-btn color="primary">삭제</v-btn>
                                </v-col>
                            </v-row>

                            <v-card-text>
                                <v-col>
                                    <v-row class="align-center">
                                        <v-col cols="4">
                                            <span class="font-weight-black">상위 부서</span>
                                            <v-text-field dense :value="selected ? selected.parentDeptName : ''"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <span class="font-weight-black">부서 코드</span>
                                            <v-text-field dense :value="selected ? selected.deptCode : ''"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <span class="font-weight-black">부서명</span>
                                            <v-text-field dense :value="selected ? selected.name : ''"></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row class="align-center">
                                        <v-col cols="4">
                                            <span class="font-weight-black">영문 부서명</span>
                                            <v-text-field dense :value="selected ? selected.engName : ''"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <span class="font-weight-black">부서장</span>
                                            <v-text-field dense :value="selected ? selected.deptHead : ''"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-scroll-y-transition>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { VTreeview } from 'vuetify/labs/VTreeview';
import axios from 'axios';

export default {
    components: {
        VTreeview,
    },

    data: () => ({
        active: [],
        open: [],
        departments: [],
    }),

    computed: {
        items() {
            return [
                {
                    name: 'Departments',
                    children: this.departments,
                },
            ];
        },
        selected() {
            if (!this.active.length) return undefined;
            const id = this.active[0];
            
            const findDepartment = (departments) => {
                for (const department of departments) {
                    if (department.no === id) {
                        return department;
                    }
                    
                    if (department.children && department.children.length) {
                        const foundInChildren = findDepartment(department.children);
                        if (foundInChildren) {
                            return foundInChildren;
                        }
                    }
                }
                return undefined;
            };

            return findDepartment(this.departments);
        },
    },

    methods: {
        async fetchDepartments() {
            try {
                const response = await axios.get('http://localhost:8080/api/departments');
                const departments = response.data.result;

                if (departments) {
                    this.departments = departments.map(department => ({
                        no: department.no,
                        name: department.name,
                        children: department.children || [],
                        deptCode: department.deptCode,
                        engName: department.engName,
                        deptHead: department.deptHead,
                        parentDeptName: department.upperDeptName
                    }));
                }
            } catch (error) {
                console.error("부서 목록을 가져오는 중 오류 발생:", error);
            }
        },
    },

    mounted() {
        this.fetchDepartments();
    }
};
</script>

<style scoped>
.v-btn {
    margin-top: 0.55rem;
    margin-right: 0.2rem;
    margin-left: 0.2rem;
}
.custom-margin {
    margin-left: 10px;
}
.custom-card-title {
    background-color: rgb(220, 236, 250);
    color: #333;
    padding: 16px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.v-card{
    margin-top: 1rem;
}
</style>
