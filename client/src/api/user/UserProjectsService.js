const url = '/api/userprojects'

class UserProjectsService {
    static async getUserProjectsIds(id, accessToken) {
        try {
            const res = await fetch(`${url}/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            const data = await res.json();
            
            return data;
        } catch (err) {
            throw err;
        }
    }

    static async getProjects(ids, accessToken) {
        
        try {
            const res = await fetch(`${url}?projects=${ids}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const data = await res.json();
            
            return data;
        } catch (err) {
            throw err;
        }
    }
}

export default UserProjectsService