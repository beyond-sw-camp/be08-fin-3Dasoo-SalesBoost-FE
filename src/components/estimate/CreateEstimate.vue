  <template>
    <div>
      <BaseBreadcrumb :title="'견적 등록'" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

      <v-container>
        <UiParentCard title="새로운 견적 등록">
          <v-form ref="form" v-model="valid" @submit.prevent="save">
            <v-row>
              <!-- 견적명 (Estimate Name) -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.name"
                  label="견적명"
                  :rules="[v => !!v || '견적명을 입력해주세요']"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <!-- 견적일 (Estimate Date) -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.estDate"
                  label="견적일"
                  type="date"
                  :rules="[v => !!v || '견적일을 선택해주세요']"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <!-- 제안 (Proposal) -->
                <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.propName"
                  :items="proposals" 
                  item-text="name" 
                  :rules="[v => !!v || '제안선택 버튼을 눌러 제안서를 선택해주세요']"
                  readonly
                  outlined
                ></v-text-field>
                
                <v-btn color="primary" @click="openProposalModal" >제안 선택</v-btn>
              </v-col>

              <v-dialog v-model="proposalModal" max-width="600px">
                <v-card>
                  <v-card-title class="d-flex justify-space-between">
                    <span>제안 리스트</span>
                    <v-btn icon @click="closeProposalModal">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item-group color="primary">
                        <v-list-item
                          v-for="proposal in proposals"
                          :key="proposal.propNo"
                          @click="selectProposal(proposal)"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{ proposal.name }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-dialog>

                            <!-- 견적일 (Estimate Date) -->
                            <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.estDate"
                  label="견적일"
                  type="date"
                  :rules="[v => !!v || '견적일을 선택해주세요']"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <!-- 제품 (Product) -->
                <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.prodCode"
                  :items="products" 
                  item-text="name" 
                  :rules="[v => !!v || '제품선택 버튼을 눌러 제품을 선택해주세요']"
                  readonly
                  outlined
                ></v-text-field>
                
                <v-btn color="primary" @click="openProductModal" >제품 선택</v-btn>
              </v-col>

              <v-dialog v-model="productModal" max-width="600px">
                <v-card>
                  <v-card-title class="d-flex justify-space-between">
                    <span>제품 리스트</span>
                    <v-btn icon @click="closeProductModal">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item-group color="primary">
                        <v-list-item
                          v-for="product in products"
                          :key="product.prodCode"
                          @click="selectProduct(product)"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{ product.name }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <!-- 과세구분 (Tax Classification) -->
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.taxCls"
                  :items="taxClasses"
                  label="과세구분"
                  :rules="[v => !!v || '과세구분을 선택해주세요']"
                  required
                  outlined
                ></v-select>
              </v-col>

              <!-- 단가구분 (Price Classification) -->
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.surtaxYn"
                  :items="surtaxOptions"
                  label="단가구분"
                  :rules="[v => !!v || '단가구분을 선택해주세요']"
                  required
                  outlined
                ></v-select>
              </v-col>

              <!-- 수량 (Quantity) -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="editedItem.prodCnt"
                  label="수량"
                  type="number"
                  min="0"
                  :rules="[
                    v => v >= 0 || '수량은 0 이상이어야 합니다',
                    v => (v !== null && v !== undefined && v !== '') || '수량을 입력해주세요',
                  ]"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <!-- 공급가액 (Supply Price) -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="editedItem.supplyPrice"
                  label="공급가액"
                  type="number"
                  min="0"
                  :rules="[
                    v => v >= 0 || '공급가액은 0 이상이어야 합니다',
                    v => (v !== null && v !== undefined && v !== '') || '공급가액을 입력해주세요',
                  ]"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <!-- 세액 (Tax) -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="editedItem.tax"
                  label="세액"
                  type="number"
                  min="0"
                  :rules="[
                    v => v >= 0 || '세액은 0 이상이어야 합니다',
                    v => (v !== null && v !== undefined && v !== '') || '세액을 입력해주세요',
                  ]"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <!-- 합계금액 (Total Price) -->
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="editedItem.totalPrice"
                  label="합계금액"
                  type="number"
                  min="0"
                  required
                  outlined
                  readonly
                ></v-text-field>
              </v-col>

              <!-- 비고 (Notes) -->
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.note"
                  label="비고"
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>

            <!-- 제출 -->
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn color="success" type="submit" :disabled="!valid || loading">
                  <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="white"
                    size="20"
                    class="mr-2"
                  ></v-progress-circular>
                  저장
                </v-btn>
                <v-btn color="error" @click="cancel">취소</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </UiParentCard>
      </v-container>
    </div>
  </template>

  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
  import UiParentCard from '@/components/shared/UiParentCard.vue';
  import api from '@/api/axiosinterceptor';

  const router = useRouter();

  const breadcrumbs = ref([
    { text: '견적 리스트', disabled: false, href: '/estimates' }, 
    { text: '새로운 견적 등록', disabled: true, href: '/estimates/create' },
  ]);

  const valid = ref(false);

  const loading = ref(false); 

  const form = ref(null);

  const editedItem = ref({
      estNo: null,
      propNo: null,
      propName: '',
      prodCode: null,
      prodName: '',
      name: '',
      estDate: '',
      taxCls: '',
      surtaxYn: '',
      prodCnt: 0,
      supplyPrice: 0,
      tax: 0, 
      totalPrice: 0,
      note: '',
  });

  const taxClasses = ['매출과세', '매출면세', '수출영세'];
  const surtaxOptions = ['부가세 미포함', '부가세 포함'];

  const proposals = ref([]);
  const proposalModal = ref(false);

  onMounted(async () => {
  try {
    const response = await api.get('/proposals');
    console.log("API response", response.data);

    if (Array.isArray(response.data)) {
      proposals.value = response.data.map(proposal => ({
        propNo: proposal.propNo,
        name: proposal.name
      }));
    } else {
      console.error("Expected an array but got:", response.data);
    }
  } catch (error) {
    console.error("Failed to fetch proposals:", error);
  }
});


  const openProposalModal = () => {
      proposalModal.value = true;
  }

  const closeProposalModal = () => {
      proposalModal.value = true;
  }
      
const selectProposal = (proposal) => {
  editedItem.value.propNo = proposal.propNo;
  editedItem.value.propName = proposal.name;
  proposalModal.value = false; 
};
      
const products = ref([]);
const productModal = ref(false);

onMounted(async () => {
  try {
    const response = await api.get('/products');
    console.log("API response", response.data);

    if (Array.isArray(response.data.result)) {
      products.value = response.data.result.map(product => ({
        prodCode: product.prodCode,  
        name: product.name
      }));
    } else {
      console.error("Expected an array but got:", response.data);
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});

const selectProduct = (product) => {
  editedItem.value.prodCode = product.prodCode;  
  editedItem.value.prodName = product.name;  
  productModal.value = false;
};


  const openProductModal = () => {
      productModal.value = true;
  }

  const closeProductModal = () => {
      productModal.value = true;
  }
      
  const save = async () => {
      if (form.value) {
      const isValid = await form.value.validate();
      if (!isValid) {
          alert("폼에 오류가 있습니다. 모든 필드를 올바르게 입력해주세요.");
          return;
          }
          }
          console.log('Edited Item before saving:', editedItem.value);

          loading.value = true;

          try {
          const res = await api.post('/estimates', editedItem.value);
          if (res.status === 200) {
              alert("견적이 성공적으로 등록되었습니다.");
              router.push('/estimates');
          }
          } catch (error) {
          console.error("등록 실패:", error);
          alert("견적 등록에 실패했습니다.");
          } finally {
          loading.value = false;
          }
      };


  const calculateTotalPrice = () => {
    editedItem.value.totalPrice = editedItem.value.supplyPrice + editedItem.value.tax;
  };

  watch(
    () => editedItem.value.supplyPrice,
    () => {
      calculateTotalPrice();
    }
  );

  watch(
    () => editedItem.value.tax,
    () => {
      calculateTotalPrice();
    }
  );


  const cancel = () => {
    router.push('/estimates');
  };

  </script>

  <style scoped>
  </style>
