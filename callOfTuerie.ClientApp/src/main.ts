import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import quasar, { config } from "./plugins/quasar/quasar";
import "@/plugins/extensions/string.extension";
import { router } from "@/router/index";
createApp(App).use(router).use(quasar(), config()).mount("#app");
