// TypeScript Version: 3.5
import { Component } from "vue"
import { FilePondOptionProps, FilePondCallbackProps, FilePond } from "filepond";

type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>;

/** Props for the component */
type VueFilepondProps = Except<FilePondOptionProps, keyof FilePondCallbackProps>;

/** Instance methods */
export type VueFilePondInstance = Except<FilePond, 'setOptions' |
    'on' |
    'off' |
    'onOnce' |
    'appendTo' |
    'insertAfter' |
    'insertBefore' |
    'isAttachedTo' |
    'replaceElement' |
    'restoreElement' |
    'destroy'>;

declare const VueFilepond: (plugins: any[]) => Component<any, VueFilePondInstance, any, VueFilepondProps>

export default VueFilepond;