interface IParams {
    key: string;
    value: any;
}

interface ISetStoreParams {
    key: string;
    initValue: any;
}

export function getPersistedStore({ key, initValue }: ISetStoreParams): any {
    const stringifyInitValue: string = JSON.stringify(initValue);
    return JSON.parse(localStorage.getItem(key) || stringifyInitValue);
}

export function setPersistStore({ key, value }: IParams): void {
    const dataToPersist: string = JSON.stringify(value);
    localStorage.setItem(key, dataToPersist);
}
