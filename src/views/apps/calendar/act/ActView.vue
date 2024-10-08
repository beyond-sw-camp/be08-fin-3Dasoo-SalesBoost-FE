<template>
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
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const valid = ref(false);
    const form = ref(null);
    const loading = ref(false);
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

    const resetForm = () => {
      act.value = {
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
      };
      valid.value = false;
    };

    const submitForm = async () => {
      if (form.value && form.value.validate()) {
        loading.value = true;
        try {
          const response = await axios.post('http://localhost:8080/api/acts', {
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
          console.log(response); // 응답 객체 출력


          if (response.data.code === 200 || response.data.code === 201) {
            alert("저장이 완료되었습니다.");
            setTimeout(() => {
              resetForm();
              router.push('/apps/calendar');
            }, 1000);
          }

        } catch (error) {
          console.error("등록 실패:", error);
        } finally {
          loading.value = false;
        }
      } else {
        alert("필수 입력 필드를 확인해주세요.");
      }
    };

    return {
      form,
      valid,
      act,
      actStatusOptions,
      timeOptions,
      loading,
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
</style>
