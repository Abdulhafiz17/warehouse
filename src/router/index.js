import { createRouter, createWebHistory } from "vue-router";

function auth(to, from, next) {
  const token = localStorage["token"];
  if (!token) {
    next({ path: "/" });
    return;
  }
  next();
}

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login/login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/main",
    name: "main",
    beforeEnter: auth,
    component: () => import("../views/main/main.vue"),
  },
  {
    path: "/omborlar",
    name: "omborlar",
    beforeEnter: auth,
    component: () => import("../views/omborlar/omborlar.vue"),
  },
  {
    path: "/ombor/:id",
    name: "ombor",
    beforeEnter: auth,
    component: () => import("../views/omborlar/ombor.vue"),
  },
  {
    path: "/hodimlar",
    name: "hodimlar",
    beforeEnter: auth,
    component: () => import("../views/hodimlar/hodimlar.vue"),
  },
  {
    path: "/taminotchilar",
    name: "taminotchilar",
    beforeEnter: auth,
    component: () => import("../views/taminotchilar/taminotchilar.vue"),
  },
  {
    path: "/taminotlar",
    name: "taminotlar",
    beforeEnter: auth,
    component: () => import("../views/taminotlar/taminotlar.vue"),
  },
  {
    path: "/taminot/:id",
    name: "taminot",
    beforeEnter: auth,
    component: () => import("../views/taminotlar/taminot.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    beforeEnter: auth,
    component: () => import("../views/setting/setting.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
