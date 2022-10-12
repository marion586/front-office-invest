import ProductsListService from '@/services/productsListService';

const mutationType = <Readonly<any>>Object.freeze({
    GET_DATA: 'GET_DATA',
    SET_MAPDATA: 'SET_MAPDATA',
});

export const mutations = {
    [mutationType.GET_DATA](state: any, payload: Object) {
        state.productsListData = payload;
    },
    [mutationType.SET_MAPDATA](state: any, payload: Object) {
        state.mapData = payload;
    },
};

export const state = {
    productsListData: [],
    mapData: [],
};
export const actions = {
    async setData({ commit }: any) {
        const { data } = await ProductsListService.getProductsList();
        let mapData: any = [];

        data.forEach((item: any) => {
            mapData.push({ lat: item.latitude, lng: item.longitude });
        });

        commit(mutationType.GET_DATA, data);
        commit(mutationType.SET_MAPDATA, mapData);
    },
};
export const getters = {
    getProductsListData(state: any) {
        return state.productsListData;
    },
    getMapData(state: any) {
        return state.mapData;
    },
};
