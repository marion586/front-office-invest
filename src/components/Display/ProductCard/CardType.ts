export default interface DataProps {
    propertyImages: Array<{ id: number; path: string }>;
    address: string;
    advanced?: string;
    annualenergy?: number;
    bathroomcount?: number;
    bedroomcount: number;
    certnumber?: number;
    chambercaracteristics?: [];
    details?: string;
    id?: number;
    latitude?: number;
    longitude?: number;
    operationType?: object;
    prices: number;
    primaryenergy?: number;
    propertyType: {
        id: number;
        name: string;
        status: boolean;
        isSell: boolean;
        isLocation: boolean;
    };
    reference?: string;
    register?: string;
    roomcount: number;
    status?: number;
    surface: number;
    title: string;
    user: {
        id: number;
        email: string;
        name: string;
        firstname: string;
    };
}
