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


const app = createApp(App);
app.config.globalProperties.$get_cookie = get_cookie;
app.config.globalProperties.$set_cookie = set_cookie;
app.use(router);
app.mount("#app");

// createApp(App).use(router).mount("#app");
