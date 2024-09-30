import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import ExcelTest from '../pages/ExcelTest.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/excel', component: ExcelTest },
  ],
});

export default router;
