import { routeGuard } from './guard';
import { RouteRecordRaw } from 'vue-router';

const routes = <Array<RouteRecordRaw>>[
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
    {
        path: '/inscription',
        component: () => import('@/pages/registration/Registration.vue'),
    },
];

export default routes;
