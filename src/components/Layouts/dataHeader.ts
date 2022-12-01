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

// export const dataMenu: Menu[] = [
//     {
//         label: 'Accueil',
//         view: 'all',
//         path: '/',
//         icon: Home,
//     },
//     {
//         label: 'Projets',
//         path: '#',
//         view: 'all',
//         icon: Setting,
//         submenu: [
//             {
//                 label: 'MesProjet',
//                 path: '/',
//             },
//             {
//                 label: 'Mes Projets Postulés',
//                 path: '/',
//             },
//             {
//                 label: 'Listes des Projets',
//                 path: '/',
//             },
//         ],
//     },
//     {
//         label: 'Facture',
//         path: '/',
//         view: 'all',
//         icon: Transport,
//     },
//     {
//         label: 'Investisseurs',
//         path: '/',
//         view: 'all',
//         icon: ArtHome,
//     },
// ];

export const dataMenu: Menu[] = [
    {
        label: 'Accueil',
        view: 'all',
        path: '/',
        icon: Home,
    },
    {
        label: 'Projets',
        path: '/',
        view: 'all',
    },
    {
        label: 'Apporteur',
        path: '/apporteur',
        view: 'all',
        icon: Transport,
    },
    {
        label: 'Investisseurs',
        path: '/investor',
        view: 'all',
        icon: ArtHome,
    },
];
