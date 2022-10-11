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
        name: 'authValidation',
        path: '/success/:token',
        component: () => import('@/pages/login/Validation.vue'),
    },
    {
        name: 'authSubscriptionConfirmation',
        path: '/confirmation',
        component: () => import('@/pages/registration/Confirmation.vue'),
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
        name : "find-property-by-city",
        path : "/recherche-bien/ville",
        component: () => import('@/pages/find-Property/bycity.vue'),

        },
        {
            name : "find-property-by-agency",
            path : "/recherche-bien/agence",
            component: () => import('@/pages/find-Property/byagency.vue'),

        },
        {
            name : "find-property-by-map",
            path : "/recherche-bien/carte",
            component: () => import('@/pages/find-Property/bymap.vue'),
        },
        {
            name : "find-property-by-criteria",
            path : "/recherche-bien/critere",
            component: () => import('@/pages/find-Property/bycriteria.vue'),
        },
        {
            name : "find-property-by-ar",
            path : "/recherche-bien/realite-augmentee",
            component: () => import('@/pages/find-Property/byar.vue'),
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
        component: () => import('@/pages/addProduct/addProduct.vue'),
    },
    {
        name: 'not-found',
        path: '/:path(.*)*',
        component: () => import('@/pages/error/404.vue'),
    },
];

export default routes;
