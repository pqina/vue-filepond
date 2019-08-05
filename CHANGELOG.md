# Changelog

## 5.1.3

- Fix FilePond detach handling


## 5.1.2

- Fix issue with 'input' event.


## 5.1.1

- Add `detached` method, the component now waits to be removed from the DOM, it then destroys the FilePond instance (the `destroyed` and `beforeDestroy` methods both run while the component is still in the DOM when using transitions).


## 5.1.0

- Add v-model support


## 5.0.0

- Update `filepond` peer dependency to match version 4.0.0
- Add example folder
