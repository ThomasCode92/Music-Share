import { defineStore } from 'pinia';

import firebase from '../includes/firebase';

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    currentUser: null,
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
    },
    async authenticate(values) {
      await firebase.signInAuthUserWithEmailAndPassword(
        values.email,
        values.password
      );

      this.userLoggedIn = true;
    },
    async signOut() {
      await firebase.singOutAuthUser();
    },
  },
});
