<template>
    <div>
      <v-alert v-if="showSuccessAlert" type="success" variant="tonal" class="alert">
        <h5 class="text-h6 text-capitalize">Success</h5>
        <div>{{ alertMessage }}</div>
      </v-alert>
      <v-alert v-else-if="showAlert" type="warning" variant="tonal" class="alert">
        <h5 class="text-h6 text-capitalize">Warning</h5>
        <div>{{ alertMessage }}</div>
      </v-alert>
    </div>
    <v-row justify="end">
      <v-col cols="12" lg="12" offset-md="1">
          <v-label class="mb-2 font-weight-medium">영업기회</v-label>
          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <v-text-field
              v-model="act.leadNo"
              outlined
              :rules="[v => !!v || '영업기회를 입력하세요.']"
              required
            ></v-text-field>

            <v-label class="mb-2 font-weight-medium">활동명</v-label>
            <v-text-field
              v-model="act.name"
              outlined
              :rules="[v => !!v || '활동명을 입력하세요.']"
              required
            ></v-text-field>

            <v-label class="mb-2 font-weight-medium">활동분류</v-label>
            <v-select
              v-model="act.cls"
              :items="actStatusOptions"
              outlined
              :rules="[v => !!v || '활동분류를 선택하세요.']"
              required
            ></v-select>

            <v-label class="mb-2 font-weight-medium">활동목적</v-label>
            <v-text-field
              v-model="act.purpose"
              outlined
              :rules="[v => !!v || '활동목적을 입력하세요.']"
              required
            ></v-text-field>

            <v-label class="mb-2 font-weight-medium">활동일자</v-label>
            <v-text-field
              v-model="act.actDate"
              type="date"
              :rules="[v => !!v || '활동일자를 선택하세요.']"
              outlined
              required
            ></v-text-field>

            <v-row>
              <v-col>
                <v-label class="mb-2 font-weight-medium">시작 시간</v-label>
                <v-select 
                  v-model="act.startTime" 
                  :items="timeOptions"
                  required
                  :rules="[v => !!v || '시작 시간을 선택하세요.']"
                  outlined
                ></v-select>
              </v-col>
              <v-col>
                <v-label class="mb-2 font-weight-medium">종료 시간</v-label>
                <v-select 
                  v-model="act.endTime" 
                  :items="timeOptions"
                  required
                  :rules="[v => !!v || '종료 시간을 선택하세요.']"
                  outlined
                ></v-select>
              </v-col>
            </v-row>

            <v-col cols="12" md="3" sm="6">
              <v-label class="mb-2 font-weight-medium">완료 여부</v-label>
                <v-switch v-model="act.completeYn" hide-details color="primary" inset></v-switch>
            </v-col>

            <v-textarea label="계획내용" v-model="act.planContent" outlined></v-textarea>
            <v-textarea label="활동내용" v-model="act.actContent" outlined></v-textarea>

            <v-btn :loading="loading" color="primary" type="submit">저장</v-btn>
          </v-form>
      </v-col>
    </v-row>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import baseApi from '@/api/baseapi';
import api from '@/api/axiosinterceptor';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const valid = ref(false);
    const form = ref(null);
    const loading = ref(false);
    const showAlert = ref(false);  // 경고 알림 상태
    const showSuccessAlert = ref(false);  // 성공 알림 상태
    const alertMessage = ref('');  // 알림 메시지
    const alertType = ref('');  // 알림 타입
    const act = ref({
      leadNo: 1, 
      name: '',
      cls: '',
      purpose: '',
      actDate: null,
      startTime: null,
      endTime: null,
      completeYn: false,
      planContent: '',
      actContent: ''
    });

    const actStatusMapping = {
      '고객 미팅': 'MEETING',
      '제품 소개': 'PRODUCT_INTRO',
      '협상': 'NEGOTIATION',
      '계약': 'CONTRACT',
      '견적': 'ESTIMATE',
      '제안': 'PROPOSAL'
    };
    const actStatusOptions = ref(Object.keys(actStatusMapping));

    const generateTimeOptions = () => {
      const options = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const paddedHour = hour.toString().padStart(2, '0');
          const paddedMinute = minute.toString().padStart(2, '0');
          options.push(`${paddedHour}:${paddedMinute}`);
        }
      }
      return options;
    };

    const timeOptions = ref(generateTimeOptions());

    const submitForm = async () => {
      const isValid = form.value && await form.value.validate();

      if (isValid.valid) {
        loading.value = true;
        try {
          const response = await api.post('/acts', {
            leadNo: act.value.leadNo,
            name: act.value.name,
            cls: actStatusMapping[act.value.cls],
            purpose: act.value.purpose,
            actDate: act.value.actDate,
            startTime: act.value.startTime,
            endTime: act.value.endTime,
            completeYn: act.value.completeYn ? "Y" : "N", 
            planContent: act.value.planContent,
            actContent: act.value.actContent,
            calendarNo: 1, // TODO: 유저 캘린더 번호로 설정 필요
          });

          if (response.data.code === 200 || response.data.code === 201) {
            alertMessage.value = '저장이 완료되었습니다.';
            alertType.value = 'success';
            showSuccessAlert.value = true;
            setTimeout(() => {
              showSuccessAlert.value = false;
              console.log(route.path)
              if (route.path === '/apps/act') {
                router.push('/apps/act/list');
              } else {
                router.push('/apps/calendar');
              }
            }, 2000);
          }
        } catch (error) {
          console.error("등록 실패:", error);
        } finally {
          loading.value = false;
        }
      } 
      else {
        alertMessage.value = '필수 값을 입력해주세요.';
        alertType.value = 'warning';
        showAlert.value = true;
        setTimeout(() => {
          showAlert.value = false;
        }, 2000);
      }
    };

    return {
      form,
      valid,
      act,
      actStatusOptions,
      timeOptions,
      loading,
      showAlert,
      showSuccessAlert,
      alertMessage,
      alertType,
      submitForm
    };
  }
};
</script>

<style scoped>

.form-container {
  position: absolute;
  right: 0;
  width: 80%;
  padding: 20px;
  border-radius: 8px;
}

.alert {
  position: fixed;
  top: 10%;
  right: 20px;
  z-index: 999;
}
</style>