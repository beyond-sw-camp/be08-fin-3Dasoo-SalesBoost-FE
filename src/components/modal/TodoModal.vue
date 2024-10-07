<template>
	<v-dialog :model-value="AddTodoModal" @update:model-value="$emit('update:AddTodoModal', $event)" persistent max-width="500px">
		<v-card>
			<v-card-title>할 일 추가</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="addTodo">
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field v-model="todo.title" label="제목*" required></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field v-model="todo.todoCls" label="분류*" required></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field v-model="todo.priority" label="우선순위*" required></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field v-model="todo.dueDate" label="마감일*" type="date" required></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-select v-model="todo.status" :items="statusOptions" label="상태*" required></v-select>
						</v-col>
						<v-col cols="12">
							<v-switch color="primary" v-model="todo.privateYn" label="나만보기 여부"></v-switch>
						</v-col>
						<v-col cols="12">
							<v-text-field v-model="todo.content" label="내용"></v-text-field>
						</v-col>
					</v-row>
					<small>*필수 입력</small>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<!-- <v-btn color="error" variant="text" @click="closeTodoModal" flat>Close</v-btn> -->
				<v-btn color="close" @click="$emit('close')">Close</v-btn>
				<v-btn color="success" variant="text" @click="addTodo" flat>Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import '@/views/apps/calendar/calendar.css'
export default {
	props: {
		AddTodoModal: Boolean,
		todo: Object,
		statusOptions: Array,
	},
	methods: {
		closeTodoModal() {
			this.$emit('update:AddTodoModal', false);
		},
		addTodo() {
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