const url = '/api/users'

class UserService {
    static async getUsers(users, accessToken) {
        try {
            const res = await fetch(`${url}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    user_list: users
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