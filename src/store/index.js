import { createStore } from "vuex";
import * as HomeModule from "./HomeModule";

// Create a new store instance.
const store = createStore({
  modules: {
    HomeModule: {
      namespaced: true,
      ...HomeModule,
    },
  },
});

export default store;
