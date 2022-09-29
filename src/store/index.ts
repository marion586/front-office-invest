import { createStore } from 'vuex';
import * as HomeModule from './HomeModule';
import * as UserModule from './UserModule';

console.log(HomeModule);

// Create a new store instance.
const store = createStore<any>({
    modules: {
        HomeModule: {
            namespaced: true,
            ...HomeModule,
        },
        UserModule: {
            namespaced: true,
            ...UserModule,
        },
    },
});

export default store;
