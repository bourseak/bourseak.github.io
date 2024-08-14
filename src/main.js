import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function get_cookie(key) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(key)) {
      return cookie.substring(key.length + 1);
    }
  }
  return null;
}

const app = createApp(App);
app.config.globalProperties.$get_cookie = get_cookie;
app.use(router);
app.mount("#app");

// createApp(App).use(router).mount("#app");
