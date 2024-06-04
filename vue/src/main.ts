import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "@/App.vue";
import Home from "@/components/Home/index.vue";
import Counter from "@/components/Counter/index.vue";
import NotFound from "@/components/NotFound/index.vue";
import "common/css/index.css";

const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: "/counter", component: Counter },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
