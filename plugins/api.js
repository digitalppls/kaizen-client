import Vue from "vue";
import API from "~/api/";

export default ({ $axios, store, env }, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const ApiWithAxios = API($axios, store);
  const proxy = env.PROXY
    ? "//192.168.0.54:80/server"
    : "/server";

  // $axios.setToken(store.getters.token, "Bearer");
  Vue.prototype.$API = ApiWithAxios(proxy, store);

  // inject("API", ApiWithAxios(proxy));

  // You can reuse the repositoryWithAxios object:
  // inject("userRepository", repositoryWithAxios('/users'));
};
