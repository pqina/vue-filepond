import VueFilePond, { VueFilePondInstance} from "vue-filepond";
import Vue from "vue"

const Filepond = VueFilePond()

let ref: VueFilePondInstance

const component =  Vue.extend({
    components: {
        Filepond
    }
})