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
                            <v-btn variant="tonal" color="primary" @click.stop="deleteItem(selectedItem)">삭제</v-btn>
                        </v-col>
                    </v-row>

                    <hr class="divider"></hr>

                    <v-card-text>
                        <v-alert v-if="errorMessage" type="warning" class="mb-3">{{ errorMessage }}</v-alert>
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

<script>
import api from '@/api/axiosinterceptor';

export default {
    data() {
        return {
            productCode: '',
            productName: '',
            selectedItem: {
                prodNo: 0,
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
            errorMessage: '',
            dialogDelete: false,
        };
    },
    methods: {
        
        async fetchProducts() {
            try {
                console.log("조회");
                const response = await api.get('/products');
                console.log(response);
                this.items = response.data.result;
            } catch (error) {
                console.error('제품 정보를 가져오는 중 오류 발생:', error);
            }
        },

        async confirmDelete() {
            try {
                this.dialogDelete = false;
                // Delete API 호출
                const apiUrl = `/products/${this.selectedItem.prodNo}`;
                const response = await api.delete(apiUrl);
                console.log('Delete successful:', response.data);

                this.selectedItem = {};
                await this.fetchProducts();
            } catch (error) {
                console.error('Error deleting item:', error.message || error);
            }
        },


        selectItem(item) {
            this.selectedItem = { ...item }; 
            this.errorMessage = '';
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
            this.errorMessage = '';
        },

        async saveProduct() {
            try {
                if (!this.selectedItem.prodCode || !this.selectedItem.name) {
                    this.errorMessage = '제품 코드와 이름을 입력해주세요.';
                    return;
                }
                if (typeof this.selectedItem.quantity !== 'number' || this.selectedItem.quantity < 0) {
                    this.errorMessage = '포장 수량은 양수의 숫자여야 합니다.';
                    return;
                }

                await api.post('/products', this.selectedItem);
                alert('저장되었습니다.');
                this.fetchProducts();
                this.clearForm();
                this.errorMessage = '';
            } catch (error) {
                console.error('저장 중 오류 발생:', error);
                alert('저장 중 오류가 발생했습니다.');
            }
        },

        deleteItem(item) {
            if (item.prodNo) {
                this.selectedItem = item;
                this.dialogDelete = true;
            }
        },
    },


    mounted() {
        this.fetchProducts();
    },
};
</script>

<style scoped>
/* 스타일은 여기에 추가 */
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

.divider {
    border-color: rgb(0, 110, 255);
    margin-left: 15px;
    margin-right: 15px;
}

.v-text-field {
    margin-top: 0.5em;
}

.custom-card-header {
    background-color: rgb(0, 110, 255);
    color: white;
}
</style>
