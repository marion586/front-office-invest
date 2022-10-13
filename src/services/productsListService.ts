import { Http } from './http';

export default class ProductsListService {
    static async getProductsList() {
        return await Http.get('/the_property/list');
    }
}
