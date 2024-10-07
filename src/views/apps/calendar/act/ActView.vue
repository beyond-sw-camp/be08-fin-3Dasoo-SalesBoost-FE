<template>
    <v-row justify="end">
      <v-col cols="12" lg="12" offset-md="1">
          <v-label class="mb-2 font-weight-medium">영업기회</v-label>
          <v-form ref="form" v-model="valid" lazy-validation>
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
                <v-text-field 
                  v-model="act.startTime" required
                  :rules="[v => !!v || '시작 시간을 선택하세요.']"
                  variant="outlined" placeholder="hh:mm"  type="time" color="primary"></v-text-field>
              </v-col>
              <v-col>
                <v-label class="mb-2 font-weight-medium">종료 시간</v-label>
                <v-text-field 
                  v-model="act.endTime" required
                  :rules="[v => !!v || '종료 시간을 선택하세요.']"
                  variant="outlined" placeholder="hh:mm"  type="time" color="primary"></v-text-field>
              </v-col>
            </v-row>

                <v-col cols="12" md="3" sm="6">
                  <v-label class="mb-2 font-weight-medium">완료 여부</v-label>
                    <v-switch v-model="act.completeYn" hide-details color="primary" inset></v-switch>
                </v-col>

            <v-textarea label="계획내용" v-model="act.planContent" outlined></v-textarea>
            <v-textarea label="활동내용" v-model="act.actContent" outlined></v-textarea>

            <v-btn color="primary" @click="submitForm">저장</v-btn>
          </v-form>
      </v-col>
    </v-row>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  components: {
  },
  setup() {
    const router = useRouter();

    const valid = ref(false);
    const form = ref(null);
    const act = ref({
      leadNo: 1, // 영업기회(하드코딩)
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

    const actStatusOptions = ref([
      "MEETING",
      "PRODUCT_INTRO",
      "NEGOTIATION",
      "CONTRACT",
      "ESITIMATE",
      "PROPOSAL"
    ]);

    const timeOptions = ref([
      "09:00", "10:00", "11:00", "12:00", "13:00",
      "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
    ]);

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
    };

    const submitForm = async () => {


      if (form.value.validate()) {
        try {
          const response = await axios.post('http://localhost:8080/api/acts', {
            leadNo: act.value.leadNo,
            name: act.value.name,
            cls: act.value.cls,
            purpose: act.value.purpose,
            actDate: act.value.actDate,
            startTime: act.value.startTime,
            endTime: act.value.endTime,
            completeYn: act.value.completeYn ? "Y" : "N", 
            planContent: act.value.planContent,
            actContent: act.value.actContent,
            calendarNo: 1, // TODO: 유저 캘린더 번호로 설정 필요
          });
          // console.log("등록 성공:", response.data);

          resetForm();

          router.push('/apps/calendar');

        } catch (error) {
          console.error("등록 실패:", error);
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
