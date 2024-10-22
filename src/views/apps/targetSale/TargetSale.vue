<script setup>
import { ref, onMounted } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import api from '@/api/axiosinterceptor';
const searchYear = ref('');
const searchSalesperson = ref('');
const targetSales = ref([]);


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

    console.log('Fetched data:', response.data.result);

    if (Array.isArray(response.data.result)) {
      targetSales.value = groupDataByProduct(response.data.result);
    } else {
      console.warn('Result is not an array:', response.data.result);
      targetSales.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch target sales:', error);
  }
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

        <v-data-table :headers="headers" :items="targetSales">
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
            </tr>
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
