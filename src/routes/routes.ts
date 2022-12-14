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
    {
        name: 'details',
        path: '/details/:id',
        component: () => import('@/pages/Details/index.vue'),
    },
    {
        name: 'postule',
        path: '/postule',
        component: () => import('@/pages/postule/index.vue'),
    },
    {
        name: 'postuleSucess',
        path: '/postule-success',
        component: () => import('@/pages/postuleSucces/index.vue'),
    },
    {
        name: 'detailSucess',
        path: '/details-success',
        component: () => import('@/pages/detailSucces/index.vue'),
    },
    {
        name: 'my-account',
        path: '/my-account',
        component: () => import('@/pages/my-account/index.vue'),
    },
    {
        name: 'detail-paiment',
        path: '/detail-paiement',
        component: () => import('@/pages/detailPaiement/index.vue'),
    },
    {
        name: 'investissement',
        path: '/investissement',
        component: () => import('@/pages/investissement/index.vue'),
    },
    {
        name: 'investSent',
        path: '/invest-sent',
        component: () => import('@/pages/investSent/index.vue'),
    },
    {
        name: 'projectPaymentSuccess',
        path: '/project-payment-success',
        component: () => import('@/pages/project-success/index.vue'),
    },
    {
        name: 'apporteur',
        path: '/apporteur',
        component: () => import('@/pages/Apporteur/index.vue'),
    },
    {
        name: 'investor',
        path: '/investor',
        component: () => import('@/pages/Investor/index.vue'),
    },
    ,
];

export default routes;
