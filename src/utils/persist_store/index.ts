interface IParams {
    key: string;
    value: any;
}

export default function persistStore({ key, value }: IParams) {
    const dataToPersist: string =
        typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, dataToPersist);
}
