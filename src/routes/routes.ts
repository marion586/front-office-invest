import {
    routeGuard,
    requiresAuthGuard,
    logoutGuard,
    requiresRegistrationGuard,
} from './guard';
import { RouteRecordRaw } from 'vue-router';

const routes = <Array<RouteRecordRaw>>[
    {
        name: 'home',
        path: '/',
        component: () => import('@/pages/home/index.vue'),
    },
    {
        name: 'inscription',
        path: '/inscription',
        component: () => import('@/pages/inscription/index.vue'),
    },

    {
        name: 'connexion',
        path: '/connexion',
        component: () => import('@/pages/connexion/index.vue'),
    },
];

export default routes;
