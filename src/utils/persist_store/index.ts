interface IParams {
    key: string;
    value: any;
}

interface ISetStoreParams {
    key: string;
    initValue: any;
}

export function getPersistedStore({ key, initValue }: ISetStoreParams): any {
    const parsedInitValue: any =
        typeof initValue === 'string' ? initValue : JSON.stringify(initValue);
    return JSON.parse(localStorage.getItem(key) || parsedInitValue);
}

export function setPersistStore({ key, value }: IParams): void {
    const dataToPersist: string =
        typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, dataToPersist);
}
