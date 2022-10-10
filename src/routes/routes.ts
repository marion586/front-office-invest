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
        name: 'find-property',
        path: '/recherche-bien',
        component: () => import('@/pages/find-Property/index.vue'),
    },
    {
        name: 'detail',
        path: '/detail',
        component: () => import('@/pages/detail/index.vue'),
        children: [
            {
                path: '/Detail/A',
                component: () =>
                    import('@/pages/detail/component/ComponentA.vue'),
            },
            {
                path: '/Detail/B',
                component: () =>
                    import('@/pages/detail/component/ComponentB.vue'),
            },
        ],
    },
    {
        name: 'product-list',
        path: '/liste-produit',
        component: () => import('@/pages/product-list/List.vue'),
    },
    {
        name: 'add',
        path: '/ajouter',
        component: () => import('@/pages/add/index.vue'),
    },
    {
        name: 'not-found',
        path: '/:path(.*)*',
        component: () => import('@/pages/error/404.vue'),
    },
];

export default routes;
