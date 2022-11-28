interface IParams {
    key: string;
    value: any;
}

interface ISetStoreParams {
    key: string;
    initValue: any;
}

/**
 * LOCAL STORAGE
 */
export function getPersistedStore({ key, initValue }: ISetStoreParams): any {
    const stringifyInitValue: string = JSON.stringify(initValue);
    console.log(stringifyInitValue, key, localStorage.getItem(key));
    if (localStorage.getItem(key) !== 'undefined') {
        console.log(localStorage.getItem(key));
        return JSON.parse(localStorage.getItem(key) as any);
    }

    return JSON.parse(stringifyInitValue);
}

export function setPersistStore({ key, value }: IParams): void {
    const dataToPersist: string = JSON.stringify(value);
    localStorage.setItem(key, dataToPersist);
}

/**
 * SESSION STORAGE
 */

export function getSessionPersistedStore({
    key,
    initValue,
}: ISetStoreParams): any {
    const stringifyInitValue: string = JSON.stringify(initValue);
    return JSON.parse(sessionStorage.getItem(key) || stringifyInitValue);
}

export function setSessionPersistStore({ key, value }: IParams): void {
    const dataToPersist: string = JSON.stringify(value);
    sessionStorage.setItem(key, dataToPersist);
}
