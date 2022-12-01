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

import Chart from '../Chart/index.vue';
import Chiffre from '../Chifre/index.vue';
import Facture from '../Facture/index.vue';
import Notification from '../Notification/index.vue';
import projectInvestit from '../Investisseurs/projetInvestit/index.vue';
import Apporteur from '../Investisseurs/Apporteur/index.vue';

/**@end menu */

export const INVESTOR_MENU_LIST: Array<{
    label: string;
    value: any;
    icon: any;
}> = [
    {
        label: 'Mes Projets Investit',
        value: projectInvestit,
        icon: House,
    },

    {
        label: 'Mes Apporteurs',
        value: Apporteur,
        icon: Ads,
    },
    {
        label: 'Chart graphique',
        value: Chart,
        icon: Payement,
    },
    {
        label: 'Notification',
        value: Notification,
        icon: PeopleRobbery,
    },
];
