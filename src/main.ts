import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@arco-design/web-vue/dist/arco.css";
import ArcoVue from "@arco-design/web-vue";
import { createPinia } from "pinia";
import "@/plugin/axios";
import "@/auth/index";
import "bytemd/dist/index.css";
import "@/style/style.css";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";

const app = createApp(App);
app.use(ArcoVue); // 使用 ArcoVue
app.use(createPinia()); // 使用 Pinia
app.use(router); // 使用路由
app.use(ArcoVueIcon);

// 挂载应用程序
app.mount("#app");
