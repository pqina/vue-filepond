/*!
 * vue-filepond v7.0.4
 * A handy FilePond adapter component for Vue
 * 
 * Copyright (c) 2023 PQINA
 * https://pqina.nl/filepond
 * 
 * Licensed under the MIT license.
 */

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("vueFilePond", ["exports", "vue", "filepond"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("vue"), require("filepond"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Vue, global.FilePond);
    global.vueFilePond = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _vue, _filepond) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.setOptions = void 0;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  // Methods not made available to the component
  var filteredComponentMethods = ["setOptions", "on", "off", "onOnce", "appendTo", "insertAfter", "insertBefore", "isAttachedTo", "replaceElement", "restoreElement", "destroy"]; // Test if is supported on this client

  var isSupported = (0, _filepond.supported)(); // Setup initial prop types and update when plugins are added

  var getNativeConstructorFromType = function getNativeConstructorFromType(type) {
    return {
      string: String,
      boolean: Boolean,
      array: Array,
      function: Function,
      int: Number,
      serverapi: Object,
      object: Object
    }[type];
  }; // Activated props


  var props = {}; // Events that need to be mapped to emitters

  var events = []; // all active instances

  var instances = []; // global options

  var globalOptions = {};

  var setOptions = function setOptions(options) {
    globalOptions = Object.assign(globalOptions, options);
    instances.forEach(function (instance) {
      instance.setOptions(globalOptions);
    });
  };

  _exports.setOptions = setOptions;

  var _default = function _default() {
    // register plugins in FilePond
    _filepond.registerPlugin.apply(void 0, arguments); // build events and props array


    events.length = 0;

    for (var prop in _filepond.OptionTypes) {
      // don't add events to the props array
      if (/^on/.test(prop)) {
        events.push(prop);
        continue;
      } // get property type ( can be either a String or the type defined within FilePond )


      var valid_types = [String, getNativeConstructorFromType(_filepond.OptionTypes[prop])]; // labelFileProcessingError can also be Function

      if (prop == "labelFileProcessingError") {
        valid_types.push(Function);
      }

      props[prop] = {
        type: valid_types,
        // set this default value so we know which props have been explicitely set by user on component
        default: undefined
      };
    } // create


    return {
      name: "FilePond",
      props: props,
      render: function render() {
        // clean up undefined attributes
        var attributes = Object.entries({
          id: this.id,
          name: this.name,
          type: "file",
          class: this.className,
          required: this.required,
          multiple: this.allowMultiple,
          accept: this.acceptedFileTypes,
          capture: this.captureMethod
        }).reduce(function (attributes, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          if (value !== undefined) attributes[key] = value;
          return attributes;
        }, {}); // create base element

        return (0, _vue.h)("div", {
          class: {
            "filepond--wrapper": true
          }
        }, [(0, _vue.h)("input", attributes)]);
      },
      created: function created() {
        var _this = this;

        this.watchers = Object.keys(props).map(function (key) {
          return _this.$watch(key, function (next) {
            // if pond is not initialized, don't update
            if (!_this._pond) return;
            _this._pond[key] = next;
          });
        });
      },
      // Will setup FilePond instance when mounted
      mounted: function mounted() {
        var _this2 = this;

        // exit here if not supported
        if (!isSupported) return; // get pond element

        this._element = this.$el.querySelector("input"); // Map FilePond callback methods to Vue $emitters

        var options = events.reduce(function (obj, value) {
          obj[value] = function () {
            _this2.$emit("input", _this2._pond ? _this2._pond.getFiles() : []);

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this2.$emit.apply(_this2, [value.substr(2)].concat(args));
          };

          return obj;
        }, {});
        var passedProps = {};
        Object.keys(props).forEach(function (key) {
          if (_this2[key] === undefined) return;
          passedProps[key] = _this2[key];
        }); // Create our pond

        this._pond = (0, _filepond.create)(this._element, Object.assign({}, globalOptions, options, passedProps)); // Copy instance method references to component instance

        Object.keys(this._pond).filter(function (key) {
          return !filteredComponentMethods.includes(key);
        }).forEach(function (key) {
          _this2[key] = _this2._pond[key];
        }); // Add to instances so we can apply global options when used

        instances.push(this._pond);
      },
      // Will clean up FilePond instance when unmounted
      beforeUnmount: function beforeUnmount() {
        var _this3 = this;

        // reference to detached method
        var detached = this.$options.detached; // no longer attached, clean up

        if (!this.$el.offsetParent) {
          detached.call(this);
          return;
        } // if we're still attached it's likely a transition is running, we need to
        // determine the moment when we're no longer attached to the DOM so we can
        // clean up properly


        var mutationHandler = function mutationHandler(mutations, observer) {
          var removedNodes = (mutations[0] || {}).removedNodes || [];
          var removedNode = removedNodes[0];
          if (!removedNode || !removedNode.contains(_this3.$el)) return;
          observer.disconnect();
          detached.call(_this3);
        }; // start observing parent element for changes to the DOM


        var observer = new MutationObserver(mutationHandler);
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      },
      // called when the component root node has been detached
      detached: function detached() {
        this.watchers.forEach(function (unwatch) {
          return unwatch();
        }); // exit when no pond defined

        if (!this._pond) return; // bye bye pond

        this._pond.destroy(); // remove from instances


        var index = instances.indexOf(this._pond);

        if (index >= 0) {
          instances.splice(index, 1);
        } // clear reference


        this._pond = null;
      }
    };
  };

  _exports.default = _default;
});


