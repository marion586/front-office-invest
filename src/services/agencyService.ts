import { Http } from './http';

export default class AgencyService {
    static async getAgenciesList() {
        return await Http.get('/agency');
    }
}
