/**@start icon */
import BuildingHouse from '@/components/Icon/ProfilAccount/BuildingHouse.vue';
import Ads from '@/components/Icon/ProfilAccount/Ads.vue';
import Alert from '@/components/Icon/ProfilAccount/Alert.vue';
import Gift from '@/components/Icon/ProfilAccount/Gift.vue';
import GroupAccount from '@/components/Icon/ProfilAccount/GroupAccount.vue';
import HalfEye from '@/components/Icon/ProfilAccount/HalfEye.vue';
import House from '@/components/Icon/ProfilAccount/House.vue';
import Payement from '@/components/Icon/ProfilAccount/Payement.vue';
import PeopleRobbery from '@/components/Icon/ProfilAccount/PeopleRobbery.vue';
import Time from '@/components/Icon/ProfilAccount/Time.vue';
import Work from '@/components/Icon/ProfilAccount/Work.vue';
/**@end icon */

/**@start menu */

import project from '../project/project.vue';

/**@end menu */

export const MENU_LIST: Array<{
    label: string;
    value: any;
    icon: any;
}> = [
    // {
    //     label: 'Mes agences',
    //     value: AgenciesList,
    //     icon: BuildingHouse,
    // },
    {
        label: 'Mes annonces',
        value: project,
        icon: Ads,
    },
    // {
    //     label: 'Mes factures',
    //     value: Factures,
    //     icon: Payement,
    // },
    {
        label: 'Offres reçus',
        value: project,
        icon: House,
    },
    {
        label: 'Mes wishlist',
        value: project,
        icon: Gift,
    },
    // {
    //     label: 'Mes derniers biens visités',
    //     value: 'lastVisitedProperties',
    //     icon: HalfEye,
    // },
    // {
    //     label: 'Mes alertes',
    //     value: 'alerts',
    //     icon: Alert,
    // },

    // {
    //     label: 'Mes offres de travaux',
    //     value: 'workOffers',
    //     icon: Work,
    // },
    // {
    //     label: 'Mes comptabilités',
    //     value: 'accounts',
    //     icon: GroupAccount,
    // },
    // {
    //     label: 'Mes rendez-vous',
    //     value: 'dating',
    //     icon: PeopleRobbery,
    // },
    // {
    //     label: 'Mes disponibilités',
    //     value: 'availability',
    //     icon: Time,
    // },
    // {
    //     label: 'Compromis',
    //     value: Compromise,
    //     icon: MoneyBag,
    // },
];
