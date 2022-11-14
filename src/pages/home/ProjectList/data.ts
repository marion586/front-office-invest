export const data: any = [
    {
        label: 'Titre du projet',
        hint: 'Titre de votre projet',
        name: 'title',
        type: 'file',
        elementType: 'input',
    },
    {
        label: 'Mountant Minimale',
        hint: 'Montant minimale',
        name: 'amountMin',
        type: 'number',
        elementType: 'input',
    },
    {
        label: 'Mountant ',
        hint: 'Montant ',
        name: 'amount',
        type: 'number',
        elementType: 'input',
    },

    {
        label: 'Contenu du projet',
        hint: 'Contenu du projet',
        name: 'content',
        type: 'number',
        elementType: 'input',
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
