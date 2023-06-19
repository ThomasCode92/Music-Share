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
      <hr class="my-6" />
      <!-- Progress Bars -->
      <div v-for="upload in uploads" :key="upload.name" class="mb-4">
        <!-- File Name -->
        <div class="font-bold text-sm">{{ upload.name }}</div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar bg-blue-400"
            :class="'bg-blue-400'"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../includes/firebase';

export default {
  name: 'FileUpload',
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  methods: {
    uploadFile($event) {
      this.is_dragover = false;
      console.log('File dropped');

      const { files } = $event.dataTransfer;
      const filesArray = [...files];

      filesArray.forEach(file => {
        if (file.type !== 'audio/mpeg') return;

        const uploadTask = firebase.uploadFile('songs', file);
        console.log('Uploading a File');

        this.uploads.push({
          task: uploadTask,
          current_progress: 0,
          name: file.name,
        });

        uploadTask.on('state_changed', snapshot => {
          const { bytesTransferred, totalBytes } = snapshot;
          const progress = (bytesTransferred / totalBytes) * 100;

          console.log(snapshot);
          console.log(progress);
        });
      });
    },
  },
};
</script>
