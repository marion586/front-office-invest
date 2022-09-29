import axios, { AxiosStatic } from 'axios';

interface IUserState {
    user: Object;
}

const mutationType: Readonly<any> = Object.freeze({
    GET_USER_DETAILS: 'GET_USER_DETAILS',
});

export const mutations: Object = {
    [mutationType.GET_USER_DETAILS](state: IUserState, payload: Array<any>) {
        state.user = payload;
    },
};
export const state: IUserState = {
    user: {},
};

export const getters: Object = {
    getUserDetails(state: IUserState) {
        return state.user;
    },
};

export const actions: Object = {
    setUserDetails({ commit }: any, payload: any): void {
        // inject token into Headers
        const token: string = `Bearer ${payload.token}`;
        (axios as AxiosStatic).defaults.headers.common['Authentication'] =
            token;

        // save token in localStorage for later use
        !localStorage.getItem('token') && localStorage.setItem('token', token);
        commit(mutationType.GET_USER_DETAILS, payload);
    },
};
