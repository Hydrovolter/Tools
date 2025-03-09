import "./assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import screen from "vue-screen";

createApp(App).use(router, screen, { extend: "tailwind" }).mount("#app");