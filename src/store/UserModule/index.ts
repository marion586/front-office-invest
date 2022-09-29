import axios, { AxiosStatic } from 'axios';
import { setPersistStore, getPersistedStore } from '@/utils/persist_store';

interface IUserState {
    user: Object | null;
}

const userFromStore: any = getPersistedStore({ key: 'user', initValue: null });

const mutationType: Readonly<any> = Object.freeze({
    GET_USER_DETAILS: 'GET_USER_DETAILS',
});

export const mutations: Object = {
    [mutationType.GET_USER_DETAILS](state: IUserState, payload: Array<any>) {
        state.user = payload;
    },
};
export const state: IUserState = {
    user: userFromStore,
};

export const getters: Object = {
    getUserDetails(state: IUserState) {
        return !!state.user ? state.user : null;
    },
};

export const actions: Object = {
    setUserDetails({ commit }: any, payload: any): void {
        if (payload) {
            // inject token into Headers
            const token: string = `Bearer ${payload.token}`;
            (axios as AxiosStatic).defaults.headers.common['Authentication'] =
                token;
            // save token in localStorage for later use
            !localStorage.getItem('token') &&
                localStorage.setItem('token', token);
            commit(mutationType.GET_USER_DETAILS, payload.detail);

            // persist User
            setPersistStore({ key: 'user', value: payload.detail });
        } else {
            /**
             * if logout then null is passed
             */
            commit(mutationType.GET_USER_DETAILS, null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
};
