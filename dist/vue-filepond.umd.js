(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("filepond"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["filepond", "vue"], factory);
	else if(typeof exports === 'object')
		exports["vue-filepond"] = factory(require("filepond"), require("vue"));
	else
		root["vue-filepond"] = factory(root["filepond"], root["vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__1d78__, __WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1d78":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1d78__;

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "setOptions", function() { return /* reexport */ setOptions; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__("8bbf");

// EXTERNAL MODULE: external "filepond"
var external_filepond_ = __webpack_require__("1d78");

// CONCATENATED MODULE: ./lib/index.js

 // Methods not made available to the component

const filteredComponentMethods = ['setOptions', 'on', 'off', 'onOnce', 'appendTo', 'insertAfter', 'insertBefore', 'isAttachedTo', 'replaceElement', 'restoreElement', 'destroy']; // Test if is supported on this client

const isSupported = Object(external_filepond_["supported"])(); // Setup initial prop types and update when plugins are added

const getNativeConstructorFromType = type => ({
  string: String,
  boolean: Boolean,
  array: Array,
  function: Function,
  int: Number,
  serverapi: Object,
  object: Object
})[type]; // Activated props


const lib_props = {}; // Events that need to be mapped to emitters

const events = []; // all active instances

const instances = []; // global options

let globalOptions = {};
const setOptions = options => {
  globalOptions = Object.assign(globalOptions, options);
  instances.forEach(instance => {
    instance.setOptions(globalOptions);
  });
};
/* harmony default export */ var lib = ((...plugins) => {
  // register plugins in FilePond
  Object(external_filepond_["registerPlugin"])(...plugins); // build events and props array

  events.length = 0;

  for (const prop in external_filepond_["OptionTypes"]) {
    // don't add events to the props array
    if (/^on/.test(prop)) {
      events.push(prop);
      continue;
    } // get property type ( can be either a String or the type defined within FilePond )


    lib_props[prop] = {
      type: [String, getNativeConstructorFromType(external_filepond_["OptionTypes"][prop])],
      default: '__undefined__'
    };
  } // create 


  return Object(external_vue_["defineComponent"])({
    name: 'FilePond',
    props: lib_props,

    setup(props, {
      emit,
      attrs
    }) {
      const root = Object(external_vue_["ref"])(null);
      let pond = null; // Will setup FilePond instance when mounted

      Object(external_vue_["onMounted"])(() => {
        // exit here if not supported
        if (!isSupported) return; // get pond element

        const element = root.value.querySelector('input'); // Map FilePond callback methods to Vue $emitters

        const methods = events.reduce((obj, value) => {
          obj[value] = (...args) => {
            emit('input', pond ? pond.getFiles() : []);
            emit(value.substr(2), ...args);
          };

          return obj;
        }, {});
        const options = Object(external_filepond_["getOptions"])();
        const userProps = {};

        for (const prop in props) {
          if (props[prop] !== '__undefined__') {
            userProps[prop] = props[prop];
          }
        }

        const userAttrs = {};

        for (const attr in attrs) {
          const name = attr.toLocaleLowerCase();

          if (name.indexOf('on') === 0 && name !== 'oninit') {
            userAttrs[name] = attrs[attr];
          }
        }

        const filePondOptions = { ...globalOptions,
          ...methods,
          ...options,
          ...userProps,
          ...userAttrs
        }; // Create our pond

        pond = Object(external_filepond_["create"])(element, filePondOptions); // Copy instance method references to component instance

        Object.keys(pond).filter(key => !filteredComponentMethods.includes(key)).forEach(key => root.value[key] = pond[key]); // Add to instances so we can apply global options when used

        instances.push(pond);
        emit('init', pond);
      }); // called when the component root node has been detached

      const detached = () => {
        // exit when no pond defined
        if (!pond.value) return; // bye bye pond

        pond.value.destroy(); // remove from instances

        const index = instances.indexOf(pond.value);
        if (index >= 0) instances.splice(index, 1); // clear reference

        pond.value = null;
      }; // Will clean up FilePond instance when unmounted


      Object(external_vue_["onUnmounted"])(() => {
        // no longer attached, clean up
        if (root.value && !root.value.offsetParent) {
          detached();
          return;
        } // if we're still attached it's likely a transition is running, we need to 
        // determine the moment when we're no longer attached to the DOM so we can 
        // clean up properly


        if (root.value !== null) {
          const mutationHandler = (mutations, observer) => {
            const removedNodes = (mutations[0] || {}).removedNodes || [];
            const removedNode = removedNodes[0];
            if (!removedNode || !removedNode.contains(root.value)) return;
            observer.disconnect();
            detached();
          }; // start observing parent element for changes to the DOM


          const observer = new MutationObserver(mutationHandler);
          observer.observe(document.documentElement, {
            childList: true,
            subtree: true
          });
        }
      });
      return () => Object(external_vue_["h"])('div', {
        ref: root,
        'class': {
          'filepond--wrapper': true
        }
      }, [Object(external_vue_["h"])('input', {
        id: props.id,
        name: props.name,
        type: 'file',
        'class': props.className,
        required: props.required,
        multiple: props.allowMultiple,
        accept: props.acceptedFileTypes,
        capture: props.captureMethod
      })]);
    }

  });
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (lib);



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue-filepond.umd.js.map