import { createStore, StoreOptions } from 'vuex';
import * as HomeModule from './HomeModule';
import * as UserModule from './UserModule';

// Create a new store instance.
const store = createStore<Object>(<StoreOptions<any>>{
    modules: {
        HomeModule: <Object>{
            namespaced: true,
            ...HomeModule,
        },
        UserModule: <Object>{
            namespaced: true,
            ...UserModule,
            persist: true,
        },
    },
});

export default store;
