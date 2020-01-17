/*!
 * vue-filepond v6.0.2
 * A handy FilePond adapter component for Vue
 * 
 * Copyright (c) 2020 PQINA
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
  _vue = _interopRequireDefault(_vue);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // Methods not made available to the component
  var filteredComponentMethods = ['setOptions', 'on', 'off', 'onOnce', 'appendTo', 'insertAfter', 'insertBefore', 'isAttachedTo', 'replaceElement', 'restoreElement', 'destroy']; // Test if is supported on this client

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

  var events = []; // Props to watch

  var watch = {}; // all active instances

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

    var _loop = function _loop(prop) {
      // don't add events to the props array
      if (/^on/.test(prop)) {
        events.push(prop);
        return "continue";
      } // get property type ( can be either a String or the type defined within FilePond )


      props[prop] = [String, getNativeConstructorFromType(_filepond.OptionTypes[prop])]; // setup watcher

      watch[prop] = function (value) {
        this._pond[prop] = value;
      };
    };

    for (var prop in _filepond.OptionTypes) {
      var _ret = _loop(prop);

      if (_ret === "continue") continue;
    } // create 


    return _vue.default.component('FilePond', {
      name: 'FilePond',
      props: props,
      watch: watch,
      render: function render(h) {
        return h('div', {
          'class': {
            'filepond--wrapper': true
          }
        }, [h('input', {
          attrs: {
            id: this.id,
            name: this.name,
            type: 'file',
            'class': this.className,
            required: this.required,
            multiple: this.allowMultiple,
            accept: this.acceptedFileTypes,
            capture: this.captureMethod
          }
        })]);
      },
      // Will setup FilePond instance when mounted
      mounted: function mounted() {
        var _this = this;

        // exit here if not supported
        if (!isSupported) {
          return;
        } // get pond element


        this._element = this.$el.querySelector('input'); // Map FilePond callback methods to Vue $emitters

        var options = events.reduce(function (obj, value) {
          obj[value] = function () {
            _this.$emit('input', _this._pond ? _this._pond.getFiles() : []);

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this.$emit.apply(_this, [value.substr(2)].concat(args));
          };

          return obj;
        }, {}); // Scoop up attributes that might not have been caught by Vue ( because the props object is extended dynamically )

        var attrs = Object.assign({}, this.$attrs); // Create our pond

        this._pond = (0, _filepond.create)(this._element, Object.assign({}, globalOptions, options, attrs, this.$options.propsData)); // Copy instance method references to component instance

        Object.keys(this._pond).filter(function (key) {
          return !filteredComponentMethods.includes(key);
        }).forEach(function (key) {
          _this[key] = _this._pond[key];
        }); // Add to instances so we can apply global options when used

        instances.push(this._pond);
      },
      // Will clean up FilePond instance when unmounted
      destroyed: function destroyed() {
        var _this2 = this;

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
          if (!removedNode || !removedNode.contains(_this2.$el)) return;
          observer.disconnect();
          detached.call(_this2);
        }; // start observing parent element for changes to the DOM


        var observer = new MutationObserver(mutationHandler);
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      },
      // called when the component root node has been detached
      detached: function detached() {
        // exit when no pond defined
        if (!this._pond) return; // bye bye pond

        this._pond.destroy(); // remove from instances


        var index = instances.indexOf(this._pond);

        if (index >= 0) {
          instances.splice(index, 1);
        } // clear reference


        this._pond = null;
      }
    });
  };

  _exports.default = _default;
});


