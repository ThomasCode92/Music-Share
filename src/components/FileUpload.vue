<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{
          'text-white bg-green-400 border-green-400 border-solid': is_dragover,
        }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="uploadFile($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="uploadFile($event)" />
      <hr class="my-6" />
      <!-- Progress Bars -->
      <div v-for="upload in uploads" :key="upload.name" class="mb-4">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';

import firebase from '../includes/firebase';
import useUserStore from '../stores/user';

export default {
  name: 'FileUpload',
  props: { addSong: { type: Function, required: true } },
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  computed: {
    ...mapState(useUserStore, ['currentUser']),
  },
  methods: {
    uploadFile($event) {
      this.is_dragover = false;

      const { files } = $event.dataTransfer
        ? $event.dataTransfer
        : $event.target;

      [...files].forEach(file => {
        if (file.type !== 'audio/mpeg') return;

        const uploadTask = firebase.uploadFile('songs', file);

        const arrayLength = this.uploads.push({
          task: uploadTask,
          current_progress: 0,
          name: file.name,
          variant: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin',
          text_class: '',
        });

        uploadTask.on(
          'state_changed',
          snapshot => {
            const { bytesTransferred, totalBytes } = snapshot;
            const progress = (bytesTransferred / totalBytes) * 100;

            const uploadIndex = arrayLength - 1;
            this.uploads[uploadIndex].current_progress = progress;
          },
          error => {
            const uploadIndex = arrayLength - 1;
            this.uploads[uploadIndex].variant = 'bg-red-400';
            this.uploads[uploadIndex].icon = 'fas fa-times';
            this.uploads[uploadIndex].text_class = 'text-red-400';

            console.log(error);
          },
          async () => {
            const song = {
              userId: this.currentUser.uid,
              display_name: this.currentUser.displayName,
              original_name: uploadTask.snapshot.ref.name,
              modified_name: uploadTask.snapshot.ref.name,
              genre: '',
              comment_count: 0,
            };

            const fileRef = uploadTask.snapshot.ref;
            const downloadUrl = await firebase.getPublicUrl(fileRef);
            song.url = downloadUrl;

            const songSnapshot = await firebase.createSongsDocument(song);
            this.addSong(songSnapshot);

            const uploadIndex = arrayLength - 1;
            this.uploads[uploadIndex].variant = 'bg-green-400';
            this.uploads[uploadIndex].icon = 'fas fa-check';
            this.uploads[uploadIndex].text_class = 'text-green-400';
          }
        );
      });
    },
    cancelUploads() {
      this.uploads.forEach(upload => {
        upload.task.cancel();
      });
    },
  },
};
</script>
