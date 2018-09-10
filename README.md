# Vue FilePond

Vue FilePond is a handy adapter component for [FilePond](https://github.com/pqina/filepond), a JavaScript library that can upload anything you throw at it, optimizes images for faster uploads, and offers a great, accessible, silky smooth user experience.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/pqina/vue-filepond/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/vue-filepond.svg)](https://www.npmjs.com/package/vue-filepond)
[![Donate with PayPal](https://img.shields.io/badge/donate-PayPal.me-pink.svg)](https://www.paypal.me/rikschennink/10)

<img src="https://github.com/pqina/filepond-github-assets/blob/master/filepond-animation-01.gif?raw=true" width="370" alt=""/>

Installation:

```bash
npm install vue-filepond --save
```

Usage:

```vue
<template>
  <div id="app">

    <file-pond
        name="test"
        ref="pond"
        label-idle="Drop files here..."
        allow-multiple="true"
        accepted-file-types="image/jpeg, image/png"
        server="/api"
        v-bind:files="myFiles"
        v-on:init="handleFilePondInit"/>

  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond';

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

export default {
    name: 'app',
    data: function() {
        return { myFiles: ['cat.jpeg'] };
    },
    methods: {
        handleFilePondInit: function() {
            console.log('FilePond has initialized');

            // FilePond instance methods are available on `this.$refs.pond`
        }
    },
    components: {
        FilePond
    }
};
</script>
```


Usage in the browser:

```html

<link rel="stylesheet" href="https://unpkg.com/filepond/dist/filepond.min.css">
<link rel="stylesheet" href="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css">

<script src="https://unpkg.com/filepond-plugin-image-preview"></script>
<script src="https://unpkg.com/filepond"></script>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-filepond"></script>

<div id="app">
    <file-pond></file-pond>
</div>

<script>
new Vue({
    el: '#app',
    components: {
        FilePond: vueFilePond.default(FilePondPluginImagePreview)
    }
})
</script>

```


[Read the docs for more information](https://pqina.nl/filepond/docs/patterns/frameworks/vue/)
