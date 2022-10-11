import ProductsListService from '@/services/productsListService';

const mutationType = <Readonly<any>>Object.freeze({
    GET_DATA: 'GET_DATA',
});

export const mutations = {
    [mutationType.GET_DATA](state: any, payload: Object) {
        state.productsListData = payload;
    },
};

export const state = {
    productsListData: [],
};
export const actions = {
    async setData({ commit }: any) {
        const { data } = await ProductsListService.getProductsList();
        commit(mutationType.GET_DATA, data);
    },
};
export const getters = {
    getProductsListData(state: any) {
        return state.productsListData;
    },
};
