import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import "./assets/icono.min.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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

function set_cookie(name, value, expires, path, domain, secure) {
  let cookieString = `${name}=${value}`;

  if (expires instanceof Date) {
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (path) {
    cookieString += `; path=${path}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += `; secure`;
  }

  document.cookie = cookieString;
}

function is_logedin() {
  if (get_cookie("token")) {
    return true;
  }
  return false;
}

const app = createApp(App);
app.config.globalProperties.$get_cookie = get_cookie;
app.config.globalProperties.$set_cookie = set_cookie;
app.config.globalProperties.$is_logedin = is_logedin;
app.config.globalProperties.$host = "http://127.0.0.1:8000";
app.config.globalProperties.$config = {
  headers: {
    Authorization: `Bearer ${get_cookie("token")}`,
  },
};
app.use(router);
app.use(VueSweetalert2);
app.mount("#app");

// createApp(App).use(router).mount("#app");
