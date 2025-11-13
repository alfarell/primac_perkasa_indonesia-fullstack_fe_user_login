import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import { useAuthStore } from "../libs/auth-storage";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { authRequired: true },
  },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const auth = useAuthStore();

  const authRoutes = ["login", "register"];
  const isAuthRoute = authRoutes.includes(to.name?.toString() || "");

  if (to.meta.authRequired && !auth.isAuthenticated) {
    next({ name: "login" });
  } else if (isAuthRoute && auth.isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});
