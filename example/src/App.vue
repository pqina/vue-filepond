<template>
  <div id="app">
    <file-pond
      name="test"
      label-idle="Drop files here..."
      :allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      :server="myServer"
      :files="myFiles"
      @init="handleFilePondInit">
    </file-pond>
  </div>
</template>

<script>
import vueFilePond from '../lib/vue-filepond.js';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    FilePond,
  },
  setup() {
    const myFiles = [];

    const myServer = {
      process: (fieldName, file, metadata, load) => {
        // simulates uploading a file
        setTimeout(() => {
          load(Date.now())
        }, 1500);
      },
      load: (source, load) => {
        // simulates loading a file from the server
        fetch(source).then(res => res.blob()).then(load);
      }
    };

   // FilePond instance methods are available on `pond`
    const handleFilePondInit = (pond) => {
      /* eslint-disable */
      console.log('FilePond has initialized');
      setTimeout(() => pond.addFile('logo.png'), 4000);
    };

    return { myFiles, myServer, handleFilePondInit };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 400px;
  margin: 60px auto;
}
</style>