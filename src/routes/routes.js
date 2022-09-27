import { routeGuard } from "./guard";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/index.vue"),
  },
  {
    path: "/about",
    component: () => import("@/pages/about.vue"),
    beforeEnter: [routeGuard],
  },
];

export default routes;
