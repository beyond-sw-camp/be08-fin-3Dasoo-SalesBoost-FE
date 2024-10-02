<template>
<div>
    <!-- <h1>캘린더 페이지</h1> -->
    <FullCalendar ref="calendar" :options="calendarOptions"></FullCalendar>
    <v-dialog v-model="AddModal" max-width="500px">
        <v-card>
        <v-card-title>일정 추가</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="addTodo">
                <v-text-field v-model="todoRequestDto.title" label="제목" required></v-text-field>
                <v-text-field v-model="todoRequestDto.todoCls" label="분류" required></v-text-field>
                <v-text-field v-model="todoRequestDto.priority" label="우선순위" required></v-text-field>
                <v-text-field v-model="todoRequestDto.dueDate" label="마감일" type="date"></v-text-field>
                <v-text-field v-model="todoRequestDto.status" label="상태" required></v-text-field>
                <v-switch color="primary" v-model="todoRequestDto.privateYn" label="나만보기 여부"></v-switch>
                <!-- <v-text-field v-model="todoRequestDto.privateYn" label="나만보기 여부" required></v-text-field> -->
                <v-text-field v-model="todoRequestDto.content" label="내용"></v-text-field>
                <v-btn type="submit">추가</v-btn>
                <v-btn @click="closeModal">닫기</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

let eventGuid = 0
const today = new Date()

export function createEventId() {
    return String(eventGuid++)
}
//  TEST
// export const SHOW_EVENTS = [
//     {
//         id: createEventId(),
//         title: '컨퍼런스',
//         allDay: true,
//         start: new Date(today.getFullYear(), today.getMonth(), 3),
//         end: new Date(today.getFullYear(), today.getMonth(), 5),
//     },
// ]

export default defineComponent({
    components: {
        FullCalendar,
    },
    data() {
        return {
            AddModal: false,
            todoRequestDto: {
                title: '',
                todoCls: '',
                priority: '',
                dueDate: '',
                status: '',
                privateYn: 'Y',
                content: '',
                userNo: 1,// 나중에 로그인 한 유저 정보로
                planNo: createEventId(),
            },

            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                },

                initialView: 'dayGridMonth',
                // initialEvents: SHOW_EVENTS,
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
        }
    },
methods: {
    async addTodo() {
            const setPrivateYn = {
                ...this.todoRequestDto,
                privateYn: this.todoRequestDto.privateYn ? 'Y' : 'N',
            }
        try {
            await axios.post('http://localhost:8080/api/todos', setPrivateYn)
            // console.log(response.data)

            const calendarApi = this.$refs.calendar.getApi()
                calendarApi.addEvent({
                    id: createEventId(),
                    title: this.todoRequestDto.title,
                    start: this.todoRequestDto.dueDate,
                    allDay: true,
                })
            this.closeModal()
        } catch (e) {console.error(e)}
    },
    closeModal() {
        this.AddModal = false
        this.clearForm()
    },
    clearForm() {
        this.todoRequestDto = {
            title: '',
            todoCls: '',
            priority: '',
            dueDate: '',
            status: '',
            privateYn: 'Y',
            content: '',
            userNo: 1,// 나중에 로그인 한 유저 정보로
            planNo: createEventId(),
        }
    },
    handleDateSelect(selectInfo) {
        this.AddModal = true
        this.todoRequestDto.dueDate = selectInfo.startStr
    },
    handleEventClick(clickInfo) {
        this.updateModalShow = true
    },
    handleEvents(events) {
        this.currentEvents = events
    },
    },
})
</script>

<style scoped>

</style>