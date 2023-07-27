import { defineStore } from 'pinia';
import { Howl } from 'howler';

import { formatTime } from '../utils/format-time';

export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
  }),
  getters: {
    playing: state => {
      if (!state.sound.playing) return false;

      return state.sound.playing();
    },
  },
  actions: {
    async newSong(song) {
      this.current_song = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      this.sound.play();
      this.sound.on('play', () => {
        requestAnimationFrame(this.progress);
      });
    },
    async toggleAudio() {
      if (!this.sound.playing) return;

      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    progress() {
      this.seek = formatTime(this.sound.seek());
      this.duration = formatTime(this.sound.duration());

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
  },
});
