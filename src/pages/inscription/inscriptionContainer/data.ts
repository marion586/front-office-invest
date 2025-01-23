export const data: any = [
    {
        label: 'Nom',
        hint: 'Votre name',
        name: 'firstName',
        type: 'input',
        inputType: 'text',
    },
    {
        label: 'Prenom',
        hint: 'Votre Prenom',
        name: 'lastName',
        type: 'input',
        inputType: 'text',
    },
    {
        label: 'Email',
        hint: 'Votre Email',
        name: 'email',
        type: 'input',
        inputType: 'email',
    },
    {
        label: 'Mot de passe',
        hint: 'Votre Mot de passe',
        name: 'password',
        type: 'input',
        inputType: 'password',
    },
    {
        label: 'Votre addresse',
        hint: 'Votre addresse',
        name: 'address',
        type: 'input',
        inputType: 'text',
    },
    {
        label: 'Telephone',
        hint: 'Votre Numero telephone',
        name: 'tel',
        type: 'input',
        inputType: 'text',
    },
    {
        label: 'Type utilisateur',
        options: [
            {
                value: 'Apporteur',
                label: 'Apporteur',
            },
            {
                value: 'Investisseur',
                label: 'Investisseur',
            },
        ],
        name: 'typeUser',
        type: 'select',
    },
];
