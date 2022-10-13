import { Http } from './http';

export default class AgencyService {
    static async getAgenciesList() {
        return await Http.get('/society/list');
    }
    static async getAgenciesServicesList() {
        return await Http.get('/society/approval/list');
    }
}
