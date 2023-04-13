import { Field as VeeField, Form as VeeForm, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);

    defineRule('required', required);
  },
};
