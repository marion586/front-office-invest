import CadastreIcon from '@/components/Icon/Cadastre.vue';
import DistanceFrom from '@/components/Icon/DistanceFrom.vue';
import ApproxServices from '@/components/Icon/ApproxServices.vue';

interface BtnLocalisation {
    id: number;
    label: string;
    icon?: any;
    case: string;
    url?: string;
}

const btnLocalisation: BtnLocalisation[] = [
    {
        id: 1,
        label: 'Parcelle cadastrale',
        icon: CadastreIcon,
        case: 'parcelleCadastrale',
        url: '/detail/cadastre',
    },
    {
        id: 2,
        label: 'Distance par rapport au burreau',
        icon: DistanceFrom,
        case: 'distance',
    },
    {
        id: 3,
        label: 'Services à proximité',
        icon: ApproxServices,
        case: 'DetailedInfo',
    },
];

export default btnLocalisation;
