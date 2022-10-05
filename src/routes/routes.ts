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
        name: "detail",
        path: "/detail",
        component: () => import("@/pages/detail/index.vue"),
        children: [
            {
                path: "/Detail/A",
                component: () => import("@/pages/detail/component/ComponentA.vue"),
            },
            {
                path: "/Detail/B",
                component: () => import("@/pages/detail/component/ComponentB.vue"),
            },
        ]
    },
    {
        name: 'product-list',
        path: '/product-list',
        component: () => import('@/pages/productList/List.vue'),
    },
    {
        name : 'add',
        path : '/add',
        component : () => import('@/pages/add/index.vue'),
    }
];

export default routes;
