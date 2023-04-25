import { defineStore } from 'pinia';

import firebase from '../includes/firebase';

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const { user } = await firebase.createAuthUserWithEmailAndPassword(
        values.email,
        values.password
      );

      await firebase.createUserDocument({
        id: user.uid,
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      await firebase.updateUserProfile(values.name);

      this.userLoggedIn = true;
    },
  },
});
