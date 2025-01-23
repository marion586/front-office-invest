import { Http } from './http';

export default class categorieService {
    // test to immo back api
    static async getCategorie() {
        return await Http.get('categorie');
    }
}

// auth/signup
