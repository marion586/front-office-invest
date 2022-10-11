import {
    getSessionPersistedStore,
    setSessionPersistStore,
} from '@/utils/persist_store';

const subscriptionCards = getSessionPersistedStore({
    key: 'subscription_cards',
    initValue: null,
});

interface ISubscriptionState {
    card: Object | null;
}

const mutationstype = Object.freeze({
    GET_SUBSCRIPTION_CARDS: 'GET_SUBSCRIPTION_CARDS',
});
export const mutations: Object = {
    [mutationstype.GET_SUBSCRIPTION_CARDS](
        state: ISubscriptionState,
        payload: any
    ) {
        state.card = payload;
    },
};
export const actions: Object = {
    setSubscriptionCards({ commit, state }: any, payload: Array<any>): void {
        console.log(state, '>>>>>state');
        commit('subscription_cards', payload);
        setSessionPersistStore({ key: 'subscription_cards', value: payload });
    },
};
export const getters: Object = {
    getSubscriptionCard(state: ISubscriptionState) {
        console.log('object');
        return state.card;
    },
};
export const state: ISubscriptionState = {
    card: subscriptionCards,
};
