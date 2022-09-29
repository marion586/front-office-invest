import { Http } from './http';

export default class UserService {
    static async login(params: Object) {
        return await Http.post('/login_check', params);
    }

    // test to immo back api
    static async getPropertyType() {
        return await Http.get('/theproperty/property-type/list');
    }
}
