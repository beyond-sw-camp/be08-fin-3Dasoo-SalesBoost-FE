import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/main/MainView.vue';
import LoginView from '../views/auth/LoginView.vue';
import SignUpView from '../views/auth/SignUpView.vue';
import CalendarView from '../views/calendar/CalendarView.vue';
import NotFoundView from '../views/NotFoundView.vue';


const routes = [
    {
        path: "/",
        name: 'Main',
        component: MainView
    },
    {
        path: "/login",
        name: 'Login',
        component: LoginView
    },

    {
        path: "/signup",
        name: 'Signup',
        component: SignUpView
    },
 
    {
        path: "/calendar",
        name: 'Calendar',
        component: CalendarView
    },

    { 
        path: '/:pathMatch(.*)*', 
        name: "NotFound", 
        component: NotFoundView 
    },


];


const router = createRouter({
    history: createWebHistory("/"),
    routes: routes,
});

export default router;