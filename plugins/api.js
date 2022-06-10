import Vue from "vue";
import API from "~/api/";

export default ({ $axios, store, env }, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const ApiWithAxios = API($axios, store);

  Vue.prototype.$API = ApiWithAxios("/", store);
};
