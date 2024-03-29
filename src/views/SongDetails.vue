<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          id="play-btn"
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          @click.prevent="playSong"
        >
          <i
            class="fas"
            :class="{ 'fa-play': !playing, 'fa-pause': playing }"
          ></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(1.99, 'currency') }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section id="comments" class="container mx-auto mt-6">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $tc('song.comment_count', { count: song.comment_count })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            v-if="comment_show_alert"
            class="text-white text-center font-bold p-4 mb-4"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form
            v-if="userLoggedIn"
            :validation-schema="schema"
            @submit="addComment"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage name="comment" class="text-red-600" />
            <button
              type="submit"
              :disabled="comment_in_submission"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.id"
        class="p-6 bg-gray-50 border border-gray-200"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia';

import firebase from '../includes/firebase';
import useUserStore from '../stores/user';
import usePlayerStore from '../stores/player';

export default {
  name: 'SongDetails',
  async beforeRouteEnter(to, from, next) {
    const songDoc = await firebase.getSong(to.params.id);

    next(vm => {
      if (!songDoc.exists()) {
        return vm.$router.push({ name: 'home' });
      }

      const { sort } = vm.$route.query;
      vm.sort = sort === '1' || sort === '2' ? sort : '1';

      const song = songDoc.data();
      vm.song = song;

      vm.getComments();
    });
  },
  data() {
    return {
      song: {},
      comments: [],
      sort: '1',
      schema: {
        comment: 'required|min:3',
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_message: 'Please wait! Your comment is being submitted.',
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser', 'userLoggedIn']),
    ...mapState(usePlayerStore, ['current_song', 'playing']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }

        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  watch: {
    sort(newValue) {
      const { sort } = this.$route.query;
      if (newValue === sort) return;

      this.$router.push({
        query: { sort: newValue },
      });
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong', 'toggleAudio']),
    playSong() {
      !this.current_song.modified_name
        ? this.newSong(this.song)
        : this.toggleAudio();
    },
    async addComment(values, context) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = 'bg-blue-500';
      this.comment_alert_message =
        'Please wait! Your comment is being submitted.';

      const comment = {
        content: values.comment,
        datePosted: new Date().toString(),
        songId: this.$route.params.id,
        name: this.currentUser.displayName,
        userId: this.currentUser.uid,
      };

      await firebase.createCommentDocument(comment);

      this.getComments();
      this.song.comment_count += 1;

      await firebase.updateCommentCount(
        this.$route.params.id,
        this.song.comment_count
      );

      this.comment_in_submission = false;
      this.comment_alert_variant = 'bg-green-500';
      this.comment_alert_message = 'Comment added!';

      context.resetForm();
    },
    async getComments() {
      const songId = this.$route.params.id;
      const commentSnapshots = await firebase.getSongComments(songId);

      this.comments = [];

      commentSnapshots.forEach(doc =>
        this.comments.push({ id: doc.id, ...doc.data() })
      );
    },
  },
};
</script>
