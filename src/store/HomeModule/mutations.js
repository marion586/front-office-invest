export const mutationType = Object.freeze({
  GET_DATA: "GET_DATA",
});

const mutations = {
  [mutationType.GET_DATA](state, payload) {
    state.homeData = payload;
  },
};

export default mutations;
