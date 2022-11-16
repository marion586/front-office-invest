import stripeService from '@/services/stripeService';

const mutationType = <Readonly<any>>Object.freeze({
    GET_DATA: 'GET_DATA',
});

export const mutations = {
    [mutationType.GET_DATA](state: any, payload: Object) {
        state.stripeData = payload;
    },
};

export const state = {
    stripeData: [],
};
export const actions = {
    async initializeData({ commit }: any) {
        const { data } = await stripeService.getPlan();
        commit(mutationType.GET_DATA, data);
    },
};
export const getters = {
    getData(state: any) {
        return state.stripeData;
    },
};
