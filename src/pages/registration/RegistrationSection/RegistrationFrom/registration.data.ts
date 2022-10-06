const formParams: Array<IUserField> = [
    {
        name: 'agencyName',
        label: "Nom de l'entreprise",
        placeholder: "Nom de l'entreprise",
        required: true,
        value: '',
    },
    {
        name: 'agencyNumber',
        label: "Numero de l'entreprise",
        placeholder: "Nom de l'entreprise",
        required: true,
        value: '',
    },
    {
        name: 'agencyAddress',
        label: "Addrèsse de l'entreprise",
        placeholder: "Lieu ou addèsse de l'entreprise",
        required: true,
        value: '',
    },
    {
        name: 'agencyTva',
        label: "TVA de l'entreprise",
        placeholder: "TVA de l'entreprise",
        required: true,
        value: '',
    },
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
        name: 'address',
        label: 'Addrèsse',
        placeholder: 'Lieu ou addrèsse personnel',
        required: true,
        value: '',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Addrèsse éléctronique',
        required: true,
        value: '',
    },
    {
        name: 'telephone',
        label: 'Tel',
        placeholder: 'Numero de téléphone',
        required: true,
        value: '',
    },
    {
        name: 'tva',
        label: 'TVA',
        placeholder: 'TVA personnel',
        required: true,
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

const errorFields: IErrorRegistrationFields = {
    name: 'Le nom est obligatoire',
    firstname: 'Le prénom est obligation',
    agencyName: "Le nom de l'entreprise est obligation",
    agencyNumber: "Le numbero de l'entreprise est obligation",
    agencyAddress: "L'addrèsse est obligation",
    agencyTva: 'Le TVA est obligation',
    address: "L'addrèsse est obligation",
    email: "L'email est obligation",
    telephone: 'Le numero de téléphone est obligation',
    tva: 'Le TVA est obligation',
    password: 'Le mot de passe est obligation',
    confirmPassword: 'Ce champ est obligation',
};

// FIELD
export const particularUserForm: Array<IUserField> = [
    ...formParams
        .filter((field) => field.name !== 'agencyName')
        .filter((field) => field.name !== 'agencyNumber')
        .filter((field) => field.name !== 'agencyAddress')
        .filter((field) => field.name !== 'agencyTva'),
];
export const professionnalUserForm: Array<IUserField> = [...formParams];

// ERROR
const { agencyName, agencyNumber, agencyAddress, agencyTva, ...rest } =
    errorFields;
export const particularErrorFields: IErrorRegistrationFields = { ...rest };
export const professsionnalErrorFields: IErrorRegistrationFields = {
    ...errorFields,
};
