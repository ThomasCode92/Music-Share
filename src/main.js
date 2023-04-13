import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import './assets/base.css';
import './assets/main.css';

import VeeValidatePlugin from './includes/validation';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VeeValidatePlugin);

app.mount('#app');
