<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <file-upload ref="upload" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, idx) in songs"
              :key="song.docId"
              :song="song"
              :update-song="updateSong"
              :index="idx"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'pinia';

import FileUpload from '../components/FileUpload.vue';
import CompositionItem from '../components/CompositionItem.vue';

import firebase from '../includes/firebase';
import useUserStore from '../stores/user';

export default {
  name: 'ManageMusic',
  components: { FileUpload, CompositionItem },
  beforeRouteLeave(to, from, next) {
    this.$refs.upload.cancelUploads();
    next();
  },
  data() {
    return {
      songs: [],
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser']),
  },
  async created() {
    const querySnapshot = await firebase.getUserSongs(this.currentUser.uid);

    querySnapshot.forEach(doc => {
      const data = doc.data();
      const song = { docId: doc.id, ...data };

      this.songs.push(song);
    });
  },
  methods: {
    updateSong(idx, values) {
      this.songs[idx].modified_name = values.modified_name;
      this.songs[idx].genre = values.genre;
    },
  },
};
</script>
