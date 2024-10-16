<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-sheet class="pa-4 pt-1">
                    <v-text-field 
                        v-model="productCode" 
                        placeholder="제품 코드"
                        append-inner-icon="mdi-magnify"
                        solo
                    ></v-text-field>

                    <v-text-field 
                        v-model="productName" 
                        placeholder="제품명"
                        append-inner-icon="mdi-magnify"
                        solo
                    ></v-text-field>

                    <div class="list-container">
                        <v-list dense shaped>
                            <v-list-item  
                                v-for="(item, index) in items" 
                                :key="index"
                                @click="selectItem(item)"
                            > 
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.name }} ({{ item.prodCode }})</v-list-item-title>
                                </v-list-item-content>
                                <v-divider></v-divider>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-sheet>
            </v-col>

            <v-col cols="12" sm="6" md="9">
                <v-card>
                    <v-card-title class="custom-card-header">
                        <span class="headline">Details</span>
                    </v-card-title>

                    <v-row class="text-right">
                        <v-col>
                            <v-btn variant="tonal" color="primary" @click="clearForm">신규</v-btn>
                            <v-btn variant="tonal" color="primary" @click="saveProduct">저장</v-btn>
                        </v-col>
                    </v-row>

                    <hr  class="divider"></hr>

                    <v-card-text>
                        <v-row>
                            <v-col cols="4">
                                <span class="font-weight-black">제품 코드</span>
                                <v-text-field v-model="selectedItem.prodCode" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">제품명</span>
                                <v-text-field v-model="selectedItem.name" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">영문 제품명</span>
                                <v-text-field v-model="selectedItem.engName" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">제품 약명</span>
                                <v-text-field v-model="selectedItem.abbrName" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">출시일</span>
                                <v-text-field v-model="selectedItem.releaseDate" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">포장 수량</span>
                                <v-text-field v-model="selectedItem.quantity" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">포장 단위</span>
                                <v-text-field v-model="selectedItem.unit" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">규격</span>
                                <v-text-field v-model="selectedItem.field" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">원가</span>
                                <v-text-field v-model="selectedItem.supplyPrice" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">세율</span>
                                <v-text-field v-model="selectedItem.taxRate" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">가격</span>
                                <v-text-field v-model="selectedItem.price" dense></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <span class="font-weight-black">부서</span>
                                <v-text-field v-model="selectedItem.dept" dense></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            productCode: '',
            productName: '',
            selectedItem: {
                prodCode: '',
                name: '',
                engName: '',
                abbrName: '',
                releaseDate: '',
                dept: '',
                quantity: 0,
                unit: '',
                field: '',
                supplyPrice: 0,
                taxRate: 0,
                price: 0
            },
            items: [],
        };
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                this.items = response.data.result;
            } catch (error) {
                console.error('제품 정보를 가져오는 중 오류 발생:', error);
            }
        },

        selectItem(item) {
            this.selectedItem = { ...item }; 
        },

        clearForm() {
            this.selectedItem = {
                prodCode: '',
                name: '',
                engName: '',
                abbrName: '',
                releaseDate: '',
                dept: '',
                quantity: 0,
                unit: '',
                field: '',
                supplyPrice: 0,
                taxRate: 0,
                price: 0
            };
        },

        async saveProduct() {
            try {
                if (!this.selectedItem.prodCode || !this.selectedItem.name) {
                    alert('제품 코드와 이름을 입력해주세요.');
                    return;
                }

                await axios.post('http://localhost:8080/api/products', this.selectedItem);
                alert('저장되었습니다.');
                this.fetchProducts();
                this.clearForm();
            } catch (error) {
                console.error('저장 중 오류 발생:', error);
                alert('저장 중 오류가 발생했습니다.');
            }
        },

    },
    mounted() {
        this.fetchProducts();
    },
};
</script>

<style scoped>
.list-container {
    max-height: 300px;
    overflow-y: auto;
    margin-top: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.v-btn {
    margin-top: 0.55rem;
    margin-right: 1rem;
    margin-left: 0.2rem;
    margin-bottom: 0.5rem;
}

.divider{
    border-color:rgb(0, 110, 255);
    margin-left:15px;
    margin-right: 15px;
}

.v-text-field{
    margin-top: 0.5em;
}

.custom-card-header {
    background-color: rgb(220, 236, 250);
    color: rgb(0, 110, 255);
    padding: 16px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

</style>
