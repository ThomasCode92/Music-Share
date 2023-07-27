<template>
  <main-header />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <music-player />
  <auth-modal />
</template>

<script>
import { mapWritableState } from 'pinia';

import MainHeader from './components/MainHeader.vue';
import AuthModal from './components/AuthModal.vue';
import MusicPlayer from './components/MusicPlayer.vue';

import firebase from './includes/firebase';
import useUserStore from './stores/user';

export default {
  name: 'App',
  components: { MainHeader, AuthModal, MusicPlayer },
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

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0s linear;
  opacity: 0;
}
</style>
