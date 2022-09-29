import axios, { AxiosRequestConfig, AxiosError } from 'axios';

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
