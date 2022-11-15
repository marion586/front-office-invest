import projectService from '@/services/projectService';

const mutationType = <Readonly<any>>Object.freeze({
    GET_DATA: 'GET_DATA',
    SET_DATA: 'SET_DATA',
});

export const mutations = {
    [mutationType.GET_DATA](state: any, payload: Object) {
        state.projectData = payload;
    },
    [mutationType.SET_DATA](state: any, payload: Object) {
        state.projectData.push(payload);
    },
};

export const state = {
    projectData: [],
};
export const actions = {
    async initializeData({ commit }: any) {
        const { data } = await projectService.getProject();
        commit(mutationType.GET_DATA, data);
    },
    async setData({ commit }: any, payload: object) {
        const d = await projectService.addProject(payload);
        commit(mutationType.SET_DATA, payload);
        console.log(d);
    },
};
export const getters = {
    getData(state: any) {
        return state.projectData;
    },
};
