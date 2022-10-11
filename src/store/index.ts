import { createStore, StoreOptions } from 'vuex';
import * as HomeModule from './HomeModule';
import * as UserModule from './UserModule';
import * as SubscriptionModule from './SubscriptionModule';

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
        SubscriptionModule: <Object>{
            namespaced: true,
            ...SubscriptionModule,
            persist: true,
        },
    },
});

export default store;
