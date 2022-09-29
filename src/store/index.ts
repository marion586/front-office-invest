import { createStore } from 'vuex';
import * as HomeModule from './HomeModule';

console.log(HomeModule);

// Create a new store instance.
const store = createStore<any>({
    modules: {
        HomeModule: {
            namespaced: true,
            ...HomeModule,
        },
    },
});

export default store;
