import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.VUE_APP_API_BASE_URL,
  routes,
});
