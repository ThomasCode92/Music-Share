import { Field as VeeField, Form as VeeForm } from 'vee-validate';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
  },
};
