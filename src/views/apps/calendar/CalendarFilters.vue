<script setup lang="ts">

import { ref, onMounted, computed } from 'vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import { defineComponent } from 'vue';


const panel = ref([0, 1, 2, 3, 4]);
const priceSort = [
    {
        label: '$10 - $50',
        price: '50'
    },
    {
        label: '$50 - $100',
        price: '100'
    },
    {
        label: '$100 - $150',
        price: '151'
    },
    {
        label: '$150 - $200',
        price: '200'
    },
    {
        label: 'Over $200',
        price: '250'
    }
];

const store = useEcomStore();

//Reset Filter
store.filterReset();

const selectedGender = ref('');
store.SelectGender(selectedGender);

const selectedStatus = ref('all');
store.SelectCategory(selectedStatus);

const selectPrice = ref('');
store.SelectPrice(selectPrice);

const selectRating = ref(1);

onMounted(() => {
    store.fetchProducts();
});

const getProducts = computed(() => {
    return store.products;
});
const getUniqueData = (data: any, attr: any) => {
    let newVal = data.map((curElem: any) => {
        return curElem[attr];
    });
    if (attr === 'colors') {
        newVal = newVal.flat();
    }

    return (newVal = [...Array.from(new Set(newVal))]);
};
interface ColorItem {
    color: string;
    label: string;
}

const filterbyColors: any = computed(() => {
    return getUniqueData(getProducts.value, 'colors');
});


function filterReset() {
    store.SelectGender('');
    store.SelectCategory('all');
    store.SelectPrice('');
    store.sortByColor('All');
}

</script>
<template>
  <v-sheet class="pa-4 pt-1">
      <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel elevation="0">
              <v-expansion-panel-title class="font-weight-medium custom-accordion"> 분류 </v-expansion-panel-title>
              <v-expansion-panel-text class="acco-body">
                  <v-row no-gutters>
                      <v-col cols="12">
                          <v-checkbox label="개인일정" v-model="selectedGender" color="secondary" value="personal_plan" hide-details> </v-checkbox>
                      </v-col>
                      <v-col cols="12">
                          <v-checkbox label="전사일정" v-model="selectedGender" color="secondary" value="company_plan" hide-details> </v-checkbox>
                      </v-col>
                      <v-col cols="12">
                          <v-checkbox label="할 일" v-model="selectedGender" color="secondary" value="todo" hide-details></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                          <v-checkbox label="영업활동" v-model="selectedGender" color="secondary" value="act" hide-details></v-checkbox>
                      </v-col>
                  </v-row>
              </v-expansion-panel-text>
          </v-expansion-panel>
          <v-divider />
          <v-expansion-panel elevation="0">
              <v-expansion-panel-title class="font-weight-medium custom-accordion"> 상태 </v-expansion-panel-title>
              <v-expansion-panel-text class="acco-body">
                  <v-row no-gutters>
                      <v-col cols="12">
                          <v-checkbox
                              label="Todo"
                              v-model="selectedStatus"
                              color="primary"
                              value="Todo"
                              hide-details
                          ></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                          <v-checkbox
                              label="In Progress"
                              v-model="selectedStatus"
                              color="primary"
                              value="In Progress"
                              hide-details
                          ></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                          <v-checkbox
                              label="Done"
                              v-model="selectedStatus"
                              color="primary"
                              value="Done"
                              hide-details
                          ></v-checkbox>
                      </v-col>
                  </v-row>
              </v-expansion-panel-text>
          </v-expansion-panel>
          <v-divider />
          <v-expansion-panel elevation="0">
              <v-expansion-panel-title class="font-weight-medium custom-accordion"> 캘린더 구분 </v-expansion-panel-title>
              <v-expansion-panel-text class="acco-body">
                  <div class="d-flex gap-2 flex-wrap v-col-11 px-0">
                      <template v-for="(catcolor, i) in filterbyColors" :key="i" v-if="filterbyColors.length > 0">
                          <v-avatar
                              class="cursor-pointer"
                              :color="catcolor"
                              variant="flat"
                              size="small"
                              @click="store.sortByColor(catcolor)"
                          >
                              <template v-if="store.color === catcolor">
                                  <CheckIcon size="13" />
                              </template>
                          </v-avatar>
                      </template>
                  </div>
              </v-expansion-panel-text>
          </v-expansion-panel>
          <v-divider />
      </v-expansion-panels>
      <v-btn color="primary" @click="filterReset()"  block class="mt-5" >필터 초기화</v-btn>
  </v-sheet>
</template>

<style lang="scss">
.custom-accordion {
    padding: 18px 2px;

    min-height: 30px !important;
    .v-expansion-panel-title__overlay {
        background-color: transparent;
    }
}
.acco-body {
    .v-expansion-panel-text__wrapper {
        padding: 5px 0;
    }
}
.custom-radio-box {
    .v-selection-control-group {
        flex-wrap: wrap;
    }
}
.v-sheet {
    border-radius: 8px;
}

</style>
