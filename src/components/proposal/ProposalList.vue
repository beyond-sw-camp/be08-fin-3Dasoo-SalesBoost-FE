<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/axiosinterceptor';

const page = ref({ title: '제안 리스트' });
const breadcrumbs = ref([
  { text: '영업관리', disabled: false, href: '#' },
  { text: '제안', disabled: true, href: '#' },
]);

const dialogDelete = ref(false);
const proposals = ref([]); 
const leads = ref([]);
const dialogEdit = ref(false);
const editedIndex = ref(-1);

const defaultItem = ref({
  propNo: null,
  leadNo: null,
  leadName: '',
  name: '',
  cont: '',
  reqDate: '',
  startDate: '',
  endDate: '',
  submitDate: '',
  prDate: '',
  note: '',
});

const editedItem = ref({ ...defaultItem.value }); 

const editItem = (item) => {
  if (item) {
    editedItem.value = {
      propNo: item.propNo,
      leadNo: item.leadNo,
      leadName: item.leadName,
      name: item.name,
      cont: item.cont,
      reqDate: item.reqDate,
      startDate: item.startDate,
      endDate: item.endDate,
      submitDate: item.submitDate,
      prDate: item.prDate,
      note: item.note,
    };
    editedIndex.value = proposals.value.indexOf(item);
    dialogEdit.value = true;
  }
};


const headers = ref([
  { title: '제안명', key: 'name' },
  { title: '영업기회명', key: 'leadName' },
  { title: '요청일', key: 'reqDate' },
  { title: '제안 시작일', key: 'startDate' },
  { title: '제안 종료일', key: 'endDate' },
  { title: '', key: 'actions', sortable: false },
]);

const formTitle = computed(() => (editedIndex.value === -1 ? '추가' : '수정'));

const router = useRouter();

async function initialize() {
    try {
        const response = await api.get('/proposals');
    
        proposals.value = response.data;

        console.log(proposals.value); 

    } catch (error) {
        console.error('Failed to fetch proposals:', error);
    }
}

const submitProposalApi = async () => {
  try {
    const res = await api.post('/proposals', editedItem.value);
    console.log(res);
    if (res.status === 200) {
      alert("제안이 성공적으로 등록되었습니다.");
      await initialize();
      resetForm();
      router.push('/proposals');
    }
  } catch (error) {
    console.error("등록 실패:", error);
    alert("제안 등록에 실패했습니다.");
  }
};

const updateProposalApi = async () => {
  try {
    const res = await api.patch(`/proposals/${editedItem.value.propNo}`, editedItem.value);
    if (res.status === 200) {
      alert("제안이 성공적으로 수정되었습니다.");
      await initialize(); 
      resetForm(); 
      dialogEdit.value = false; 
    }
  } catch (error) {
    console.error("수정 실패:", error);
    alert("제안 수정에 실패했습니다.");
  }
};

const deleteProposalApi = async () => {
  try {
    await api.delete(`/proposals/${editedItem.value.propNo}`);
    alert("제안이 성공적으로 삭제되었습니다.");
    proposals.value.splice(editedIndex.value, 1);
    resetForm();
    router.push('/proposals');
  } catch (error) {
    console.error("삭제 실패:", error);
    alert("제안 삭제에 실패했습니다.");
  }
  close();
};

const resetForm = () => {
    editedItem.value = { ...defaultItem.value };
    editedIndex.value = -1;
};

const createNewProposal = () => {
    resetForm();
    router.push('/proposals/create');
};

const confirmDelete = async () => {
  await deleteProposalApi(); 
  dialogDelete.value = false; 
};

const deleteItem = (item) => {
  editedItem.value = { ...item }; 
  editedIndex.value = proposals.value.indexOf(item);
  dialogDelete.value = true; 
};

const closeDeleteDialog = () => {
  dialogDelete.value = false;
};

const navigateToCreate = () => {
    router.push('/proposals/create');
};

const closeEditDialog = () => {
  resetForm(); 
  dialogEdit.value = false; 
};

const save = async () => {
  if (editedIndex.value === -1) {
    await submitProposalApi();
  } else {
    await updateProposalApi();
  }
  closeEditDialog(); 
};

const displayedProposals = computed(() => proposals.value);

initialize();
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="제안">
        <v-data-table
          :headers="headers"
          :items="displayedProposals"
          :sort-by="[{ key: 'reqDate', order: 'asc' }]"
          item-key="propNo"
          show-actions
        >
          <template v-slot:top>
            <v-toolbar class="bg-lightsecondary" flat>
              <v-toolbar-title>등록된 제안 리스트</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="flat" @click="navigateToCreate">새로운 제안 등록</v-btn>
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              color="info"
              size="small"
              class="me-2"
              @click="editItem(item)"
              role="button"
              aria-label="Edit Proposal"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              color="error"
              size="small"
              @click="deleteItem(item)"
              role="button"
              aria-label="Delete Proposal"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>

  <v-dialog v-model="dialogEdit" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 text-center py-6">{{ formTitle }}</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="editedItem.leadName" label="영업기회명" disabled></v-text-field>
          <v-text-field v-model="editedItem.name" label="제안명" required></v-text-field>
          <v-text-field v-model="editedItem.cont" label="내용" required></v-text-field>
          <v-text-field v-model="editedItem.reqDate" label="요청일" required type="date"></v-text-field>
          <v-text-field v-model="editedItem.startDate" label="제안 시작일" required type="date"></v-text-field>
          <v-text-field v-model="editedItem.endDate" label="제안 종료일" required type="date"></v-text-field>
          <v-text-field v-model="editedItem.prDate" label="발표일" required type="date"></v-text-field>
          <v-textarea v-model="editedItem.note" label="비고" rows="2"></v-textarea>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="flat" @click="closeEditDialog">Cancel</v-btn>
        <v-btn color="success" variant="flat" @click="save">Save</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 text-center py-6">선택한 제안을 정말 삭제하시겠습니까?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="flat" @click="closeDeleteDialog">Cancel</v-btn>
        <v-btn color="success" variant="flat" @click="confirmDelete">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
