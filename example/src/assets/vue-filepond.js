/*!
 * vue-filepond v6.0.3
 * A handy FilePond adapter component for Vue
 * 
 * Copyright (c) 2021 PQINA
 * https://pqina.nl/filepond
 * 
 * Licensed under the MIT license.
 */

import { defineComponent, onUnmounted, onMounted, ref, h } from 'vue';
import {
    getOptions,
    OptionTypes,
    create,
    supported,
    registerPlugin
} from 'filepond';

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

// Test if is supported on this client
const isSupported = supported();

// Setup initial prop types and update when plugins are added
const getNativeConstructorFromType = type =>
    ({
        string: String,
        boolean: Boolean,
        array: Array,
        function: Function,
        int: Number,
        serverapi: Object,
        object: Object
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
    globalOptions = Object.assign(
        globalOptions,
        options
    );
    instances.forEach(instance => {
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
        props[prop] = {
            type: [String, getNativeConstructorFromType(OptionTypes[prop])],
            default: '__undefined__',
        };
    }

    // create 
    return defineComponent({
        name: 'FilePond',
        props,
        setup(props, { emit, attrs }) {
            const root = ref(null);
            let pond = null;

            // Will setup FilePond instance when mounted
            onMounted(() => {
                // exit here if not supported
                if (!isSupported) return;

                // get pond element
                const element = root.value.querySelector('input');

                // Map FilePond callback methods to Vue $emitters
                const methods = events.reduce((obj, value) => {
                    obj[value] = (...args) => {
                        emit('input', pond ? pond.getFiles() : []);
                        emit(value.substr(2), ...args);
                    };
                    return obj;
                }, {});

                const options = getOptions();
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

                const filePondOptions = {
                    ...globalOptions,
                    ...methods,
                    ...options,
                    ...userProps,
                    ...userAttrs,
                };

                // Create our pond
                pond = create(element, filePondOptions);

                // Copy instance method references to component instance
                Object.keys(pond)
                    .filter(key => !filteredComponentMethods.includes(key))
                    .forEach(key => root.value[key] = pond[key]);

                // Add to instances so we can apply global options when used
                instances.push(pond);

                emit('init', pond);
            });

            // called when the component root node has been detached
            const detached = () => {
                // exit when no pond defined
                if (!pond.value) return;

                // bye bye pond
                pond.value.destroy();

                // remove from instances
                const index = instances.indexOf(pond.value);
                if (index >= 0) instances.splice(index, 1);

                // clear reference
                pond.value = null;
            };

            // Will clean up FilePond instance when unmounted
            onUnmounted(() => {

                // no longer attached, clean up
                if (root.value && !root.value.offsetParent) {
                    detached();
                    return;
                }

                // if we're still attached it's likely a transition is running, we need to 
                // determine the moment when we're no longer attached to the DOM so we can 
                // clean up properly
                if (root.value !== null) {
                    const mutationHandler = (mutations, observer) => {
                        const removedNodes = (mutations[0] || {}).removedNodes || [];
                        const removedNode = removedNodes[0];
                        if (!removedNode || !removedNode.contains(root.value)) return;
                        observer.disconnect();
                        detached();
                    }

                    // start observing parent element for changes to the DOM
                    const observer = new MutationObserver(mutationHandler);
                    observer.observe(document.documentElement, { childList: true, subtree: true });
                }
            });

            return () => h('div',
                {
                    ref: root,
                    'class': {
                        'filepond--wrapper': true
                    }
                },
                [
                    h('input',
                    {
                        id: props.id,
                        name: props.name,
                        type: 'file',
                        'class': props.className,
                        required: props.required,
                        multiple: props.allowMultiple,
                        accept: props.acceptedFileTypes,
                        capture: props.captureMethod
                    })
                ]
            );
        }
    });
};

