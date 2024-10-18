<script setup lang="ts">
import { ref } from 'vue';
// common components

//Components
import pCustomerAddCard from '@/components/pcustomer/pCustomerAddCard.vue';
import pCustomerInputForm from '@/components/pcustomer/pCustomerInputForm.vue';
import pCustomerHistoryCard from '@/components/pcustomer/pCustomerHistoryCard.vue';

/*tab*/
const tab = ref(null);

const page = ref({ title: '잠재고객 등록' });

const addHistory = ()=>{
     alert("서비스 오픈예정");
}
</script>

<template>
     <v-row class="mb-3">
          <pCustomerAddCard :title="page.title">
               <pCustomerInputForm />
          </pCustomerAddCard>

     </v-row>
     <v-row>
          <pCustomerHistoryCard>
               <div class="history_container">
                    <div>이력 (1)</div>
                    <div class="history_plus" @click="addHistory"><v-icon color="error" icon="$plus" size="x-large" /></div>
               </div>
               <hr class="divider">
               </hr>

               <v-col cols="12">
                   <div>
                    <div>2024.10.23 (방문) - 삼다수</div>
                    <hr/>
                    <div>오후 2시 방문 예정</div>
                   </div>
               </v-col>
               <v-col cols="12">
                   <div>
                    <div>2024.10.23 (메일) - 삼다수</div>
                    <hr/>
                    <div>상담 날짜 약속을 위한 메일</div>
                   </div>
               </v-col>
          </pCustomerHistoryCard>

     </v-row>
</template>
<style lang="scss" scoped>
.history_container {
     display: flex;
     justify-content: space-between;
     font-size: 14px;
}

.divider {
     border-color: rgb(0, 110, 255);
}

.history_plus {
     cursor: pointer;
}
</style>
