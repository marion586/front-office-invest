interface IUserField {
    name: string;
    label: string;
    required: boolean;
    placeholder: string;
    type?: string;
    value: string;
    errorMsg?: string;
}

interface IErrorRegistrationFields {
    name: string;
    firstname: string;
    agencyName?: string;
    agencyNumber?: string;
    agencyAddress?: string;
    agencyTva?: string;
    address: string;
    email: string;
    telephone: string;
    tva: string;
    password: string;
    confirmPassword: string;
}
