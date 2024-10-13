
<script>
import axios from 'axios';
import ContractModal from './ContractModal.vue';

export default {
    components: { ContractModal },
    data() {
        return {
            contracts: [],
            headers: [
                { text: '계약 번호', value: 'contractNo' },
                { text: '계약 이름', value: 'name' },
                { text: '시작 날짜', value: 'startDate' },
                { text: '종료 날짜', value: 'endDate' },
                { text: '액션', value: 'action', sortable: false },
            ],
            showModal: false,
            editedContract: {
                contractNo: null,
                name: '',
                startDate: '',
                endDate: '',
                taxCls: '',
                surtaxYn: '',
                prodCnt: 0,
                supplyPrice: 0,
                tax: 0,
                price: 0,
                paymentTerms: '',
                warranty: 0,
                cls: '',
                expArrivalDate: '',
                arrivalNotiYn: '',
                arrivalNotiDay: 0,
                renewalNotiYn: '',
                renewalNotiDay: 0,
                note: '',
                estimateNo: '',
            },
            search: '',
        };
    },
    mounted() {
        this.fetchContracts();
    },
    methods: {
        async fetchContracts() {
            try {
                const response = await axios.get('http://localhost:8080/api/contract');
                this.contracts = response.data.result;
            } catch (error) {
                console.error('계약 목록을 가져오는 데 실패했습니다:', error);
            }
        },
        async deleteContract(contractNo) {
            if (confirm('정말로 이 계약을 삭제하시겠습니까?')) {
                try {
                    await axios.delete(`http://localhost:8080/api/contract/${contractNo}`);
                    this.fetchContracts();
                    alert('계약이 삭제되었습니다.');
                } catch (error) {
                    console.error('계약 삭제에 실패했습니다:', error);
                    alert('계약 삭제에 실패했습니다.');
                }
            }
        },
        editContract(contract) {
            this.editedContract = { ...contract };
            this.showModal = true;
        },
        openModal() {
            this.editedContract = {
                contractNo: null, 
                name: '',
                startDate: '',
                endDate: '',
                taxCls: '',
                surtaxYn: '',
                prodCnt: 0,
                supplyPrice: 0,
                tax: 0,
                price: 0,
                paymentTerms: '',
                warranty: 0,
                cls: '',
                expArrivalDate: '',
                arrivalNotiYn: '',
                arrivalNotiDay: 0,
                renewalNotiYn: '',
                renewalNotiDay: 0,
                note: '',
                estimateNo: '',
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async saveContract(contract) {
            try {
                if (contract.contractNo) {
                    await axios.patch(`http://localhost:8080/api/contract/${contract.contractNo}`, contract);
                } else {
                    await axios.post('http://localhost:8080/api/contract', contract);
                }
                this.fetchContracts(); 
                this.closeModal();
            } catch (error) {
                console.error('계약 저장에 실패했습니다:', error);
            }
        },
    },
};
</script>

<template>
    <div>
        <v-row>
            <v-col cols="12" lg="12" md="6" class="text-right">
                <v-btn color="primary" @click="openModal" flat class="ml-auto">
                    <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>계약 추가
                </v-btn>
            </v-col>
        </v-row>
        <v-data-table :headers="headers" :items="contracts" class="elevation-0">
            <template v-slot:header>
                <tr>
                    <th v-for="header in headers" :key="header.value">
                        {{ header.text }}
                    </th>
                </tr>
            </template>

            <template v-slot:item.action="{ item }">
                <v-btn @click="editContract(item)">수정</v-btn>
                <v-btn @click="deleteContract(item.contractNo)">삭제</v-btn>
            </template>

            <template v-slot:no-data>
                <v-alert type="info">데이터가 없습니다.</v-alert>
            </template>
        </v-data-table>

        <ContractModal
            v-model="showModal"
            :contract="editedContract"
            @save="saveContract"
            @close="closeModal"
        />
    </div>
</template>

