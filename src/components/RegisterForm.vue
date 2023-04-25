<template>
  <!-- Registration Alert -->
  <div
    v-if="registration_show_alert"
    class="text-white text center font-bold p-4 rounded mb-4"
    :class="registration_alert_variant"
  >
    {{ registration_alert_message }}
  </div>
  <!-- Registration Form -->
  <vee-form
    :validation-schema="schema"
    :initial-values="userData"
    @submit="register"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field v-slot="{ field, errors }" name="password" :bails="false">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div v-for="error in errors" :key="error" class="text-red-600">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <!-- Submit Button -->
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="registration_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapWritableState } from 'pinia';

import firebase from '../includes/firebase';
import useUserStore from '../stores/user';

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:99',
        password: 'required|min:9|max:100|not_one_of:password',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|not_one_of_country:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      registration_in_submission: false,
      registration_show_alert: false,
      registration_alert_variant: 'bg-blue-500',
      registration_alert_message: 'Please wait! Your account is being created.',
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },
  methods: {
    async register(values) {
      this.registration_show_alert = true;
      this.registration_in_submission = true;
      this.registration_alert_variant = 'bg-blue-500';
      this.registration_alert_message =
        'Please wait! Your account is being created.';

      let userCredentials;

      try {
        userCredentials = await firebase.createAuthUserWithEmailAndPassword(
          values.email,
          values.password
        );
      } catch (error) {
        this.registration_in_submission = false;
        this.registration_alert_variant = 'bg-red-500';
        this.registration_alert_message =
          'An unexpected error occured! Please try again later.';

        return;
      }

      try {
        firebase.createUserDocument({
          id: userCredentials.user.uid,
          name: values.name,
          email: values.email,
          age: values.age,
          country: values.country,
        });
      } catch (error) {
        this.registration_in_submission = false;
        this.registration_alert_variant = 'bg-red-500';
        this.registration_alert_message =
          'An unexpected error occured! Please try again later.';

        return;
      }

      this.userLoggedIn = true;

      this.registration_alert_variant = 'bg-green-500';
      this.registration_alert_message =
        'Success! Your account has been created.';

      console.log('credentials', userCredentials);
      console.log('userLoggedIn', useUserStore.userLoggedIn);
    },
  },
};
</script>
