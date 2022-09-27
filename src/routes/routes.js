import { routeGuard } from './guard';

const routes = [
    {
        path: '/',
        component: () => import('@/pages/index.vue'),
    },
    {
        path: '/about',
        component: () => import('@/pages/about.vue'),
        beforeEnter: [routeGuard],
    },
    {
        path: '/connexion',
        component: () => import('@/pages/login/Login.vue'),
    },
];

export default routes;
