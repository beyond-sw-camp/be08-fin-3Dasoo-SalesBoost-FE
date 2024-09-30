import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/router';
import axios from 'axios';

const app = createApp(App);

app.use(router);

app.config.globalProperties.$axios = axios;

app.mount('#app');
