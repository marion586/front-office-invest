import axios, { AxiosStatic } from 'axios';
import {
    setPersistStore,
    getPersistedStore,
    getSessionPersistedStore,
    setSessionPersistStore,
} from '@/utils/persist_store';

import userModule from '@/services/userService';
interface IUser {
    firstName?: string;
    lastName: String;
    email: string;
    image?: string;
    typeUser: String;
}
interface IUserState {
    user: Object | null;
    registeredUser: IUser | {};
}

const userFromStore: any = getPersistedStore({ key: 'user', initValue: {} });

const registerdUserFromSession: any = getSessionPersistedStore({
    key: 'registered_user',
    initValue: {},
});

const mutationType: Readonly<any> = Object.freeze({
    GET_USER_DETAILS: 'GET_USER_DETAILS',
    GET_REGISTERED_USER: 'GET_REGISTERED_USER',
});

export const mutations: Object = {
    [mutationType.GET_USER_DETAILS](state: IUserState, payload: Object) {
        state.user = payload;
    },
    [mutationType.GET_REGISTERED_USER](state: IUserState, payload: IUser) {
        state.registeredUser = payload;
    },
};
export const state: IUserState = {
    user: userFromStore,
    registeredUser: registerdUserFromSession,
};

export const getters: Object = {
    getUserDetails(state: IUserState) {
        return state.user;
    },

    getRegisteredUser(state: IUserState) {
        return state.registeredUser;
    },
};

export const actions: Object = {
    setUserDetails({ commit }: any, payload: any): void {
        if (payload) {
            console.log('setUserDetails');
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

    setRegisteredUser({ commit }: any, payload: IUser): void {
        commit(mutationType.GET_REGISTERED_USER, payload);
        setSessionPersistStore({ key: 'registered_user', value: payload });
    },
};
