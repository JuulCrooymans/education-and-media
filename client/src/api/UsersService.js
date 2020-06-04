const url = '/api/users'

class UserService {
    static async getUsers(accessToken) {
        try {
            const res = await fetch(`${url}`, {
                method: 'GET',
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
}

export default UserService