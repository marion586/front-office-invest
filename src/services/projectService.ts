import { Http } from './http';

export default class projectService {
    static async getProject() {
        return await Http.get('/project');
    }

    static async addProject(params: Object) {
        return await Http.post('/project/add', params);
    }
    static async updateProject(id: any, data: Object) {
        return await Http.patch(`project/${id}`, data);
    }
}
