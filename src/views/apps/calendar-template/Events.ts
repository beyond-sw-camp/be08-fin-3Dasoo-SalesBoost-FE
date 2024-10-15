import type { EventInput } from '@fullcalendar/core'

let eventGuid = 0

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();


export const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: 'Twice event For two Days',
        allDay: true,
        start: new Date(y, m, 3),
        end: new Date(y, m, 5),
        color: '#615dff',
      },
      {
        id: createEventId(),
        title: 'Learn ReactJs',
        start: new Date(y, m, d + 3, 10, 30),
        end: new Date(y, m, d + 3, 11, 30),
        allDay: true,
        color: '#39b69a',
      },
      {
        id: createEventId(),
        title: 'Launching MaterialArt Angular',
        start: new Date(y, m, d + 7, 12, 0),
        end: new Date(y, m, d + 7, 14, 0),
        allDay: true,
        color: '#fc4b6c',
      },
      {
        id: createEventId(),
        title: 'Lunch with Mr.Raw',
        start: new Date(y, m, d - 2),
        end: new Date(y, m, d - 2),
        allDay: true,
        color: '#1a97f5',
      },
      {
        id: createEventId(),
        title: 'Going For Party of Sahs',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: true,
        color: '#1a97f5',
      },
      {
        id: createEventId(),
        title: 'Learn Ionic',
        start: new Date(y, m, 23),
        end: new Date(y, m, 25),
        color: '#fdd43f',
      },
      {
        id: createEventId(),
        title: 'Research of making own Browser',
        start: new Date(y, m, 19),
        end: new Date(y, m, 22),
        color: '615dff',
      },
]

export function createEventId() {
  return String(eventGuid++)
}