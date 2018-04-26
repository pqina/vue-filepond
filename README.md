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

For browser:

```html
<script src="https://unpkg.com/vue-filepond"></script>
```

Usage:

```vue
<template>
  <div id="app">

    <FilePond
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
import FilePond, { registerPlugin } from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Register file type validation plugin
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginFileValidateType);

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

[Read the docs for more information](https://pqina.nl/filepond/docs/patterns/frameworks/vue/)
