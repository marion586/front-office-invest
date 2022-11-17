import { Http } from './http';

export default class stripeService {
    static async getPlan() {
        return await Http.get('/subs/prices');
    }

    static async getSession(params: Object) {
        return await Http.post('/subs/session', params);
    }
    static async getDetailSession(params: Object) {
        return await Http.post('/subs/session-details', params);
    }
}
