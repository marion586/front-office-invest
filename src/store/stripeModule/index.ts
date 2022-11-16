import stripeService from '@/services/stripeService';
import {
    setPersistStore,
    getPersistedStore,
    getSessionPersistedStore,
    setSessionPersistStore,
} from '@/utils/persist_store';

const projectDataFromSession: any = getSessionPersistedStore({
    key: 'project_data',
    initValue: {},
});

const mutationType = <Readonly<any>>Object.freeze({
    GET_DATA: 'GET_DATA',
    GET_PROJECT: 'GET_PROJECT',
});

export const mutations = {
    [mutationType.GET_DATA](state: any, payload: Object) {
        state.stripeData = payload;
    },
    [mutationType.GET_PROJECT](state: any, payload: Object) {
        state.projectData = payload;
    },
};

export const state = {
    stripeData: [],
    projectData: projectDataFromSession,
};
export const actions = {
    async initializeData({ commit }: any) {
        const { data } = await stripeService.getPlan();
        commit(mutationType.GET_DATA, data);
    },
    async initializeProjectData({ commit }: any, payload: object) {
        commit(mutationType.GET_PROJECT, payload);
        setSessionPersistStore({ key: 'project_data', value: payload });
    },
};
export const getters = {
    getData(state: any) {
        return state.stripeData;
    },
    getProjectData(state: any) {
        return state.projectData;
    },
};
