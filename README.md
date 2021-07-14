# Vue FilePond

Vue FilePond is a handy adapter component for [FilePond](https://github.com/pqina/filepond), a JavaScript library that can upload anything you throw at it, optimizes images for faster uploads, and offers a great, accessible, silky smooth user experience.

**If you want to use Vue FilePond with Vue 2, please use v6 of this plugin.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/pqina/vue-filepond/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/vue-filepond.svg)](https://www.npmjs.com/package/vue-filepond)
![npm](https://img.shields.io/npm/dt/vue-filepond)

---

[<img src="https://github.com/pqina/filepond-github-assets/blob/master/header.svg" alt="FilePond"/>](https://www.buymeacoffee.com/rikschennink/)

[Buy me a Coffee](https://www.buymeacoffee.com/rikschennink/) / [Use FilePond with Pintura](https://pqina.nl/pintura/?ref=github-filepond) / [Dev updates on Twitter](https://twitter.com/rikschennink/)

---


### Core Features

- Accepts **directories**, **files**, blobs, local URLs, **remote URLs** and Data URIs.
- **Drop files**, select on filesystem, **copy and paste files**, or add files using the API.
- **Async uploading** with AJAX, or encode files as base64 data and send along form post.
- **Accessible**, tested with AT software like VoiceOver and JAWS, **navigable by Keyboard**.
- **Image optimization**, automatic image resizing, **cropping**, and **fixes EXIF orientation**.
- **Responsive**, automatically scales to available space, is functional on both **mobile and desktop devices**.

[Learn more about FilePond](https://pqina.nl/filepond/)

<img src="https://github.com/pqina/filepond-github-assets/blob/master/filepond-animation-01.gif?raw=true" width="370" alt=""/>

---

### Also need Image Editing?

**Pintura the modern JavaScript Image Editor** is what you're looking for. Pintura supports setting **crop aspect ratios**, **resizing**, **rotating**, **cropping**, and **flipping** images. Above all, it integrates beautifully with FilePond.

[Learn more about Pintura](https://pqina.nl/pintura/?ref=github-vue-filepond)

<img src="https://github.com/pqina/filepond-github-assets/blob/master/filepond_pintura.gif?raw=true" width="600" alt=""/>

---

Installation:

**If you're using Vue 2 please run `npm install vue-filepond@^6.0.0`**

```bash
npm install vue-filepond filepond
```

Usage:

```vue
<template>
  <div id="app">
    <file-pond
      name="test"
      ref="pond"
      label-idle="Drop files here..."
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      server="/api"
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

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "app",
  data: function () {
    return { myFiles: ["cat.jpeg"] };
  },
  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");

      // FilePond instance methods are available on `this.$refs.pond`
    },
  },
  components: {
    FilePond,
  },
};
</script>
```

When using FilePond with an SSR configuration like Nuxt.js it's best to wrap it in `<no-ssr>` tags.

```vue
<template>
  <no-ssr>
    <file-pond />
  </no-ssr>
</template>
```

Usage in the browser:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Vue in Browser</title>

    <link
      rel="stylesheet"
      href="https://unpkg.com/filepond/dist/filepond.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"
    />
  </head>
  <body>
    <div id="app">
      <file-pond></file-pond>
    </div>

    <script src="https://unpkg.com/filepond-plugin-image-preview"></script>
    <script src="https://unpkg.com/filepond"></script>
    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/vue-filepond@6"></script>

    <script>
      new Vue({
        el: "#app",
        components: {
          FilePond: vueFilePond.default(FilePondPluginImagePreview),
        },
      });
    </script>
  </body>
</html>
```

[Read the docs for more information](https://pqina.nl/filepond/docs/patterns/frameworks/vue/)

[Live Demo with Code Sandbox](https://codesandbox.io/s/p3v8zoprp7)
