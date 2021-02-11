<template>
  <div id="component">
    <file-pond
      name="test"
      ref="pond"
      allow-multiple="true"
      v-bind:server="myServer"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
    />
  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation filepond-plugin-file-validate-type --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);

export default {
  name: "HelloWorld",
  data: function() {
    return {
      // fake server to simulate loading a 'local' server file and processing a file
      myServer: {
        process: (fieldName, file, metadata, load) => {
          // simulates uploading a file
          setTimeout(() => {
            load(Date.now());
          }, 1500);
        },
        load: (source, load) => {
          // simulates loading a file from the server
          fetch(source)
            .then((res) => res.blob())
            .then(load);
        },
      },
      myFiles: [
        {
          source: "photo.jpeg",
          options: {
            type: "local",
          },
        },
      ],
    };
  },
  methods: {
    handleFilePondInit: function() {
      // FilePond instance methods are available on `this.$refs.pond`

      /* eslint-disable */
      console.log("FilePond has initialized");
    },
  },
  components: {
    FilePond,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
