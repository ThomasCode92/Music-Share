<template>
  <app-header />
  <router-view></router-view>
  <music-player />
  <app-auth />
</template>

<script>
import { mapWritableState } from 'pinia';

import AppHeader from './components/AppHeader.vue';
import AppAuth from './components/AppAuth.vue';
import MusicPlayer from './components/MusicPlayer.vue';

import firebase from './includes/firebase';
import useUserStore from './stores/user';

export default {
  name: 'App',
  components: { AppHeader, AppAuth, MusicPlayer },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn', 'currentUser']),
  },
  created() {
    firebase.onAuthStateChangedListener(userImpl => {
      console.log(userImpl);

      if (userImpl) {
        this.userLoggedIn = true;
        this.currentUser = userImpl.auth.currentUser;
      } else {
        this.userLoggedIn = false;
        this.currentUser = null;
      }
    });
  },
};
</script>

<style></style>
