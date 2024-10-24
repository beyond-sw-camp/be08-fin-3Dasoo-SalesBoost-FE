<script setup>
import { computed, ref, onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/axiosinterceptor';

const route = useRoute();
const router = useRouter();

const isMounted = ref(false);

const cardTitle = computed(() => {
    if (route.path === '/sales/lead/new') {
        return '영업기회 등록';
    }
    return '영업기회 상세 정보';
});

const saveBtn = computed(() => {
    if (route.path === '/sales/lead/new') {
        return '저장';
    }
    return '수정';
});

const statuses = ref([
    { text: '선택', value: null },
    { text: '진행중', value: 'PROGRESS' },
    { text: '종료(실패)', value: 'FAIL' },
    { text: '종료(성공)', value: 'SUCCESS' },
    { text: '보류', value: 'HOLD' }
]);

const awarePathes = ref([
    { text: '선택', value: null },
    { text: '데모시연', value: 'DEMO' },
    { text: '교육', value: 'EDUCATION' },
    { text: '기존고객', value: 'EXISTING' },
    { text: '인터넷신문', value: 'NEWSPAPER' },
    { text: '파트너사', value: 'PARTNER' },
    { text: '인터넷검색', value: 'SEARCH' },
    { text: '기타', value: 'ETC' }
]);

const mapping = ref(false);
const leadResponseDto = reactive({
    leadNo: '',
    name: '',
    status: null,
    expSales: 0,
    expMargin: 0,
    expProfit: 0,
    process: 0,
    subProcess: 0,
    progressStep: '',
    successPer: 0,
    startDate: '',
    endDate: '',
    awarePath: null,
    note: '',
    customerNo: '',
    customerName: '',
    addr: '',
    userName: '',
    steps: []
});

const expSalesDisplay = ref('0');
const expProfitDisplay = ref('0');
const expMarginDisplay = ref('0');

const formatNumber = (value) => {
    return new Intl.NumberFormat().format(value);
};

const filterNumericInput = (value) => {
    return value.replace(/[^\d]/g, '');
};

const state = reactive({
    processes: [],
    subProcesses: []
});

const today = new Date().toISOString().substring(0, 10);
leadResponseDto.startDate = today;
leadResponseDto.endDate = today;

const fetchLeadDetails = async (leadNo) => {
    try {
        const response = await api.get(`/leads/${leadNo}`);
        const result = response.data.result;

        leadResponseDto.leadNo = result.leadNo;
        leadResponseDto.name = result.name;
        leadResponseDto.status = result.status;
        leadResponseDto.expSales = result.expSales;
        leadResponseDto.expMargin = result.expMargin;
        leadResponseDto.expProfit = result.expProfit;
        leadResponseDto.process = result.process;
        leadResponseDto.subProcess = result.subProcess;
        leadResponseDto.successPer = result.successPer;
        leadResponseDto.startDate = result.startDate;
        leadResponseDto.endDate = result.endDate;
        leadResponseDto.awarePath = result.awarePath;
        leadResponseDto.note = result.note;
        leadResponseDto.customerNo = result.customerNo;
        leadResponseDto.customerName = result.customerName;
        // leadResponseDto.addr = result.addr;
        leadResponseDto.userName = result.userName;
        leadResponseDto.steps = result.steps;

        console.log(leadResponseDto);
        fetchSubProcesses(leadResponseDto.process);

        mapping.value = true;
    } catch (error) {
        console.error('lead 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
};

const fetchProcesses = async () => {
    try {
        const response = await api.get(`/processes`);
        state.processes = response.data.result;

        const leadNo = route.params.no;
        if (leadNo != null && leadNo != '' && leadNo != 'undefined') {
            fetchLeadDetails(leadNo);
        } else {
            isMounted.value = true;
            leadResponseDto.process = state.processes[0].processNo;
        }
    } catch (error) {
        console.error('process 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
};

const getProcessNameByNo = (processNo) => {
    const process = state.processes.find((p) => p.processNo === processNo);
    return process ? process.processName : '';
};

const fetchSubProcesses = async (processNo) => {
    try {
        const processName = getProcessNameByNo(processNo);
        const response = await api.get(`/subprocesses/${processName}`);

        state.subProcesses = response.data.result;

        if (!isMounted.value) {
            leadResponseDto.progressStep = state.subProcesses.find((s) => s.subProcessNo === leadResponseDto.subProcess).progressStep;
        } else {
            leadResponseDto.subProcess = state.subProcesses[0].subProcessNo;
        }

        isMounted.value = true;
    } catch (error) {
        console.error('subProcess 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
};

const requiredRule = (value) => !!value || '필수 입력 항목입니다.';

const leadFormValid = ref(false);
const alertDialog = ref(false);
const successAlert = ref(false);
const errorAlert = ref(false);
const warningAlert = ref(false);

const submitForm = async () => {
    if (leadFormValid.value) {
        try {
            let response;

            if (!leadResponseDto.leadNo) {
                response = await api.post('/leads', {
                    name: leadResponseDto.name,
                    status: leadResponseDto.status,
                    expSales: leadResponseDto.expSales,
                    expMargin: leadResponseDto.expMargin,
                    expProfit: leadResponseDto.expProfit,
                    process: leadResponseDto.process,
                    subProcess: leadResponseDto.subProcess,
                    successPer: leadResponseDto.successPer,
                    startDate: leadResponseDto.startDate,
                    endDate: leadResponseDto.endDate,
                    awarePath: leadResponseDto.awarePath,
                    note: leadResponseDto.note,
                    // customerNo: leadResponseDto.customerNo,
                    custNo: 6
                    // addr: leadResponseDto.addr,
                });
                console.log('POST response:', response.data);
            } else {
                response = await api.patch(`/leads/${leadResponseDto.leadNo}`, {
                    name: leadResponseDto.name,
                    status: leadResponseDto.status,
                    expSales: leadResponseDto.expSales,
                    expMargin: leadResponseDto.expMargin,
                    expProfit: leadResponseDto.expProfit,
                    process: leadResponseDto.process,
                    subProcess: leadResponseDto.subProcess,
                    successPer: leadResponseDto.successPer,
                    startDate: leadResponseDto.startDate,
                    endDate: leadResponseDto.endDate,
                    awarePath: leadResponseDto.awarePath,
                    note: leadResponseDto.note,
                    custNo: leadResponseDto.customerNo
                    // addr: leadResponseDto.addr,
                });
                console.log('PATCH response:', response.data);
            }

            if (response.data.isSuccess) {
                successAlert.value = true;
                alertDialog.value = true;

                if (leadResponseDto.leadNo == null || leadResponseDto.leadNo == '') {
                    leadResponseDto.leadNo = response.data.result.leadNo;
                }
            } else {
                console.error('데이터 전송 중 오류가 발생했습니다:', error);
                errorAlert.value = true;
                alertDialog.value = true;
            }
        } catch (error) {
            console.error('데이터 전송 중 오류가 발생했습니다:', error);
            errorAlert.value = true;
            alertDialog.value = true;
        }
    } else {
        console.log('입력 값이 정상적이지 않습니다.');
        warningAlert.value = true;
        alertDialog.value = true;
    }
};

const deleteDialog = ref(false);

const deleteLead = async () => {
    const leadNo = leadResponseDto.leadNo;
    deleteDialog.value = false;
    if (leadNo) {
        try {
            await api.delete(`/leads/${leadNo}`);
            console.log(`리드 ${leadNo}가 성공적으로 삭제되었습니다.`);

            router.push('/sales/lead');
        } catch (error) {
            console.error('삭제 중 오류가 발생했습니다:', error);
        }
    } else {
        console.warn('리드 번호가 없습니다. 삭제할 수 없습니다.');
    }
};

const updateExpSales = (e) => {
    const rawValue = filterNumericInput(e.target.value);
    leadResponseDto.expSales = parseInt(rawValue) || 0;
    expSalesDisplay.value = formatNumber(leadResponseDto.expSales);
};

const updateExpProfit = (e) => {
    const rawValue = filterNumericInput(e.target.value);
    leadResponseDto.expProfit = parseInt(rawValue) || 0;
    expProfitDisplay.value = formatNumber(leadResponseDto.expProfit);
};

const updateExpMargin = (e) => {
    const rawValue = filterNumericInput(e.target.value);
    leadResponseDto.expMargin = parseInt(rawValue) || 0;
    expMarginDisplay.value = formatNumber(leadResponseDto.expMargin);
};

const getStepColor = (step) => {
    if (step.completeYn == 'Y') {
        switch (step.level) {
            case 0:
                return 'error';
            case 1:
                return 'warning';
            case 2:
                return 'success';
            case 3:
                return 'secondary';
            case 4:
                return 'primary';
        }
    }
    return 'grey lighten-2';
};

const checkMaxSuccessPer = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 100) {
        leadResponseDto.successPer = 100;
    } else if (value < 0) {
        leadResponseDto.successPer = 0;
    } else {
        leadResponseDto.successPer = value || 0;
    }
};

watch(
    () => leadResponseDto.subProcess,
    (newSubProcess) => {
        if (isMounted.value) {
            const selectedSubProcess = state.subProcesses.find((s) => s.subProcessNo === newSubProcess);

            if (selectedSubProcess) {
                leadResponseDto.progressStep = selectedSubProcess.progressStep;
                leadResponseDto.successPer = selectedSubProcess.successRate;
            }
        }
    }
);

watch(
    () => leadResponseDto.process,
    (newProcess) => {
        if (isMounted.value) {
            if (newProcess) {
                fetchSubProcesses(newProcess);
            }
        }
    }
);

watch(
    () => leadResponseDto.expSales,
    (newVal) => {
        if (isMounted.value) {
            leadResponseDto.expProfit = (newVal * leadResponseDto.expMargin) / 100;
        }
        expSalesDisplay.value = formatNumber(newVal);
    }
);

watch(
    () => leadResponseDto.expMargin,
    (newVal) => {
        if (isMounted.value) {
            leadResponseDto.expProfit = (newVal * leadResponseDto.expSales) / 100;
        }
        expMarginDisplay.value = formatNumber(newVal);
    }
);

watch(
    () => leadResponseDto.expProfit,
    (newVal) => {
        expProfitDisplay.value = formatNumber(newVal);
    }
);

watch(
    () => alertDialog.value,
    (newVal) => {
        if (!newVal) {
            if (successAlert.value) {
                successAlert.value = false;
                if (route.path == `/sales/lead/detail/${leadResponseDto.leadNo}`) {
                    return router.go(0);
                }
                router.push(`/sales/lead/detail/${leadResponseDto.leadNo}`);
            }

            if (errorAlert.value) {
                errorAlert.value = false;
            }

            if (warningAlert) {
                warningAlert.value = false;
            }
        }
    }
);

onMounted(() => {
    fetchProcesses();
});
</script>

<template>
    <v-card elevation="10">
        <v-dialog v-model="alertDialog" max-width="500" class="dialog-mw">
            <v-card>
                <v-card-text>
                    <v-alert v-if="successAlert" type="success" variant="tonal" class="mb-4">
                        <h5 class="text-h6 text-capitalize">Success</h5>
                        <div>저장됐습니다.</div>
                    </v-alert>
                    <v-alert v-if="errorAlert" type="error" variant="tonal" class="mb-4">
                        <h5 class="text-h6 text-capitalize">Success</h5>
                        <div>저장에 실패했습니다.</div>
                    </v-alert>
                    <v-alert v-if="warningAlert" type="warning" variant="tonal" class="mb-4">
                        <h5 class="text-h6 text-capitalize">Success</h5>
                        <div>필수값이 입력되지 않았습니다.</div>
                    </v-alert>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="alertDialog = false" flat>Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteDialog" max-width="500" class="dialog-mw">
            <v-card>
                <v-card-title class="headline">경고</v-card-title>
                <v-card-text> 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다. </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" tonal @click="deleteLead">삭제</v-btn>
                    <v-btn color="error" tonal @click="deleteDialog = false">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card-item class="py-4 px-6">
            <div class="d-sm-flex align-center justify-space-between">
                <v-card-title class="text-h5">{{ cardTitle }}</v-card-title>
            </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
            <v-form v-model="leadFormValid">
                <v-row>
                    <v-col cols="12" lg="12">
                        <v-row>
                            <v-col v-if="leadResponseDto.steps && leadResponseDto.steps.length > 0" cols="12">
                                <v-row>
                                    <v-col v-for="step in leadResponseDto.steps" :key="step.stepNo" cols="auto">
                                        <v-chip :color="getStepColor(step)" class="white--text">
                                            {{ step.subProcessName }}
                                            <span v-if="step.completeYn == 'Y'"> {{ step.completeDate }}</span>
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12">
                                <v-label class="mb-2 font-weight-medium">영업기회명<span class="require">*</span></v-label>
                                <v-text-field
                                    v-model="leadResponseDto.name"
                                    variant="outlined"
                                    color="primary"
                                    :rules="[requiredRule]"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">고객<span class="require">*</span></v-label>
                                <v-text-field
                                    v-model="leadResponseDto.customerName"
                                    :rules="[requiredRule]"
                                    variant="outlined"
                                    color="primary"
                                ></v-text-field>
                                <v-label class="mb-2 font-weight-medium">예상매출</v-label>
                                <v-text-field
                                    v-model="expSalesDisplay"
                                    variant="outlined"
                                    color="primary"
                                    @input="updateExpSales"
                                ></v-text-field>
                                <v-label class="mb-2 font-weight-medium">예상이익금액</v-label>
                                <v-text-field
                                    v-model="expProfitDisplay"
                                    variant="outlined"
                                    color="primary"
                                    @input="updateExpProfit"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">진행상태<span class="require">*</span></v-label>
                                <v-select
                                    v-model="leadResponseDto.status"
                                    :items="statuses"
                                    item-props="true"
                                    item-title="text"
                                    item-value="value"
                                    :rules="[requiredRule]"
                                    variant="outlined"
                                ></v-select>
                                <v-label class="mb-2 font-weight-medium">예상이익률</v-label>
                                <v-text-field
                                    v-model="expMarginDisplay"
                                    variant="outlined"
                                    color="primary"
                                    maxlength="3"
                                    @input="updateExpMargin"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-label class="mb-2 font-weight-medium">프로세스<span class="require">*</span></v-label>
                                <v-select
                                    v-model="leadResponseDto.process"
                                    :items="state.processes"
                                    item-props="true"
                                    item-title="processName"
                                    item-value="processNo"
                                    :rules="[requiredRule]"
                                    variant="outlined"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-label class="mb-2 font-weight-medium">단계<span class="require">*</span></v-label>
                                <v-select
                                    v-model="leadResponseDto.subProcess"
                                    :items="state.subProcesses"
                                    item-props="true"
                                    item-title="subProcessName"
                                    item-value="subProcessNo"
                                    :rules="[requiredRule]"
                                    variant="outlined"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-label class="mb-2 font-weight-medium">카테고리</v-label>
                                <v-text-field v-model="leadResponseDto.progressStep" variant="outlined" color="primary"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-label class="mb-2 font-weight-medium">성공확률</v-label>
                                <v-text-field
                                    v-model="leadResponseDto.successPer"
                                    variant="outlined"
                                    @input="checkMaxSuccessPer"
                                    color="primary"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-label class="mb-2 font-weight-medium">영업시작일</v-label>
                        <v-text-field v-model="leadResponseDto.startDate" color="primary" variant="outlined" type="date"></v-text-field>
                        <v-label class="mb-2 font-weight-medium">인지경로</v-label>
                        <v-select
                            v-model="leadResponseDto.awarePath"
                            :items="awarePathes"
                            item-props="true"
                            item-title="text"
                            item-value="value"
                            variant="outlined"
                        ></v-select>
                        <v-label class="mb-2 font-weight-medium">주소</v-label>
                        <v-text-field v-model="leadResponseDto.addr" variant="outlined" color="primary"></v-text-field>
                        <v-text-field variant="outlined" color="primary" placeholder="상세 주소"></v-text-field>
                        <v-btn color="primary" class="mr-3" flat @click="submitForm">{{ saveBtn }}</v-btn>
                        <v-btn v-if="saveBtn == '수정'" color="error" class="mr-3" flat @click="deleteDialog = true">삭제</v-btn>
                        <v-btn color="success" class="mr-3" flat to="/sales/lead">목록</v-btn>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-label class="mb-2 font-weight-medium">영업종료일</v-label>
                        <v-text-field v-model="leadResponseDto.endDate" color="primary" variant="outlined" type="date"></v-text-field>
                        <v-label class="mb-2 font-weight-medium">담당자</v-label>
                        <v-text-field v-model="leadResponseDto.userName" variant="outlined" color="primary"></v-text-field>
                        <v-label class="font-weight-medium mb-2">비고</v-label>
                        <v-textarea
                            v-model="leadResponseDto.note"
                            auto-grow
                            rows="3"
                            color="primary"
                            row-height="25"
                            shaped
                            hide-details
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<style>
.hidden-field {
    visibility: hidden;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.require {
    color: red;
}
</style>
