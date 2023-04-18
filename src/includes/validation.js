import {
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm,
  defineRule,
} from 'vee-validate';
import {
  alpha_spaces,
  confirmed,
  email,
  max,
  max_value,
  min,
  min_value,
  not_one_of,
  required,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alpha_spaces);
    defineRule('email', email);
    defineRule('min_value', min_value);
    defineRule('max_value', max_value);
    defineRule('confirmed', confirmed);
    defineRule('not_one_of', not_one_of);
  },
};
