<script setup>
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import api from '@/api/axiosinterceptor';

const searchYear = ref('');
const searchSalesperson = ref('');
const targetSales = ref([]);
const showAlert = ref(false);
const alertMessage = ref('');
const alertColor = ref('');
const canAddTargetSale = ref(false);

const headers = ref([
  { title: '제품 이름', align: 'start', sortable: false, key: 'prodName' },
  { title: '합계', key: 'sum' },
  { title: '01월', key: 'month01' },
  { title: '02월', key: 'month02' },
  { title: '03월', key: 'month03' },
  { title: '04월', key: 'month04' },
  { title: '05월', key: 'month05' },
  { title: '06월', key: 'month06' },
  { title: '07월', key: 'month07' },
  { title: '08월', key: 'month08' },
  { title: '09월', key: 'month09' },
  { title: '10월', key: 'month10' },
  { title: '11월', key: 'month11' },
  { title: '12월', key: 'month12' },
  { title: '액션', align: 'start' },
]);

const groupDataByProduct = (data) => {
  const groupedData = [];
  
  data.forEach(item => {
    let existingProduct = groupedData.find(prod => prod.prodName === item.prodName);
    
    if (!existingProduct) {
      existingProduct = {
        prodName: item.prodName,
        month01: '', month02: '', month03: '', month04: '', 
        month05: '', month06: '', month07: '', month08: '', 
        month09: '', month10: '', month11: '', month12: '',
        sum: 0
      };
      groupedData.push(existingProduct);
    }

    const monthKey = `month${String(item.month).padStart(2, '0')}`;
    existingProduct[monthKey] = item.monthTarget;

    existingProduct.sum += item.monthTarget;
  });

  return groupedData;
};

const fetchTargetSales = async () => {
  try {
    const response = await api.get(`/targetsales/${searchSalesperson.value}`, {
      params: {
        year: searchYear.value,
      },
    });

    console.log(response.data.code);

    if (response.data.code === 200) {
      if (Array.isArray(response.data.result)) {
        targetSales.value = groupDataByProduct(response.data.result);
        showAlert.value = false;
        canAddTargetSale.value = true;
      }
    } else {
      canAddTargetSale.value = false;

      alertMessage.value = '존재하지 않는 회원입니다.';
      alertColor.value = 'error';
      showAlert.value = true;
      targetSales.value = [];
      canAddTargetSale.value = false;
    }
  } catch (error) {
    console.error('Error adding target sale:', error.message || error);
  }
};

const dialog = ref(false);
const newTargetSale = ref({
  userName: '',
  prodName: '',
  sum: 0,
  year: '',
  monthTargets: Array(12).fill(0),
});

const openDialog = () => {
  newTargetSale.value.userName = searchSalesperson.value;
  newTargetSale.value.year = searchYear.value;
  dialog.value = true;
};

const addTargetSale = async () => {
  try {
    await api.post('/targetsales', newTargetSale.value);
    console.log('Target Sale Added successfully');
    dialog.value = false;
    fetchTargetSales();
  } catch (error) {
    console.error('Error adding target sale:', error.message || error);
  }
};

const closeDialog = () => {
  dialog.value = false;
  newTargetSale.value = {
    userName: '',
    prodName: '',
    sum: 0,
    year: '',
    monthTargets: Array(12).fill(0),
  };
};

const search = () => {
  fetchTargetSales();
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Target sales management">
        <v-row class="mb-5">
          <v-col cols="4" sm="4">
            <v-text-field
              v-model="searchYear"
              append-inner-icon="mdi-calendar"
              label="년도 검색"
              single-line
              hide-details
            />
          </v-col>
          <v-col cols="4" sm="4">
            <v-text-field
              v-model="searchSalesperson"
              append-inner-icon="mdi-account"
              label="영업사원명 검색"
              single-line
              hide-details
            />
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" @click="search">검색</v-btn>
          </v-col>
        </v-row>

        <v-alert v-if="showAlert" class="mb-3" :color="alertColor" variant="tonal">
          {{ alertMessage }}
        </v-alert>

        <v-data-table
          class="border rounded-md" 
          :headers="headers"
          :items="targetSales">
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.prodName }}</td>
              <td>{{ item.sum }}</td>
              <td>{{ item.month01 }}</td>
              <td>{{ item.month02 }}</td>
              <td>{{ item.month03 }}</td>
              <td>{{ item.month04 }}</td>
              <td>{{ item.month05 }}</td>
              <td>{{ item.month06 }}</td>
              <td>{{ item.month07 }}</td>
              <td>{{ item.month08 }}</td>
              <td>{{ item.month09 }}</td>
              <td>{{ item.month10 }}</td>
              <td>{{ item.month11 }}</td>
              <td>{{ item.month12 }}</td>
              <td>
                <v-icon color="info" size="small" class="me-2" @click.stop="">
                  mdi-pencil
                </v-icon>
              </td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar class="bg-lightsecondary" flat>
              <v-toolbar-title>Target Sale</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn 
                v-if="canAddTargetSale" 
                color="primary" 
                variant="flat" 
                dark 
                @click.stop="openDialog">
                Add New TargetSale
              </v-btn>
            </v-toolbar>
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>New Target Sale</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="newTargetSale.prodName" label="제품 이름" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newTargetSale.sum" label="합계" type="number" />
            </v-col>
            <v-col cols="4" v-for="(month, index) in 12" :key="index">
              <v-text-field v-model="newTargetSale.monthTargets[index]" :label="`${index + 1}월`" type="number" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addTargetSale">Save</v-btn>
        <v-btn @click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.v-toolbar {
  margin-bottom: 2rem;
}
</style>
