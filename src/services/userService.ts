import { Http } from './http';

export default class UserService {
    static async login(params: Object) {
        return await Http.post('/login_check', params);
    }

    static async signup(params: Object) {
        return await Http.post('/auth/signup', params);
    }

    static async validate(params: Object) {
        return await Http.post(`/auth/validate/account/${(params as any).id}`);
    }
    // test to immo back api
    static async getPropertyType() {
        return await Http.get('/theproperty/property-type/list');
    }
}

// auth/signup
