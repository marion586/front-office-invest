import { Http } from './http';

export default class SubscriptionServices {
    static async getSubscriptionCard(params: Object) {
        return await Http.get('/subscriptionproduct/list', params);
    }
}
