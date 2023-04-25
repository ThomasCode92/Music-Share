import { defineStore } from 'pinia';

export default defineStore('user', {
  stata: () => ({
    userLoggedIn: false,
  }),
});
