<script setup lang="ts">
import { ref } from 'vue';
// common components

//Components
import CustomerAddCard from '@/components/customer/CustomerAddCard.vue';
import pCustomerHistoryCard from '@/components/pcustomer/pCustomerHistoryCard.vue';
import pCustomerUpdateForm from '@/components/pcustomer/pCustomerUpdateForm.vue';
import HistoryModal from '@/components/pcustomer/HistoryModal.vue';

/*tab*/
const tab = ref(null);
const page = ref({ title: '고객 정보' });
const dialog=ref(false);

const openHistoryModal = ()=>{
     dialog.value = true // 접촉이력 창 열기
}

const closeHistoryModal = ()=>{
     dialog.value = false; // 접촉이력 창 닫기
}
const saveHistory = ()=>{
     // api 로 데이터 저장
     console.log('부모 컴포넌트 호출함');
     // 모달창 닫음
     dialog.value = false;
}
</script>

<template>
   <v-row class="mb-3">
        <CustomerAddCard :title=page.title>
             <pCustomerUpdateForm/>
        </CustomerAddCard>        
                            
   </v-row>

   <!-- todo : Refactoring : 컴포넌트로 분리 -->           
   <v-row>
          <pCustomerHistoryCard>
               <div class="history_container">
                    <div>접촉 이력 (1)</div>
                    <div class="history_plus" @click="openHistoryModal"><v-icon color="error" icon="$plus" size="x-large" /></div>
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
          <HistoryModal :dialog="dialog" @update:dialog="dialog=$event" @close="closeHistoryModal" @save="saveHistory"/>
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
