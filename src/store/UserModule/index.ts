import axios from 'axios';

interface IUserState {
    user: Object;
}

const mutationType: Readonly<any> = Object.freeze({
    GET_USER_DETAILS: 'GET_USER_DETAILS',
});

export const mutations = {
    [mutationType.GET_USER_DETAILS](state: IUserState, payload: Array<any>) {
        state.user = payload;
    },
};
export const state: IUserState = {
    user: {},
};

export const getters = {
    getUserDetails(state: IUserState) {
        return state.user;
    },
};

export const actions = {
    setUserDetails({ commit }: any, payload: any) {
        // const data = await UserService.getPropertyType();

        // inject token into Headers
        const token = `Bearer ${payload.token}`;
        axios.defaults.headers.common['Authentication'] = token;

        // save token in localStorage for later use
        !localStorage.getItem('token') && localStorage.setItem('token', token);
        commit(mutationType.GET_USER_DETAILS, payload);
    },
};
