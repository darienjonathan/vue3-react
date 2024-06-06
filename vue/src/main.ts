import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "@/App.vue";
import Home from "@/components/pages/Home/index.vue";
import Counter from "@/components/pages/Counter/index.vue";
import Todo from "@/components/pages/Todo/index.vue";
import NotFound from "@/components/pages/NotFound/index.vue";
import Pokemon from "@/components/pages/Pokemon/index.vue";
import "common/css/index.css";

const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: "/counter", component: Counter },
  { path: "/todo", component: Todo },
  { path: "/pokemon", component: Pokemon },
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
