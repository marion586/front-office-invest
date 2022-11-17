import { Http } from './http';

export default class detailService {
    static async getDetail() {
        return await Http.get('/detail');
    }

    static async createDetail(params: Object) {
        return await Http.post('/detail/add', params);
    }
}
