<template>
	<div>
		<v-select
			v-model="selectedOption"
			:items="items"
			label="Select"
			hide-details
			outlined
			class="select-item"
		></v-select>

		<FullCalendar ref="calendar" :options="calendarOptions"></FullCalendar>

		<v-alert
			v-if="showAlert"
			type="warning"
			class="mb-3 alert-fixed"
		>
			필수 입력 필드를 모두 채워주세요.
		</v-alert>

		<v-dialog v-model="AddModal" persistent max-width="500px">
			<v-card>
				<v-card-title>일정 추가</v-card-title>
				<v-card-text>
					<v-form @submit.prevent="addTodo">
						<v-row>
							<v-col cols="12" sm="6" md="4">
								<v-text-field v-model="todoRequestDto.title" label="제목*" required></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-text-field v-model="todoRequestDto.todoCls" label="분류*" required></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-text-field v-model="todoRequestDto.priority" label="우선순위*" required></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field v-model="todoRequestDto.dueDate" label="마감일*" type="date" required></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-select
									v-model="todoRequestDto.status"
									:items="statusOptions"
									label="상태*"
									required
								></v-select>
							</v-col>
							<v-col cols="12">
								<v-switch color="primary" v-model="todoRequestDto.privateYn" label="나만보기 여부"></v-switch>
							</v-col>
							<v-col cols="12">
								<v-text-field v-model="todoRequestDto.content" label="내용"></v-text-field>
							</v-col>
						</v-row>
						<small>*필수 입력</small>
					</v-form>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="error" variant="text" @click="closeModal" flat>
						Close
					</v-btn>
					<v-btn color="success" variant="text" @click="addTodo" flat>
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

export default defineComponent({
	components: {
		FullCalendar,
	},
	data() {
		return {
			AddModal: false,
			selectedOption: null,
			items: ['할 일', '영업활동', '일정'],
			showAlert: false,
			statusOptions: ['TODO', 'INPROGRESS', 'DONE'],
			todoRequestDto: {
				calendarNo: 1,//임시로 하드코딩
				title: '',
				todoCls: '',
				priority: '',
				dueDate: '',
				status: '',
				privateYn: 'Y',
				content: '',
			},
			calendarOptions: {
				plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
				headerToolbar: {
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay',
				},
				initialView: 'dayGridMonth',
				editable: true,
				selectable: true,
				selectMirror: true,
				dayMaxEvents: true,
				weekends: true,
				select: this.handleDateSelect,
				eventClick: this.handleEventClick,
				eventsSet: this.handleEvents,
			},
			currentEvents: [],
		};
	},
	created() {
		this.fetchTodos();
	},
	methods: {
		async fetchTodos() {
			try {
				const response = await axios.get('http://localhost:8080/api/todos');
				const todos = response.data.result;

				const calendarApi = this.$refs.calendar.getApi();
				todos.forEach(todo => {
					calendarApi.addEvent({
						id: todo.todoNo,
						title: todo.title,
						start: todo.dueDate,
						allDay: true,
					});
				});
			} catch (e) {
				console.error(e);
			}
		},
		async addTodo() {
			this.selectedOption = null;

			if (!this.todoRequestDto.title || !this.todoRequestDto.todoCls || !this.todoRequestDto.priority || !this.todoRequestDto.dueDate || !this.todoRequestDto.status) {
				this.showAlert = true;
				setTimeout(() => {
					this.showAlert = false;
				}, 2000);
				return;
			}

			this.showAlert = false;
			const setPrivateYn = {
				...this.todoRequestDto,
				privateYn: this.todoRequestDto.privateYn ? 'Y' : 'N',
			};
			try {
				const response = await axios.post('http://localhost:8080/api/todos', setPrivateYn);
				const createdTodo = response.data.result;
				const calendarApi = this.$refs.calendar.getApi();
				calendarApi.addEvent({
					id: createdTodo.todoNo,
					title: createdTodo.title,
					start: createdTodo.dueDate,
					allDay: true,
				});
				this.closeModal();
			} catch (e) {
				console.error(e);
			}
		},
		closeModal() {
	this.AddModal = false;
	this.selectedOption = null;
			this.clearForm();
			this.selectedOption = null;
		},
		clearForm() {
			this.todoRequestDto = {
				calendarNo: 1,// 임시로 하드코딩
				title: '',
				todoCls: '',
				priority: '',
				dueDate: '',
				status: '',
				privateYn: 'Y',
				content: '',
			};
			this.showAlert = false;
		},
		handleDateSelect(selectInfo) {
			this.AddModal = true;
			this.todoRequestDto.dueDate = selectInfo.startStr;
		},
		handleEventClick(clickInfo) {
			this.updateModalShow = true;
		},
		handleEvents(events) {
			this.currentEvents = events;
		},
	},
	watch: {
		selectedOption(value) {
			if (value === '할 일') {
				this.AddModal = true;
				
			} else if (value === '영업활동') {
				this.$router.push('/act');
			} else if (value === '일정') {
				this.$router.push('/plan');
			}
		},
	},
});
</script>

<style scoped>
.calendar-container{
	position: relative;
}

.select-item{
	margin-bottom: 20px;
	width: 200px;
}

.alert-fixed{
	position: fixed;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 3000;
}
</style>