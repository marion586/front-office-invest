import { routeGuard, requiresAuthGuard, logoutGuard } from './guard';
import { RouteRecordRaw } from 'vue-router';

const routes = <Array<RouteRecordRaw>>[
    {
        name: 'home',
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
        name: 'authRegistration',
        path: '/inscription',
        component: () => import('@/pages/registration/Registration.vue'),
    },
    {
        name: 'authSubscription',
        path: '/abonnement',
        component: () =>
            import('@/pages/registration/SubscriptionSection/Subscription.vue'),
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
        name: 'product-list',
        path: '/product-list',
        component: () => import('@/pages/productList/List.vue'),
    },
    {
        name: 'not-found',
        path: '/:path(.*)*',
        component: () => import('@/pages/error/404.vue'),
    },
];

export default routes;
