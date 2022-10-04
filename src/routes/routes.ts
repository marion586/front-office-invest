import { routeGuard, requiresAuthGuard, logoutGuard } from './guard';
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
        name: 'authLogin',
        path: '/connexion',
        component: () => import('@/pages/login/Login.vue'),
    },
    {
        path: '/inscription',
        component: () => import('@/pages/registration/Registration.vue'),
    },
    {
        path: '/styleguide',
        component: () => import('@/pages/styleguide.vue'),
    },
    {
        name: 'my-account',
        path: '/mon-compte',
        component: () => import('@/pages/user-account/index.vue'),
        beforeEnter: [requiresAuthGuard],
        meta: { requireAuth: true },
    },
    {
        name: 'disconnection',
        path: '/logout',
        beforeEnter: [logoutGuard],
    },
    {
        name: 'find-property',
        path: '/recherche-bien',
        component : ()=> import('@/pages/find-Property/index.vue')
    },
    {
        name: 'product-list',
        path: '/product-list',
        component: () => import('@/pages/productList/List.vue'),
    }
];

export default routes;
