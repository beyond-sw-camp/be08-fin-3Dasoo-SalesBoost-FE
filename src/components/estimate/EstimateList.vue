<script setup>
import { computed, ref, watch } from 'vue';
import axios from 'axios';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRouter } from 'vue-router';

const page = ref({ title: '견적 리스트' });
const breadcrumbs = ref([
    { text: '영업관리', disabled: false, href: '' }, 
    { text: '견적', disabled: true, href: '/estimates' },
]);

const dialogDelete = ref(false);

const estimates = ref([]);

const editedIndex = ref(-1);
const editedItem = ref({
    estNo: null,
    propNo: null,
    propName: '',
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

const defaultItem = {
    estNo: null,
    propNo: null,
    propName: '',
    name: '',
    estDate: '',
    taxCls: '',
    surtaxYn: '',
    prodCnt: 0,
    supplyPrice: 0,
    tax: 0,
    totalPrice: 0,
    note: '',
};

const headers = ref([
    { title: '견적명', key: 'name' },
    { title: '제안명', key: 'propName'},
    { title: '견적일', key: 'estDate' },
    { title: '과세구분', key: 'taxCls' },
    { title: '공급가액', key: 'supplyPrice' },
    { title: '세액', key: 'tax' },
    { title: '합계금액', key: 'totalPrice' },
    { title: 'Actions', key: 'actions', sortable: false },
]);

const formTitle = computed(() => (editedIndex.value === -1 ? '추가' : '수정'));

const router = useRouter();

async function initialize() {
    try {
        const response = await axios.get('http://localhost:8080/api/estimates');
        estimates.value = response.data.result;

        console.log(estimates);

    } catch (error) {
        console.error('Failed to fetch estimates:', error);
    }
}

const submitEstimateApi = async () => {
  try {
    const res = await axios.post('http://localhost:8080/api/estimates', editedItem.value); 
    if (res.status === 201 || res.status === 200) {
      alert("견적이 성공적으로 등록되었습니다.");
      await initialize(); 
      resetForm();
      router.push('/estimates');
    }
  } catch (error) {
    console.error("등록 실패:", error);
    alert("견적 등록에 실패했습니다.");
  }
};

// const updateEstimateApi = async () => {
//     try {
//         const res = await axios.patch(`http://localhost:8080/api/estimates/${editedItem.value.estNo}`, editedItem.value);
//         if (res.status === 200) {
//             alert("견적이 성공적으로 수정되었습니다.");
//             Object.assign(estimates.value[editedIndex.value], res.data);
//             resetForm();
//             router.push('/estimates');
//         }
//     } catch (error) {
//         console.error("수정 실패:", error);
//         alert("견적 수정에 실패했습니다.");
//     }
// };

const deleteEstimateApi = async () => {
    try {
        await axios.delete(`http://localhost:8080/api/estimates/${editedItem.value.estNo}`);
        alert("견적이 성공적으로 삭제되었습니다.");
        estimates.value.splice(editedIndex.value, 1);
        resetForm();
        router.push('/estimates');
    } catch (error) {
        console.error("삭제 실패:", error);
        alert("견적 삭제에 실패했습니다.");
    }
};

const resetForm = () => {
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
};

const createNewEstimate = () => {
    resetForm();
    router.push('/estimates/create');
};

const editItem = (item) => {
    editedItem.value = { ...item };
    editedIndex.value = estimates.value.indexOf(item);
    router.push(`/estimates/edit/${item.estNo}`);
};

const deleteItem = (item) => {
    editedItem.value = { ...item };
    editedIndex.value = estimates.value.indexOf(item);
    dialogDelete.value = true;
};

const confirmDelete = async () => {
    await deleteEstimateApi();
    dialogDelete.value = false;
};

const closeDelete = () => {
    dialogDelete.value = false;
};

const navigateToCreate = () => {
    router.push('/estimates/create');
};

initialize();
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12">
        <UiParentCard title="견적">
          <v-data-table
            class="border rounded-mid"
            :headers="headers"
            :items="estimates"
            :sort-by="[{ key: 'estDate', order: 'asc' }]"
            item-key="estNo"
            show-actions
          >
            <template v-slot:top>
              <v-toolbar class="bg-lightsecondary" flat>
                <v-toolbar-title>등록된 견적 리스트</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="flat" @click="navigateToCreate">새로운 견적 등록</v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon
                color="info"
                size="small"
                class="me-2"
                @click="editItem(item)"
                role="button"
                aria-label="Edit Estimate"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                color="error"
                size="small"
                @click="deleteItem(item)"
                role="button"
                aria-label="Delete Estimate"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </UiParentCard>
      </v-col>
    </v-row>
  
    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center py-6">선택한 견적을 정말 삭제하시겠습니까?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="flat" @click="closeDelete">Cancel</v-btn>
          <v-btn color="success" variant="flat" @click="confirmDelete">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  