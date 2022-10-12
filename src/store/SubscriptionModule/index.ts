import SubscriptionServices from '@/services/subscriptionService';
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
    async setSubscriptionCards({ commit }: any, payload: string): Promise<any> {
        console.log(payload, 'params');
        const res: Promise<any> =
            await SubscriptionServices.getSubscriptionCard({
                for: payload,
            });
        commit(mutationstype.GET_SUBSCRIPTION_CARDS, res);
    },
};
export const getters: Object = {
    getSubscriptionCard(state: ISubscriptionState) {
        return state.card;
    },
};
export const state: ISubscriptionState = {
    card: null,
};

/**
 * FUNCTIONS
 */
async function getSubscriptionCard(type: string) {
    try {
        const { data } = await SubscriptionServices.getSubscriptionCard({
            for: type,
        });
        /**
         * Fetch and sort data
         */
        const cardList: Array<Object> = data.sort(
            (a: ISubscriptionCards, b: ISubscriptionCards) =>
                a.price > b.price ? 1 : -1
        );
    } catch (error) {
        console.log(error);
    }
}
