import Home from '@/components/Icon/Home.vue';

interface Menu {
    label: string;
    path: string;
    view?: string;
    icon?: object;
    submenu?: Array<{
        label: string;
        path: string;
        view?: string;
    }>;
}

export const dataMenu: Menu[] = [
    {
        label: 'Accueil',
        view: 'all',
        path: '/',
        icon: Home,
    },
    {
        label: 'Immobilier',
        view: 'all',
        path: '#',
        submenu: [
            {
                label: 'Vendre un bien',
                path: '/ajouter',
            },
            {
                label: 'Acquérir un bien',
                path: '/',
            },
            {
                label: 'Mettre un bien en location',
                path: '/',
            },
            {
                label: 'Louer un bien',
                path: '/',
            },
            {
                label: 'ImmoGo',
                path: '/',
            },
        ],
    },
    {
        label: 'Finance',
        view: 'all',
        path: '#',
        submenu: [
            {
                label: 'Vendre un bien',
                path: '/',
            },
            {
                label: 'Acquérir un bien',
                path: '/',
            },
            {
                label: 'Mettre un bien en location',
                path: '/',
            },
            {
                label: 'Louer un bien',
                path: '/',
            },
            {
                label: 'ImmoGo',
                path: '/',
            },
        ],
    },
    {
        label: 'Travaux',
        path: '#',
        view: 'all',
        submenu: [
            {
                label: 'Vendre un bien',
                path: '/',
            },
            {
                label: 'Acquérir un bien',
                path: '/',
            },
            {
                label: 'Mettre un bien en location',
                path: '/',
            },
            {
                label: 'Louer un bien',
                path: '/',
            },
            {
                label: 'ImmoGo',
                path: '/',
            },
        ],
    },
    {
        label: 'Transport',
        path: '/',
        view: 'all',
    },
    {
        label: 'Art’home',
        path: '/',
        view: 'all',
    },
    {
        label: 'Recherche',
        view: 'mobile',
        path: '/',
    },
];
