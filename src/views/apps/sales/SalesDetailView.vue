<script>
import axios from 'axios';
import SalesModal from './SalesModal.vue';

export default {
    components: { SalesModal },
    data() {
        return {
            sales: [],
            showModal: false,
            editedSale: {
                salesNo: null,
                salesCls: '',
                salesDate: '',
                taxCls: '',
                surtaxYn: '',
                productCount: 0,
                supplyPrice: 0,
                tax: 0,
                price: 0,
                expArrivalDate: '',
                busiType: '',
                busiTypeDetail: '',
                note: '',
                contractNo: '',
            },
            search: '',
        };
    },
    mounted() {
        this.fetchSales();
    },
    methods: {
        async fetchSales() {
            try {
                const response = await axios.get('http://localhost:8080/api/sales');
                this.sales = response.data.result;
            } catch (error) {
                console.error('매출 목록을 가져오는 데 실패했습니다:', error);
            }
        },
        async deleteSale(salesNo) {
            if (confirm('정말로 이 매출을 삭제하시겠습니까?')) {
                try {
                    await axios.delete(`http://localhost:8080/api/sales/${salesNo}`);
                    this.fetchSales();
                    alert('매출이 삭제되었습니다.');
                } catch (error) {
                    console.error('매출 삭제에 실패했습니다:', error);
                    alert('매출 삭제에 실패했습니다.');
                }
            }
        },
        editSale(sale) {
            this.editedSale = { ...sale };
            this.showModal = true;
        },
        openModal() {
            this.editedSale = {
                salesNo: null,
                salesCls: '',
                salesDate: '',
                taxCls: '',
                surtaxYn: '',
                productCount: 0,
                supplyPrice: 0,
                tax: 0,
                price: 0,
                expArrivalDate: '',
                busiType: '',
                busiTypeDetail: '',
                note: '',
                contractNo: '',
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async saveSale(sale) {
            try {
                if (sale.salesNo) {
                    await axios.patch(`http://localhost:8080/api/sales/${sale.salesNo}`, sale);
                } else {
                    await axios.post('http://localhost:8080/api/sales', sale);
                }
                this.fetchSales();
                this.closeModal();
            } catch (error) {
                console.error('매출 저장에 실패했습니다:', error);
            }
        },
        openSalesInfo(sale) {
            this.editedSale = { ...sale };
            this.showModal = true; 
        },
    },
};
</script>

<template>
    <div>
        <v-row>
            <v-col cols="12" class="text-right">
                <v-btn color="primary" @click="openModal" flat>
                    <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>매출 추가
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="(sale, index) in sales" :key="index" cols="12" md="6">
                <v-card @click="openSalesInfo(sale)" class="sales-card">
                    <v-card-title class="sales-title">{{ sale.salesCls }}</v-card-title>
                    <v-card-subtitle class="sales-subtitle">매출 번호: {{ sale.salesNo }}</v-card-subtitle>
                    <v-card-text class="sales-text">
                        <div>수량: <span class="highlight">{{ sale.productCount }}</span></div>
                        <div>합계 금액: <span class="highlight">{{ sale.price.toLocaleString() }} 원</span></div>
                        <div>사업 유형: <span class="highlight">{{ sale.busiType }}</span></div>
                        <div>계약 번호: <span class="highlight">{{ sale.contractNo }}</span></div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-if="sales.length === 0" cols="12">
                <v-alert type="info">데이터가 없습니다.</v-alert>
            </v-col>
        </v-row>

        <SalesModal
            v-model="showModal"
            :sale="editedSale"
            @save="saveSale"
            @close="closeModal"
        />
    </div>
</template>

<style scoped>
.sales-card {
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    background-color: #f9f9f9; 
    border: 1px solid #ddd; 
    border-radius: 8px; 
    padding: 16px; 
    max-width: 500px; 
    margin: 10px; 
}
.sales-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.sales-title {
    font-size: 1.5rem; 
    font-weight: bold; 
    color: #0008a3c8; 
}
.sales-subtitle {
    font-size: 1rem; 
    color: #747474; 
}
.sales-text {
    font-size: 0.9rem; 
    color: #333; 
}
.highlight {
    color: #747474; 
}
</style>
