import { Http } from './http';

export default class stripeService {
    static async getPlan() {
        return await Http.get('/subs/prices');
    }
}
