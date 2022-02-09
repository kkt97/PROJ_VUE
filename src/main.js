import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import VueCookie from 'vue-cookie'
import {store} from "@/store/store";
import axios from "axios";

Vue.prototype.$Axios = axios;

import ko from "vee-validate/dist/locale/ko.json";
import * as rules from "vee-validate/dist/rules";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import PostCodeApp from './views/Auth/Register.vue'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("ko", ko);

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookie)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
