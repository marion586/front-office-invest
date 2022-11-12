export const data: any = [
    {
        label: 'Nom',
        hint: 'Votre name',
        name: 'firstName',
        type: 'input',
    },
    {
        label: 'Prenom',
        hint: 'Votre Prenom',
        name: 'lastName',
        type: 'input',
    },
    {
        label: 'Email',
        hint: 'Votre Email',
        name: 'email',
        type: 'input',
    },
    {
        label: 'Mot de passe',
        hint: 'Votre Mot de passe',
        name: 'password',
        type: 'input',
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
