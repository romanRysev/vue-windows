import { createApp } from "vue";
import App from "./App.vue";
import WindowTestComponent from "./components/WindowContent.vue";
import VueWindow from "./components/VueWindow.vue";
import vueWindows from "./plugin";

const app = createApp(App);

app.use(vueWindows, {
  windowComponent: VueWindow,
  windowManager: {
    activeWindows: [],
    windows: { testWindow: { component: WindowTestComponent } },
  },
});

app.mount("#app");
