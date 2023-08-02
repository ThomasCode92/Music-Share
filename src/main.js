import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import './assets/base.css';
import './assets/main.css';

import VeeValidatePlugin from './includes/validation';
import firebase from './includes/firebase';
import i18n from './includes/i18n';
import Icon from './directives/icon';
import router from './router';

let vueApp;

// Initializing Firebase before Vue
firebase.onAuthStateChangedListener(() => {
  if (!vueApp) {
    const app = createApp(App);
    const pinia = createPinia();

    app.use(pinia);
    app.use(VeeValidatePlugin);
    app.use(router);
    app.use(i18n);

    app.directive('icon', Icon);

    app.mount('#app');

    vueApp = app;
  }
});
