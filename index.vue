/*
 * Vue FilePond 1.0.0
 * Licensed under MIT, https://opensource.org/licenses/MIT
 * Please visit https://pqina.nl/filepond for details.
 */
<template>
<div class="filepond--wrapper">
    <input type="file" 
        :name="name"
        :id="id"
        :class="className"
        :required="required"
        :multiple="allowMultiple"
        :accept="acceptedFileTypes"
        :capture="captureMethod"/>
</div>
</template>
<script>
import {
    OptionTypes,
    create,
    supported,
    registerPlugin as register
} from 'filepond';
import 'filepond/dist/filepond.min.css';

// Methods not made available to the component
const filteredComponentMethods = [
    'setOptions',
    'on',
    'off',
    'onOnce',
    'appendTo',
    'insertAfter',
    'insertBefore',
    'isAttachedTo',
    'replaceElement',
    'restoreElement',
    'destroy'
];

// Do this once
const isSupported = supported();

// Setup initial prop types and update when plugins are added
const getNativeConstructorFromType = type =>
    ({
        string: String,
        boolean: Boolean,
        array: Array,
        function: Function,
        int: Number,
        serverapi: Object
    }[type]);

// All the props
const props = {
    id: String
};

// All the events that need to be mapped to emitters
const events = [];

// Props to watch
const watch = {};

const update = () => {
    events.length = 0;
    for (const prop in OptionTypes) {
        // don't add events to the props array
        if (/^on/.test(prop)) {
            events.push(prop);
            continue;
        }

        // get property type
        props[prop] = [String, getNativeConstructorFromType(OptionTypes[prop])];

        // setup watcher
        watch[prop] = function(value) {
            this._pond[prop] = value;
        };
    }
};

// get initial props
update();

// We need to be able to call the registerPlugin method directly so we can add plugins
export const registerPlugin = (...plugins) => {
    // register plugins in FilePond
    register(...plugins);

    // update props
    update();
};

// Create Component
export default {
    name: 'FilePond',
    props,
    watch,

    // Will setup FilePond instance when mounted
    mounted: function() {
        // exit here if not supported
        if (!isSupported) {
            return;
        }

        // get pond element
        this._element = this.$el.querySelector('input');

        // Map FilePond callback methods to Vue $emitters
        const options = events.reduce((obj, value) => {
            obj[value] = (...args) => {
                this.$emit(value.substr(2), ...args);
            };
            return obj;
        }, {});

        // Create our pond
        this._pond = create(
            this._element,
            Object.assign(options, this.$options.propsData)
        );

        // Copy instance method references to component instance
        Object.keys(this._pond)
            .filter(key => !filteredComponentMethods.includes(key))
            .forEach(key => {
                this[key] = this._pond[key];
            });
    },

    // Will clean up FilePond instance when unmounted
    beforeDestroy: function() {
        // exit when no pond defined
        if (!this._pond) {
            return;
        }

        this._pond.destroy();
    }
};
</script>