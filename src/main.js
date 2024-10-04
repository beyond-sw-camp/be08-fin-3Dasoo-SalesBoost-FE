import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './style.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

loadFonts()

const pinia = createPinia();
const app = createApp(App);

app.use(router)
app.use(pinia)
app.use(vuetify)
app.mount('#app')