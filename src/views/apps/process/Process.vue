<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import api from '@/api/axiosinterceptor';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const headers1 = ref([
    { title: '서브 프로세스', align: 'start', key: 'subProcessName' },
    { title: '진행 단계', align: 'start', key: 'progressStep' },
    { title: '성공 확률(%)', align: 'start', key: 'successRate' },
    { title: '내용', align: 'start', key: 'description' },
    { title: '예상 소요 기간(일)', align: 'start', key: 'expectedDuration' },
    { title: '액션', align: 'start' },
]);

const headers2 = ref([
    { title: '프로세스', align: 'start', key: 'processName' },
    { title: '기본 프로세스', key: 'isDefault' },
    { title: '내용', key: 'description' },
    { title: '예상 소요기간', key: 'expectedDuration' },
    { title: '액션', align: 'start' },
]);

const dialog = ref(false);
const dialogDelete = ref(false);
const processes = ref([]);
const subProcesses = ref([]);
const editedItem = ref(null);
const dialogMode = ref('');
const selectedProcess = ref(null);
const formValid = ref(false);

watch(editedItem, validateForm, { deep: true });

// 상위 프로세스를 API로 가져오는 함수
async function fetchProcesses() {
    try {
        const response = await api.get('/admin/processes');
        processes.value = response.data.result;
    } catch (error) {
        console.error('Error fetching processes:', error.message || error);
    }
}

// 하위 프로세스를 API로 가져오는 함수
async function fetchSubProcesses(processName) {
    try {
        const response = await api.get(`/admin/subprocesses/${processName}`);
        subProcesses.value = response.data.result;
    } catch (error) {
        console.error('Error fetching sub processes:', error.message || error);
    }
}

// 행 클릭 시 하위 프로세스 로드 및 선택된 프로세스 저장
function selectRow(process) {
    if (process && process.processName) {
        selectedProcess.value = process;
        fetchSubProcesses(process.processName);
    }
}

// 상위 프로세스 추가 함수
function addParentProcess() {
    editedItem.value = {
        processName: '',
        isDefault: false,
        description: '',
        expectedDuration: '',
    };
    dialogMode.value = 'add-parent';
    dialog.value = true;
    validateForm();
}

// 하위 프로세스 추가 함수
function addSubProcess() {
    if (!selectedProcess.value) {
        alert('상위 프로세스를 선택한 후 하위 프로세스를 추가하세요.');
        return;
    }

    editedItem.value = {
        processNo: selectedProcess.value.processNo,
        subProcessName: '',
        progressStep: '',
        successRate: '',
        description: '',
        expectedDuration: '',
    };
    dialogMode.value = 'add-sub';
    dialog.value = true;
    validateForm();
}

// 상위 프로세스 저장 함수
async function saveParentProcess() {
    if (!formValid.value) return;
    try {
        if (dialogMode.value === 'add-parent') {
            const response = await api.post(`/admin/processes`, editedItem.value);
            console.log('Parent process Add successful:', response.data);
        }
        dialog.value = false;
        await fetchProcesses();
    } catch (error) {
        console.error('Error saving parent process:', error.message || error);
    }
}

// 하위 프로세스 저장 함수
async function saveSubProcess() {
    if (!formValid.value) return;

    try {
        if (selectedProcess.value && selectedProcess.value.processNo) {
            editedItem.value.processNo = selectedProcess.value.processNo;
            const response = await api.post(`/admin/subprocesses`, editedItem.value);
            console.log('Subprocess Add successful:', response.data);

            dialog.value = false;

            await fetchSubProcesses(selectedProcess.value.processName);
            fetchProcesses();
        } else {
            console.error('No parent process selected for adding sub process.');
            alert('상위 프로세스를 선택한 후 하위 프로세스를 추가하세요.');
        }
    } catch (error) {
        console.error('Error saving sub process:', error.message || error);
    }
}

// 항목 삭제
function deleteItem(item, type) {
    editedItem.value = { ...item };
    dialogMode.value = `delete-${type}`;
    dialogDelete.value = true;
}

// 폼 유효성 검사 함수
function validateForm() {
    if (dialogMode.value === 'add-parent') {
        formValid.value = !!editedItem.value.processName;
    } else if (dialogMode.value === 'add-sub') {
        formValid.value = !!(
            editedItem.value.subProcessName &&
            editedItem.value.progressStep &&
            editedItem.value.expectedDuration
        );
    }
}

// 항목 삭제 확정
async function confirmDelete() {
    try {
        dialogDelete.value = false;
        const apiUrl = dialogMode.value.includes('parent')
            ? `/admin/processes/${editedItem.value.processNo}`
            : `/admin/subprocesses/${editedItem.value.subProcessNo}`;
        const response = await api.delete(apiUrl);
        console.log('Delete successful:', response.data);

        editedItem.value = null;

        if (dialogMode.value.includes('sub')) {
            await fetchSubProcesses(selectedProcess.value.processName);
        } else {
            await fetchProcesses();
        }
    } catch (error) {
        console.error('Error deleting item:', error.message || error);
    }
}

// 초기 데이터 로드
onMounted(() => {
    fetchProcesses();
});
</script>

<template>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Sales Process">
                <v-data-table
                    class="border rounded-md"
                    :headers="headers2"
                    :items="processes"
                    item-value="processNo"
                >
                    <template v-slot:item="{ item }">
                        <tr @click="selectRow(item)">
                            <td>{{ item.processName }}</td>
                            <td>{{ item.isDefault }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.expectedDuration }}</td>
                            <td>
                                <v-icon color="info" size="small" class="me-2" @click.stop="editItem(item, 'parent')">
                                    mdi-pencil
                                </v-icon>
                                <v-icon color="error" size="small" @click.stop="deleteItem(item, 'parent')">
                                    mdi-delete
                                </v-icon>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:top>
                        <v-toolbar class="bg-lightsecondary" flat>
                            <v-toolbar-title>Process</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" variant="flat" dark @click="addParentProcess">Add New Parent Process</v-btn>
                        </v-toolbar>
                    </template>
                </v-data-table>

                <v-data-table
                    class="border rounded-md mt-6"
                    :headers="headers1"
                    :items="subProcesses"
                >
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.subProcessName }}</td>
                            <td>{{ item.progressStep }}</td>
                            <td>{{ item.successRate }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.expectedDuration }}</td>
                            <td>
                                <v-icon color="info" size="small" class="me-2" @click.stop="editItem(item, 'sub')">
                                    mdi-pencil
                                </v-icon>
                                <v-icon color="error" size="small" @click.stop="deleteItem(item, 'sub')">
                                    mdi-delete
                                </v-icon>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:top>
                        <v-toolbar class="bg-lightsecondary" flat>
                            <v-toolbar-title>Sub Process</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" variant="flat" dark @click="addSubProcess">Add New Sub Process</v-btn>
                        </v-toolbar>
                    </template>
                </v-data-table>
            </UiParentCard>
        </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">
                {{ dialogMode.includes('edit') ? 'Edit Item' : dialogMode === 'add-parent' ? 'Add Parent Process' : 'Add Sub Process' }}
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row v-if="dialogMode === 'add-parent'">
                        <v-col cols="12">
                            <v-text-field v-model="editedItem.processName" label="Process Name"
                                :rules="[v => !!v || '프로세스 명은 필수 입니다.']"
                                @input="validateForm"/>
                            <v-text-field v-model="editedItem.description" label="Description" />
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="12">
                            <v-text-field v-model="editedItem.subProcessName" label="Sub Process Name"
                                :rules="[v => !!v || '프로세스 명은 필수 입니다.']"
                                @input="validateForm"/>
                            <v-text-field v-model="editedItem.progressStep" label="Progress Step"
                                :rules="[v => !!v || '프로세스 단계는 필수 입니다.']"
                                @input="validateForm"/>
                            <v-text-field v-model="editedItem.successRate" label="Success Rate (%)" />
                            <v-text-field v-model="editedItem.description" label="Description" />
                            <v-text-field v-model="editedItem.expectedDuration" label="Expected Duration"
                                :rules="[v => !!v || '예상 소요기간은 필수 입니다.']"
                                @input="validateForm"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn v-if="dialogMode === 'add-parent'" color="primary" @click="saveParentProcess" :disabled="!formValid">Save Parent Process</v-btn>
                <v-btn v-else color="primary" @click="saveSubProcess" :disabled="!formValid">Save Sub Process</v-btn>
                <v-btn @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="400px">
        <v-card>
            <v-card-title class="text-h5">Delete Confirmation</v-card-title>
            <v-card-text>Are you sure you want to delete this item?</v-card-text>
            <v-card-actions>
                <v-btn color="error" @click="confirmDelete">Delete</v-btn>
                <v-btn @click="dialogDelete = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
