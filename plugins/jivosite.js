import Vue from "vue";
import VueJivosite from "@bchteam/vue-jivosite";

/* JIVOSITE
* jifeg30137@timevod.com
* ZgZAAU9QpVbFatx
*/

Vue.use(VueJivosite, {
  widgetId: "sQl4xgpKcY",
  onInit () {
    const store = window?.$nuxt?.$store ?? null;
    if (store) {
      store.dispatch("set", {
        name: "jivoInit",
        value: true
      });
    }
  },
  onFail (error) {
    console.log("Failed :-(", error);
  }
});
