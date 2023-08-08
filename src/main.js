import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { registerSW } from 'virtual:pwa-register';

import App from './App.vue';
import './assets/base.css';
import './assets/main.css';
import 'nprogress/nprogress.css';

import GlobalComponents from './includes/_globals';
import VeeValidatePlugin from './includes/validation';
import progressBar from './includes/progress-bar';
import firebase from './includes/firebase';
import i18n from './includes/i18n';
import Icon from './directives/icon';
import router from './router';

registerSW({ immediate: true });

progressBar(router);

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
    app.use(GlobalComponents);

    app.directive('icon', Icon);

    app.mount('#app');

    vueApp = app;
  }
});
