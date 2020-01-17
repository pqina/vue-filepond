import VueFilePond, { VueFilePondComponent } from "vue-filepond";
import Vue from "vue"

const SomePlugin = {}
const OtherPlugin = {}

const Filepond = VueFilePond(SomePlugin, OtherPlugin)

Vue.component('Filepond', Filepond)

const component = Vue.extend({
  components: {
    Filepond
  },
  methods: {
    init() {
      (this.$refs.filepond as VueFilePondComponent).server = {
        process: (fieldName, file, metadata, load) => {
          // simulates uploading a file
          setTimeout(() => {
            load(Date.now().toString())
          }, 1500);
        },
        load: (source, load) => {
          // simulates loading a file from the server
          fetch(source).then(res => res.blob()).then(x => load(x));
        }
      }

    }
  }
}
)