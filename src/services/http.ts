import axios, { AxiosRequestConfig, AxiosError, AxiosStatic } from 'axios';

// inject token from localStorage into hearder on each request
console.log(localStorage.getItem('token'));
if (localStorage.getItem('token')) {
    (axios as AxiosStatic).defaults.headers.common['Authentication'] =
        localStorage.getItem('token') as string;
} else {
    delete (axios as AxiosStatic).defaults.headers.common['Authentication'];
}

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export class Http {
    static async get(
        url: string,
        params?: AxiosRequestConfig<any>
    ): Promise<any> {
        try {
            const { data } = await axios.get(url, { params });
            return data;
        } catch (e) {
            const error = e as AxiosError;
            throw `HTTP::GET, ${error.message}`;
        }
    }

    static async post(
        url: string,
        params?: AxiosRequestConfig<any>
    ): Promise<any> {
        try {
            const { data } = await axios.post(url, params);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            throw `HTTP::POST, ${error.message}`;
        }
    }
}
