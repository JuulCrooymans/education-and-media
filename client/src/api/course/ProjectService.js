const url = '/api/courses'

class ProjectService {
    static async getUniqueProject(course, minor, projectId, accessToken) {
        try {
            const res = await fetch(`${url}/${course}/minors/${minor}/projects/${projectId}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            return data

        } catch (err) {
            throw err;
        }
    }

    static async getAllProjectsInMinor(course, minor, accessToken) {
        try {
            const res = await fetch(`${url}/${course}/minors/${minor}/projects`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await res.json();

            return data

        } catch (err) {
            throw err;
        }
    }
}

export default ProjectService