const url = '/api/courses'

class CourseService {
    static async getUniqueCourse(course, accessToken) {
        try {
            const res = await fetch(`${url}/${course}`, {
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

    static async getAllCourses(accessToken) {
        try {
            const res = await fetch(`${url}`, {
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

export default CourseService