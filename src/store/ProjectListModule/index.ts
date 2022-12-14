import projectService from '@/services/projectService';
import investService from '@/services/investService';

import {
    setPersistStore,
    getPersistedStore,
    getSessionPersistedStore,
    setSessionPersistStore,
} from '@/utils/persist_store';

const projectPersistDetails: any = getSessionPersistedStore({
    key: 'project_details',
    initValue: {},
});
const projectSingleInvestProject: any = getSessionPersistedStore({
    key: 'project_invest_single',
    initValue: {},
});
const projectPersistInvest: any = getSessionPersistedStore({
    key: 'project_invest',
    initValue: {},
});

const projectPersistdata: any = getSessionPersistedStore({
    key: 'project_data',
    initValue: [],
});

const mutationType = <Readonly<any>>Object.freeze({
    GET_DATA: 'GET_DATA',
    SET_DATA: 'SET_DATA',
    GET_DETAILS: 'GET_DETAILS',
    GET_INVEST_PROJECT: 'GET_INVEST_PROJECT',
    GET_SINGLE_INVEST_PROJECT: 'GET_SINGLE_INVEST_PROJECT',
});

export const mutations = {
    [mutationType.GET_DATA](state: any, payload: Object) {
        state.projectData = payload;
    },
    [mutationType.SET_DATA](state: any, payload: Object) {
        state.projectData = [...state.projectData, payload];
    },
    [mutationType.GET_DETAILS](state: any, payload: Object) {
        state.projectDetails = payload;
    },
    [mutationType.GET_INVEST_PROJECT](state: any, payload: Object) {
        state.projectInvest = payload;
    },
    [mutationType.GET_SINGLE_INVEST_PROJECT](state: any, payload: Object) {
        state.singleProjectInvest = payload;
    },
};

export const state = {
    projectData: projectPersistdata,
    projectDetails: projectPersistDetails,
    projectInvest: projectPersistInvest,
    singleProjectInvest: projectSingleInvestProject,
};
export const actions = {
    async initializeData({ commit }: any) {
        const { data } = await projectService.getProject();
        commit(mutationType.GET_DATA, data);
        setSessionPersistStore({ key: 'project_data', value: data });
    },
    async setData({ commit }: any, payload: object) {
        const d = await projectService.addProject(payload);
        commit(mutationType.SET_DATA, d.data);
        setSessionPersistStore({ key: 'project_data', value: d });
    },
    async setDetails({ commit }: any, payload: object) {
        commit(mutationType.GET_DETAILS, payload);
        setSessionPersistStore({ key: 'project_details', value: payload });
    },
    async setSingleProjectInvest({ commit }: any, payload: object) {
        commit(mutationType.GET_SINGLE_INVEST_PROJECT, payload);
        setSessionPersistStore({
            key: 'project_invest_single',
            value: payload,
        });
    },
    async setInvestProject({ commit }: any) {
        const { data } = await investService.getInvest();

        commit(mutationType.GET_INVEST_PROJECT, data);
        setSessionPersistStore({ key: 'project_invest', value: data });
    },
};
export const getters = {
    getData(state: any) {
        return state.projectData;
    },
    getDetails(state: any) {
        return state.projectDetails;
    },
    getInvestProject(state: any) {
        return state.projectInvest;
    },
    getSingleProjectInvest(state: any) {
        return state.singleProjectInvest;
    },
};
