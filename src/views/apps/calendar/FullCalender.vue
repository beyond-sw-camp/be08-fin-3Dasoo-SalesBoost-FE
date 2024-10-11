<script>
import { defineComponent } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import TodoModal from '@/components/modal/TodoModal.vue';
import PlanModal from '@/components/modal/PlanModal.vue';
import './calendar.css';

export default defineComponent({
  components: {
    FullCalendar,
    TodoModal,
    PlanModal,
  },
  data() {
    return {
      AddTodoModal: false,
      AddPlanModal: false,
      selectedOption: null,
      showSuccessAlert: false,
      alertMessage: '',
      alertType: '',
      items: ['할 일', '영업활동', '일정'],
      showAlert: false,
      statusOptions: ['TODO', 'INPROGRESS', 'DONE'],
      priorityOptions: ['높음', '중간', '낮음'],
      todo: {
        calendarNo: 1,
        title: '',
        todoCls: '',
        priority: '',
        dueDate: '',
        status: '',
        privateYn: 'Y',
        content: '',
      },
      plan: {
        calendarNo: 1,
        title: '',
        planCls: '',
        planDate: '',
        startTime: '',
        endTime: '',
        personalYn: 'N',
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
        selectable: false,
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
    this.fetchActs();
    this.fetchPlans();
  },
  methods: {
    async fetchActs() {
      try {
        const response = await axios.get('http://localhost:8080/api/acts');
        const acts = response.data.result;

        const calendarApi = this.$refs.calendar.getApi();
        acts.forEach(act => {
          calendarApi.addEvent({
            id: act.no,
            title: act.name,
            start: act.actDate + 'T' + act.startTime,
            end: act.actDate + 'T' + act.endTime,
            allDay: false,
            classNames: ['act-event'],
          });
        });
      } catch (e) {
        console.error(e);
      }
    },
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
            classNames: ['todo-event'],
          });
        });
      } catch (e) {
        console.error(e);
      }
    }, 
    async fetchPlans() {
      try {
        const response = await axios.get('http://localhost:8080/api/plans');
        const plans = response.data.result;
        const calendarApi = this.$refs.calendar.getApi();
        plans.forEach(plan => {
          calendarApi.addEvent({
            id: plan.planNo,
            title: plan.title,
            start: plan.planDate + 'T' + plan.startTime,
            end: plan.planDate + 'T' + plan.endTime,
            allDay: false,
            classNames: ['plan-event'],
          });
        });
      } catch (e) {
        console.error(e);
      }
    },
    async addTodo() {
      if (!this.todo.title || !this.todo.todoCls || !this.todo.priority || !this.todo.dueDate || !this.todo.status) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
        return;
      }

      this.showAlert = false;
      const setPrivateYn = {
        ...this.todo,
        privateYn: this.todo.privateYn ? 'Y' : 'N',
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
          classNames: ['todo-event'],
        });
        this.closeTodoModal();
      } catch (e) {
        console.error(e);
      }
    },
    async addPlan(plan) {
      if (!plan.planCls || !plan.planDate) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
        return;
      }
      this.showAlert = false;
    
      const setPersonalYn = {
        ...plan,
        personalYn: plan.personalYn ? 'Y' : 'N',
      };
      try {
        const response = await axios.post('http://localhost:8080/api/plans', setPersonalYn);
        const createdPlan = response.data.result;
        const calendarApi = this.$refs.calendar.getApi();
        calendarApi.addEvent({
          id: createdPlan.planNo,
          title: createdPlan.title,
          start: createdPlan.planDate + 'T' + createdPlan.startTime,
          end: createdPlan.planDate + 'T' + createdPlan.endTime,
          allDay: false,
          classNames: ['plan-event'],
        });
      this.closePlanModal();
    } catch (e) {
      console.error(e);
    }
  },
    closeTodoModal() {
      this.AddTodoModal = false;
      this.selectedOption = null;
      setTimeout(() => {
        this.clearTodoForm();
      }, 300);
    },
    closePlanModal() {
      this.AddPlanModal = false;
      this.selectedOption = null;
      setTimeout(() => {
        this.clearPlanForm();
      }, 300);
    },
    clearTodoForm() {
      this.todo = {
        calendarNo: 1,
        title: '',
        todoCls: '',
        priority: '',
        dueDate: '',
        status: '',
        privateYn: 'N',
        content: '',
      };
    },
    clearPlanForm() {
    this.plan = {
        calendarNo: 1,
        title: '',
        planCls: '',
        planDate: '',
        startTime: '',
        endTime: '',
        personalYn: 'N',
        content: '',
      };
    },

    handleDateSelect(selectInfo) {
      this.AddTodoModal = true;
      this.AddPlanModal = true;
      this.todo.dueDate = selectInfo.startStr;
      this.plan.planDate = selectInfo.startStr;
    },
    async handleEventClick(clickInfo) {
      const eventId = clickInfo.event.id;    
      const eventClassNames = clickInfo.event.classNames;

      if (eventClassNames.includes('plan-event')) {
        this.AddPlanModal = true;
        try {        
          const response = await axios.get(`http://localhost:8080/api/plans/${eventId}`);        
          const planDetails = response.data.result;
          this.plan = {          
            calendarNo: planDetails.calendarNo,          
            title: planDetails.title,          
            planCls: planDetails.planCls,
            planDate: planDetails.planDate,          
            startTime: planDetails.startTime,          
            endTime: planDetails.endTime,         
            personalYn: planDetails.personalYn,           
            content: planDetails.content,        
          };
          this.DetailPlanShow = false;
        } catch (e) {        
            console.error(e);      
          }
      } 
      else if (eventClassNames.includes('todo-event')) {
        this.AddTodoModal = true;
        try {        
          const response = await axios.get(`http://localhost:8080/api/todos/${eventId}`);
          const todoDetails = response.data.result;

          this.todo = {          
            calendarNo: todoDetails.calendarNo,
            title: todoDetails.title,
            todoCls: todoDetails.todoCls,
            priority: todoDetails.priority,
            dueDate: todoDetails.dueDate,
            status: todoDetails.status,
            privateYn: todoDetails.privateYn,
            content: todoDetails.content,
          };
          this.DetailTodoShow = false;
        } catch (e) {        
          console.error(e);      
        }
      } 
      // else if (eventClassNames.includes('act-event')) {
      //   try {
      //     await this.$router.push({ 
      //       path: '/apps/act', 
      //       query: { eventId: eventId }
      //     });
      //   } catch (e) {        
      //     console.error(e);      
      //   }
      // }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
    handleAlert(alertData) {
      this.alertMessage = alertData.message;
      this.alertType = alertData.type;
      setTimeout(() => {
        this.showSuccessAlert = true;
      },500);
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 3000);
    }
  },
  watch: {
    selectedOption(value) {
      if (value === '할 일') {
        this.AddTodoModal = true;
      } else if (value === '영업활동') {
        this.$router.push('/apps/act');
      } else if (value === '일정') {
        this.AddPlanModal = true;
      }
    },
  },
});

</script>

<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
        <v-select
        v-model="selectedOption"
        :items="items"
        label="Select"
        hide-details
        outlined
        class="select-item"
      ></v-select>

      <FullCalendar ref="calendar" class='demo-app-calendar rounded-md':options="calendarOptions">
        <template v-slot:eventContent="arg">
          <div class="text-subtitle-1 pa-1 text-truncate">{{ arg.event.title }}</div>
        </template>
      </FullCalendar>

      <TodoModal v-model="AddTodoModal" :todo="todo" :priorityOptions="priorityOptions" :statusOptions="statusOptions" @close="closeTodoModal" @add="addTodo" @show-alert="handleAlert"/>
      <PlanModal v-model="AddPlanModal" :plan="plan" :statusOptions="statusOptions" @close="closePlanModal" @add="addPlan" @show-alert="handleAlert"/>

      <v-alert v-if="showSuccessAlert" type="success" variant="tonal" :class="['alert', alertType]">
        <h5 class="text-h6 text-capitalize">Success</h5>
          {{ alertMessage }}
      </v-alert>
    </div>
  </div>
</template>
<style>

.calendar-container {
  position: relative;
}

.select-item {
  margin-bottom: 20px;
  width: 200px;
}

.warn-alert {
	position: fixed;
	bottom: 10%; 
	left: 50%;
	transform: translateX(-50%);
	z-index: 3000;
	width: 100%;
}

.alert {
  position: fixed;
  top: 10%;
  left: 55%;
  transform: translateX(-50%);
  z-index: 3000;
  width: 90%;
  max-width: 12%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>