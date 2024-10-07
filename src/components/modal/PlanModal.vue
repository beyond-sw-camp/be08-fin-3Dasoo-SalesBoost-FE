<template>
	<v-dialog :model-value="AddPlanModal" @update:model-value="$emit('update:AddPlanModal', $event)" persistent max-width="500px">
		<v-card>
			<v-card-title>일정 추가</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="addPlan">
					<v-alert v-if="showAlert" type="warning" class="toast-alert">
						필수 입력 필드를 모두 채워주세요.
					</v-alert>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field v-model="plan.title" label="제목*" required></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field v-model="plan.planCls" label="분류*" required></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field v-model="plan.planDate" label="일자*" type="date" required></v-text-field>
						</v-col>
						<v-row>
							<v-col>
								<v-select
									label="시작 시간"
									v-model="plan.startTime"
									:items="timeOptions"
									outlined
									:rules="[v => !!v || '시작 시간을 선택하세요.']"
									required
								></v-select>
							</v-col>
							<v-col>
								<v-select
									label="종료 시간"
									v-model="plan.endTime"
									:items="timeOptions"
									outlined
									:rules="[v => !!v || '종료 시간을 선택하세요.']"
									required
								></v-select>
							</v-col>
						</v-row>
						<v-col cols="12">
							<v-switch color="primary" v-model="plan.privateYn" label="나만보기 여부"></v-switch>
						</v-col>
						<v-col cols="12">
							<v-text-field v-model="plan.content" label="내용"></v-text-field>
						</v-col>
					</v-row>
					<small>*필수 입력</small>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="close" @click="$emit('close')">Close</v-btn>
				<v-btn color="success" variant="text" @click="addPlan" flat>Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import '@/views/apps/calendar/calendar.css';

export default {
	props: {
		AddPlanModal: Boolean,
		plan: Object,
		statusOptions: Array,
	},
	data() {
		return {
			showAlert: false,
      timeOptions: this.generateTimeOptions(), 
		};
	},
	methods: {
    generateTimeOptions() {
      const options = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) { // 30분 간격으로 시간 생성
          const paddedHour = hour.toString().padStart(2, '0');
          const paddedMinute = minute.toString().padStart(2, '0');
          options.push(`${paddedHour}:${paddedMinute}`);
        }
      }
      return options;
    },
		addPlan() {
			if (!this.plan.title || !this.plan.planCls || !this.plan.planDate || !this.plan.startTime || !this.plan.endTime) {
				this.showAlert = true;
				setTimeout(() => {
					this.showAlert = false;
				}, 2000);
				return;
			}
			this.showAlert = false;
			this.$emit('add');
		},
	},
};
</script>

<style scoped>
.toast-alert {
  position: fixed;
  bottom: 10%; /* 원하는 위치에 맞게 수정 가능 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000; /* 모달 위에 뜨도록 높은 값 설정 */
  width: 100%; /* 필요에 따라 너비 조정 */
}
</style>