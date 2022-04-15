// TypeScript Version: 3.6
import VueConstructor, { Component, ComponentOptions } from "vue"
import { FilePondOptionProps, FilePondCallbackProps, FilePond } from "filepond";

type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>;

/** Props for the component */
type VueFilepondProps = Except<FilePondOptionProps, keyof FilePondCallbackProps>;

/** Methods that don't exist on the instance */
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

type VueFilePondInstanceMethods = Except<FilePond, FilteredMethods>;

/** Reference type for typed $refs */
export class VueFilePondComponent extends VueConstructor<VueFilePondInstanceMethods>{ }

declare const VueFilePond: (...plugins: any[]) => ComponentOptions<any, VueFilePondInstanceMethods, any, VueFilepondProps>

export default VueFilePond;

export const setOptions: (options: FilePondOptionProps) => void;
