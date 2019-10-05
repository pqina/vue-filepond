// TypeScript Version: 3.5
import VueConstructor, { Component, ComponentOptions } from "vue"
import { FilePondOptionProps, FilePondCallbackProps, FilePond } from "filepond";

type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>;

/** Props for the component */
type VueFilepondProps = Except<FilePondOptionProps, keyof FilePondCallbackProps>;

type FilteredMethods = 'setOptions' |
    'on' |
    'off' |
    'onOnce' |
    'appendTo' |
    'insertAfter' |
    'insertBefore' |
    'isAttachedTo' |
    'replaceElement' |
    'restoreElement' |
    'destroy'

/** Instance methods */
type VueFilePondInstanceMethods = Except<FilePond, FilteredMethods>;

export class VueFilePondInstance extends VueConstructor<VueFilePondInstanceMethods>{ }

declare const VueFilePond: (plugins?: any[]) => ComponentOptions<any, VueFilePondInstanceMethods, any, VueFilepondProps>

export default VueFilePond;