import { createRouter, createWebHistory } from "vue-router";
import Todolist from "../views/Todolist.vue";
import Postlist from "../views/Postlist.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "todo",
      component: Todolist,
    },
    {
      path: "/post",
      name: "post",
      component: Postlist,
    },
  ],
});

export default router;
