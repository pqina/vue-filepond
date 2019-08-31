// TypeScript Version: 3.5
import { Component } from "vue"
import * as FilePond from "filepond"

type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>;

type VueFilepondProps = Except<FilePond.FilePond,
    'setOptions' |
    'on' |
    'off' |
    'onOnce' |
    'appendTo' |
    'insertAfter' |
    'insertBefore' |
    'isAttachedTo' |
    'replaceElement' |
    'restoreElement' |
    'destroy'>

declare const VueFilepond: Component<any, any, any, VueFilepondProps>

export default VueFilepond