import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VWave from "v-wave";
import card from "./components/card/card.vue";
import btn from "./components/btn/btn.vue";
import tabs from "./components/tabs/tabs.vue";
import modal from "./components/modal/modal.vue";

createApp(App)
  .use(store)
  .use(router)
  .use(VWave)
  .component("card", card)
  .component("btn", btn)
  .component("tabs", tabs)
  .component("modal", modal)
  .mount("#app");
