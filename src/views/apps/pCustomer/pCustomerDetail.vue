<script setup >
import { onMounted, ref , computed} from 'vue';
import CustomerAddCard from '@/components/customer/CustomerAddCard.vue';
import pCustomerHistoryCard from '@/components/pcustomer/pCustomerHistoryCard.vue';
import pCustomerUpdateForm from '@/components/pcustomer/pCustomerUpdateForm.vue';
import HistoryModal from '@/components/pcustomer/HistoryModal.vue';
import { useRoute } from 'vue-router';
import api from '@/api/axiosinterceptor';

onMounted(()=>{
     getHistorysAPI(route.params.id);
});
const dataSize = computed(()=> historys.value.length);
const route = useRoute();
const tab = ref(null);
const page = ref({ title: '고객 정보' });
const dialog=ref(false);
const historys = ref([]);

const openHistoryModal = ()=>{
     dialog.value = true // 접촉이력 창 열기
}

const closeHistoryModal = ()=>{
     dialog.value = false; // 접촉이력 창 닫기
}
const saveHistory = ()=>{
     // 모달창 닫음
     dialog.value = false;
     getHistorysAPI(route.params.id);
}

const getHistorysAPI=async(id)=>{
     try{
          const response = await api.get(`/pcustomers/${id}/history`);

          console.log(response);
          if(response.data.code != 200){
               alert(response.data.message);
          }else{
               historys.value = response.data.result;
          }
     }catch(err){
          console.log(`[ERROR 몌세지] : ${err}`);
     }
}

const deleteHistory =(id)=>{
     if(confirm("정말 삭제하시겠습니까?")){
          deleteHistoryAPI(id);
     }

}

const deleteHistoryAPI = async(id)=>{
     try{
          const response = await api.delete(`/pcustomers/history/${id}`);
          console.log(response);
          const msg = response.data.result;
          alert(msg);
          if(response.data.code==200){
               getHistorysAPI(route.params.id);
          }
     }catch(err){
          console.log(`[ERROR 몌세지] : ${err}`);
     }
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
                    <div>접촉 이력 ({{ dataSize }})</div>
                    <div class="history_plus" @click="openHistoryModal"><v-icon color="error" icon="$plus" size="x-large" /></div>
               </div>
               <hr class="divider">
               </hr>

               <v-col cols="12" v-for="history in historys" :key="history.id">
                   <div>
                    <div class="history_title">
                         <div>{{ history.contactDate }} ({{ history.cls }}) - {{ history.userName }}</div>
                         <div class="history_delete" @click="deleteHistory(history.id)">삭제</div>
                    </div>
                    
                    <hr/>
                    <div>{{ history.content }}</div>
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

.history_title {
     display: flex;
     justify-content: space-between;
}
.history_delete{
     color: red;
     margin-right:10px;
     cursor: pointer;
}
</style>
