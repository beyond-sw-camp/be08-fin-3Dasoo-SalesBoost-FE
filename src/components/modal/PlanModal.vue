<template>
	<v-dialog :model-value="AddPlanModal" @update:model-value="$emit('update:AddPlanModal', $event)" persistent max-width="500px">
		<v-card>
			<v-card-title>일정</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="submitPlan" lazy-validation>
					<div>
						<v-alert v-if="showAlert" type="warning" variant="tonal" class="warn-alert">
							<h5 class="text-h6 text-capitalize">warning</h5>
							<div>{{ alertMessage }}</div>
						</v-alert>
					</div>
					<v-row>
						<v-col cols="12" sm="6" md="6">
							<v-text-field v-model="plan.title" label="제목*" 
							:rules="[v => !!v || '일정명을 입력하세요.']" required></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="6">
							<v-select
								v-model="planCls"
								:items="planClsOptions"
								label="분류*" outlined
								:rules="[v => !!v || '분류를 선택하세요.']"
								required
							></v-select>
						</v-col>
						<v-col cols="12">
							<v-text-field v-model="plan.planDate" label="일자*" type="date" 
							:rules="[v => !!v || '일자를 입력하세요.']" required></v-text-field>
						</v-col>
							<v-col cols="12" sm="6" md="6">
								<v-select
									label="시작 시간"
									v-model="plan.startTime"
									:items="timeOptions"
									outlined
									:rules="[v => !!v || '시작 시간을 선택하세요.']"
									required
								></v-select>
							</v-col>
							<v-col cols="12" sm="6" md="6">
								<v-select
									label="종료 시간"
									v-model="plan.endTime"
									:items="timeOptions"
									outlined
									:rules="[v => !!v || '종료 시간을 선택하세요.']"
									required
								></v-select>
							</v-col>
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
				<v-btn color="close" @click="closeModal">Close</v-btn>
				<v-btn color="success" variant="text" @click="submitPlan" flat>Save</v-btn>
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
      planClsOptions: ['개인', '전사', '제안', '견적', '계약'],
      planCls: '',
		};
	},
	methods: {
    generateTimeOptions() {
      const options = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const paddedHour = hour.toString().padStart(2, '0');
          const paddedMinute = minute.toString().padStart(2, '0');
          options.push(`${paddedHour}:${paddedMinute}`);
        }
      }
      return options;
    },
    submitPlan() {
			if (!this.plan.title || !this.planCls || !this.plan.planDate || !this.plan.startTime || !this.plan.endTime) {
				this.showAlert = true;
        this.alertMessage = '필수 필드를 입력해주세요'
				setTimeout(() => {
					this.showAlert = false;
				}, 2000);
				return;
			}
			this.showAlert = false;
      const planClsMapping = {
        '개인': 'PERSONAL',
        '전사': 'COMPANY',
        '제안': 'PROPOSAL',
        '견적': 'ESTIMATE',
        '계약': 'CONTRACT'
      };

      this.plan.planCls = planClsMapping[this.planCls];
      this.$emit('show-alert', {
        message: '저장이 완료되었습니다.',
        type: 'success',
      });
      this.$emit('add', this.plan);
			this.closeModal();
			},

		closeModal() {
			this.planCls=null;
			this.$emit('close');
		},
	},
};
</script>

<style scoped>
.warn-alert {
	position: fixed;
	bottom: 10%; 
	left: 50%;
	transform: translateX(-50%);
	z-index: 3000;
	width: 60%;
}
</style>