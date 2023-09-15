/*!
 * vue-filepond v7.0.4
 * A handy FilePond adapter component for Vue
 * 
 * Copyright (c) 2023 PQINA
 * https://pqina.nl/filepond
 * 
 * Licensed under the MIT license.
 */

import { h } from "vue";

import { OptionTypes, create, supported, registerPlugin } from "filepond";

// Methods not made available to the component
const filteredComponentMethods = [
  "setOptions",
  "on",
  "off",
  "onOnce",
  "appendTo",
  "insertAfter",
  "insertBefore",
  "isAttachedTo",
  "replaceElement",
  "restoreElement",
  "destroy",
];

// Test if is supported on this client
const isSupported = supported();

// Setup initial prop types and update when plugins are added
const getNativeConstructorFromType = (type) =>
  ({
    string: String,
    boolean: Boolean,
    array: Array,
    function: Function,
    int: Number,
    serverapi: Object,
    object: Object,
  }[type]);

// Activated props
const props = {};

// Events that need to be mapped to emitters
const events = [];

// all active instances
const instances = [];

// global options
let globalOptions = {};
export const setOptions = (options) => {
  globalOptions = Object.assign(globalOptions, options);
  instances.forEach((instance) => {
    instance.setOptions(globalOptions);
  });
};

export default (...plugins) => {
  // register plugins in FilePond
  registerPlugin(...plugins);

  // build events and props array
  events.length = 0;
  for (const prop in OptionTypes) {
    // don't add events to the props array
    if (/^on/.test(prop)) {
      events.push(prop);
      continue;
    }

    // get property type ( can be either a String or the type defined within FilePond )
    let valid_types = [String, getNativeConstructorFromType(OptionTypes[prop])];

    // labelFileProcessingError can also be Function
    if (prop == "labelFileProcessingError") {
      valid_types.push(Function);
    }

    props[prop] = {
      type: valid_types,

      // set this default value so we know which props have been explicitely set by user on component
      default: undefined,
    };
  }

  // create
  return {
    name: "FilePond",
    props,

    render() {
      // clean up undefined attributes
      const attributes = Object.entries({
        id: this.id,
        name: this.name,
        type: "file",
        class: this.className,
        required: this.required,
        multiple: this.allowMultiple,
        accept: this.acceptedFileTypes,
        capture: this.captureMethod,
      }).reduce((attributes, [key, value]) => {
        if (value !== undefined) attributes[key] = value;
        return attributes;
      }, {});

      // create base element
      return h(
        "div",
        {
          class: {
            "filepond--wrapper": true,
          },
        },
        [h("input", attributes)]
      );
    },

    created() {
      this.watchers = Object.keys(props).map((key) => {
        return this.$watch(key, (next) => {
          // if pond is not initialized, don't update
          if (!this._pond) return;
          this._pond[key] = next;
        });
      });
    },

    // Will setup FilePond instance when mounted
    mounted() {
      // exit here if not supported
      if (!isSupported) return;

      // get pond element
      this._element = this.$el.querySelector("input");

      // Map FilePond callback methods to Vue $emitters
      const options = events.reduce((obj, value) => {
        obj[value] = (...args) => {
          this.$emit("input", this._pond ? this._pond.getFiles() : []);
          this.$emit(value.substr(2), ...args);
        };
        return obj;
      }, {});

      const passedProps = {};
      Object.keys(props).forEach((key) => {
        if (this[key] === undefined) return;
        passedProps[key] = this[key];
      });

      // Create our pond
      this._pond = create(
        this._element,
        Object.assign({}, globalOptions, options, passedProps)
      );

      // Copy instance method references to component instance
      Object.keys(this._pond)
        .filter((key) => !filteredComponentMethods.includes(key))
        .forEach((key) => {
          this[key] = this._pond[key];
        });

      // Add to instances so we can apply global options when used
      instances.push(this._pond);
    },

    // Will clean up FilePond instance when unmounted
    beforeUnmount() {
      // reference to detached method
      const { detached } = this.$options;

      // no longer attached, clean up
      if (!this.$el.offsetParent) {
        detached.call(this);
        return;
      }

      // if we're still attached it's likely a transition is running, we need to
      // determine the moment when we're no longer attached to the DOM so we can
      // clean up properly
      const mutationHandler = (mutations, observer) => {
        const removedNodes = (mutations[0] || {}).removedNodes || [];
        const removedNode = removedNodes[0];
        if (!removedNode || !removedNode.contains(this.$el)) return;
        observer.disconnect();
        detached.call(this);
      };

      // start observing parent element for changes to the DOM
      const observer = new MutationObserver(mutationHandler);
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    },

    // called when the component root node has been detached
    detached() {
      this.watchers.forEach((unwatch) => unwatch());

      // exit when no pond defined
      if (!this._pond) return;

      // bye bye pond
      this._pond.destroy();

      // remove from instances
      const index = instances.indexOf(this._pond);
      if (index >= 0) {
        instances.splice(index, 1);
      }

      // clear reference
      this._pond = null;
    },
  };
};

