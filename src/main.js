import { createApp } from "vue";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import App from "./App.vue";

createApp(App)
  .use(VueGoogleMaps, {
    load: {
      key: process.env.VUE_APP_GMAP_API_KEY,
    },
  })
  .mount("#app");
