import { Http } from './http';

export default class investService {
    static async getInvest() {
        return await Http.get('/invest');
    }

    static async addInvest(params: Object) {
        return await Http.post('/invest/add', params);
    }
    static async updateInvest(id: any, data: Object) {
        return await Http.patch(`invest/${id}`, data);
    }

    static async deleteInvest(id: any) {
        return await Http.delete(`invest/${id}`);
    }
}
