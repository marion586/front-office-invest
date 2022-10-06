const formParams: Array<IUserField> = [
    {
        name: 'firstname',
        label: 'Prénom',
        placeholder: 'Prénom',
        required: true,
        value: '',
        errorMsg: 'Le prenom est obligatoire',
    },
    {
        name: 'name',
        label: 'Nom',
        placeholder: 'Nom',
        required: true,
        value: '',
        errorMsg: 'Le nom est obligatoire',
    },
    {
        name: 'companyName',
        label: "Nom de l'entreprise",
        placeholder: "Nom de l'entreprise",
        required: true,
        value: '',
    },
    {
        name: 'companyNumber',
        label: "Numero de l'entreprise",
        placeholder: "Nom de l'entreprise",
        required: true,
        value: '',
    },
    {
        name: 'address',
        label: 'Addrèsse',
        placeholder: 'Localisation',
        required: true,
        value: '',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Addrèsse mail',
        required: true,
        value: '',
    },
    {
        name: 'phone',
        label: 'Tel',
        placeholder: 'Numero de téléphone',
        required: true,
        value: '',
    },
    {
        name: 'logo',
        label: 'Logo',
        placeholder: '',
        required: false,
        value: '',
    },

    {
        name: 'password',
        label: 'Mot de passe',
        placeholder: 'Mot de passe',
        required: true,
        type: 'password',
        value: '',
    },
    {
        name: 'confirmPassword',
        label: 'Confimer',
        placeholder: 'Confirmer votre mot de passe',
        required: true,
        type: 'password',
        value: '',
    },
];

export const particularUserForm: Array<IUserField> = [
    ...formParams
        .filter((field) => field.name !== 'companyNumber')
        .filter((field) => field.name !== 'companyName'),
];

export const professionnalUserForm: Array<IUserField> = [
    ...formParams
        .filter((field) => field.name !== 'name')
        .filter((field) => field.name !== 'firstname'),
];
