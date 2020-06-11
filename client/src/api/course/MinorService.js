const url = '/api/courses'

class MinorService {
    static async getUniqueMinor(course, minor, accessToken) {
        try {
            const res = await fetch(`${url}/${course}/minor/${minor}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            const data = await res.json();

            return data

        } catch (err) {
            throw err;
        }
    }

    static async getAllMinorsInCourse(course, accessToken) {
        try {
            const res = await fetch(`${url}/${course}/minors`, {
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

export default MinorService