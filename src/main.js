import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'

// bootstrap 사용
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')
