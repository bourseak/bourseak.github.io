import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginForm.vue"),
  },
  {
    path: "/singup",
    name: "singup",
    component: () => import("../views/SingUp.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
  },
  {
    path: "/watch/add",
    name: "addwatch",
    component: () => import("../views/AddWatch.vue"),
  },
  {
    path: "/performance",
    name: "performance",
    component: () => import("../views/PerformanceView.vue"),
  },
  {
    path: "/watch/edit/:id",
    name: "editwatch",
    component: () => import("../views/EditWatch.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
