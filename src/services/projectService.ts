import { Http } from './http';

export default class projectService {
    static async getProject() {
        return await Http.get('/project');
    }
}
