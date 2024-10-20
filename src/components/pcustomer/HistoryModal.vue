<script setup lang="ts">
import { ref,defineProps,defineEmits } from "vue";

const props = defineProps({
  dialog:{
    type:Boolean,
    required:true
  }
});
const emit  = defineEmits(["update:dialog","close","sasve"]);

const date = ref();
const contact = ref();
const content = ref();
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
                <v-label class="font-weight-medium">접촉일</v-label>
                <v-text-field color="primary" variant="outlined" v-model="date" type="date" ></v-text-field>
              </v-col>
       
          <v-col cols="12" sm="6">     
            <v-label class="font-weight-medium">접촉구분</v-label>
            <v-select v-model="contact" :items="['전화','메일','방문','온라인 미팅','채널톡','기타']" single-line variant="outlined"></v-select>
          </v-col>

          <v-col>
            <v-label class="font-weight-medium mb-2">접촉내용</v-label>
            <v-text-field  color="primary" v-model="content" variant="outlined" type="text">
            </v-text-field>
          </v-col>
            </v-row>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="emit('close')" flat>
            닫기
          </v-btn>
          <v-btn color="success" variant="text" @click="emit('sasve')" flat>
            저장
          </v-btn>
        </v-card-actions>
      </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
