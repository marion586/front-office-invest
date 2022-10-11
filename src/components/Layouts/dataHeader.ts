import Home from '@/components/Icon/Home.vue';
import Immobilier from '@/components/Icon/Immobilier.vue';
import Finance from '@/components/Icon/Finance.vue';
import Transport from '@/components/Icon/Transport.vue';
import Setting from '@/components/Icon/Setting.vue';
import ArtHome from '@/components/Icon/ArtHome.vue';
import Search from '@/components/Icon/Search.vue';
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
        icon: Immobilier,
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
        icon: Finance,
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
        icon: Setting,
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
        icon: Transport,
    },
    {
        label: 'Art’home',
        path: '/',
        view: 'all',
        icon: ArtHome,
    },
    {
        label: 'Recherche',
        view: 'mobile',
        path: '/recherche-bien',
        icon: Search,
    },
];
