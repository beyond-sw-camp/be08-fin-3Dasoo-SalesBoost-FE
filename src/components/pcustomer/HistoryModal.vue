<script setup lang="ts">
import api from "@/api/axiosinterceptor";
import { ref,defineProps,defineEmits, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  dialog:{
    type:Boolean,
    required:true
  }
});
const emit  = defineEmits(["update:dialog","close","save"]);

const date = ref();
const contact = ref();
const content = ref();

const confirmDate = ref([
    (s:string)=> !! s|| '날짜를 선택해주세요'
]);

const confirmContact = ref([
    (s:string)=> !! s|| '접촉구분을 선택해주세요'
]);

const formIsValid = computed(()=>{
    return date.value && contact.value;
})

const saveHistory = ()=>{
 
  if(formIsValid.value){
    saveHistoryAPI(route.params.id);
    
  }else{
    alert("필수 정보를 입력해주세요");
  }
  
}
const resetForm =()=>{
  date.value = '';
  contact.value = '';
  content.value = '';
}

const saveHistoryAPI=async(id: string | string[])=>{
  try{
    const response = await api.post(`/pcustomers/${id}/history`,{
      contactDate:date.value?date.value:null,
      cls:contact.value?contact.value:null,
      content:content.value?content.value:null,
    });
    console.log(response);
    if(response.data.code == 200){
        alert(response.data.result);
        resetForm();
        emit('save'); 
    }else{
      alert(response.data.message);
    }

  }catch(err){
    console.log(`[ERROR 몌세지] : ${err}`);
  }
}

</script>

<template>
  <div class="text-center">
    <v-dialog v-model="props.dialog" persistent class="dialog-mw" @update:modelValue="emit('update:dialog', $event)" max-height="360px">
      <v-card style="height: 400px" class="overflow-auto">
        <v-container class="pb-0">
        <v-card-title class="pa-5">
          <span class="text-h5">접촉이력 등록</span>
        </v-card-title>
        <v-card-text>
          
            <v-row>
              <v-col cols="12" sm="6" >
                <v-label class="font-weight-medium">접촉일</v-label><span class="require">*</span>
                <v-text-field color="primary" variant="outlined" v-model="date" type="date" :rules="confirmDate"></v-text-field>
              </v-col>
       
          <v-col cols="12" sm="6">     
            <v-label class="font-weight-medium">접촉구분</v-label><span class="require">*</span>
            <v-select v-model="contact" :items="['전화','메일','방문','온라인 미팅','채널톡','기타']" single-line variant="outlined" :rules="confirmContact"></v-select>
          </v-col>

          <v-col>
            <v-label class="font-weight-medium mb-2">접촉내용</v-label>
            <v-text-field  color="primary" v-model="content" variant="outlined" type="text"/>
          </v-col>
            </v-row>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="emit('close')" flat>
            닫기
          </v-btn>
          <v-btn color="success" variant="text" @click="saveHistory" flat>
            저장
          </v-btn>
        </v-card-actions>
      </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
    .require{
        color: red;
    }
  </style>
