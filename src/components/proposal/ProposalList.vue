<script setup>
import { computed, ref, nextTick, watch } from 'vue';
import axios from 'axios';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRouter } from 'vue-router';
import baseUrl from '@/api/baseapi';
import api from '@/api/axiosinterceptor';

const page = ref({ title: '제안 리스트' });
const breadcrumbs = ref([
  { text: '영업관리', disabled: false, href: '#' },
  { text: '제안', disabled: true, href: '#' },
]);

const dialog = ref(false);
const dialogDelete = ref(false);
const proposals = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  propNo: null,
  name: '',
  cont: '',
  reqDate: '',
  startDate: '',
  endDate: '',
  submitDate: '',
  prDate: '',
  note: '',
});
const defaultItem = ref({
  propNo: null,
  name: '제안명',
  cont: '내용',
  reqDate: '요청일',
  startDate: '제안 시작일',
  endDate: '제안 종료일',
  submitDate: '제출일',
  prDate: '발표일',
  note: '비고',
});

const headers = ref([
  { title: '제안명', key: 'name' },
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
  } catch (error) {
    console.error('Failed to fetch proposals:', error);
  }
}

const submitProposalApi = async () => {
  try {
    const res = await api.post('http://localhost:8080/api/proposals', editedItem.value);
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
    const res = await api.post(`http://localhost:8080/api/proposals/${editedItem.value.propNo}`, editedItem.value);
    if (res.status === 200) {
      alert("제안이 성공적으로 수정되었습니다.");
      Object.assign(proposals.value[editedIndex.value], res.data);
      resetForm();
      router.push('/proposals');
    }
  } catch (error) {
    console.error("수정 실패:", error);
    alert("제안 수정에 실패했습니다.");
  }
};

const deleteProposalApi = async () => {
  try {
    await api.delete(`http://localhost:8080/api/proposals/${editedItem.value.propNo}`);
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
  editedItem.value = { ...defaultItem };
  editedIndex.value = -1;
};

const createNewProposal = () => {
  resetForm();
  dialog.value = true;
};


const editItem = (item) => {
  editedItem.value = { ...item };
  editedIndex.value = proposals.value.indexOf(item);
  dialog.value = true; 
};

const save = async () => {
  if (editedIndex.value === -1) {
    await submitProposalApi();
  } else {
    await updateProposalApi();
  }
  dialog.value = false; 
};

const deleteItem = (item) => {
  editedItem.value = { ...item };
  editedIndex.value = proposals.value.indexOf(item); 
  dialogDelete.value = true; 
};


const deleteItemConfirm = async () => {
  await deleteProposalApi(); 
  dialogDelete.value = false;
};

const close = () => {
  dialog.value = false;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

initialize();
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="제안">
        <v-data-table
          class="border rounded-md"
          :headers="headers"
          :items="proposals"
          :sort-by="[{ key: 'reqDate', order: 'asc' }]"
        >
          <template v-slot:top>
            <v-toolbar class="bg-lightsecondary" flat>
              <v-toolbar-title>등록된 제안 리스트</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ props }">
                  <v-btn color="primary" variant="flat" dark v-bind="props" @click="createNewProposal">새로운 제안 등록</v-btn>
                </template>
                <v-card>
                  <v-card-title class="pa-4 bg-secondary">
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.name" label="제안명" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea v-model="editedItem.cont" label="내용" rows="4" outlined></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.reqDate" label="요청일" type="date"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.startDate" label="제안 시작일" type="date"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.endDate" label="제안 종료일" type="date"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.submitDate" label="제출일" type="date"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.prDate" label="발표일" type="date"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea v-model="editedItem.note" label="비고"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" variant="flat" @click="close">Cancel</v-btn>
                    <v-btn color="success" variant="flat" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5 text-center py-6">선택한 제안을 정말 삭제하시겠습니까?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" variant="flat" @click="closeDelete">Cancel</v-btn>
                    <v-btn color="success" variant="flat" @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon color="info" size="small" class="me-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon color="error" size="small" @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>
</template>