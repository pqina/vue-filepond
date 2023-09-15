# Changelog

## 7.0.4

- Merge #264

## 7.0.3

- Remove usage of `'__unset__'` to determine properties that haven't been set.
- Clean up base FilePond element attributes so element class doesn't contain `true` string.

## 7.0.2

- Fix build.

## 7.0.1

- Fix issue with label also accepting function.

## 7.0.0

- Vue 3 compatibility, please use v6 if you're on Vue 2. Thanks @honeymustard for the related PR.

## 6.0.3

- FilePond esm version also imports vue esm version

## 6.0.2

- Fix TypeScript issue with `vueFilePond(plugins)` call

## 6.0.1

- Fix TypeScript issue with `vueFilePond()` call

## 6.0.0

- Add TypeScript Types

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
