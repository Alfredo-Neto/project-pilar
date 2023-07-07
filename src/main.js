import Vue from "vue";

import App from "./App";

import VueApollo from "vue-apollo";
import { apolloClient, apolloProvider } from "@/utils/request.js";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import router from "./router";
import store from "./store";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueApollo);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  apolloClient,
  render: (h) => h(App),
}).$mount("#app");
