const url = 'api/user'

class UserService {
    static async getUserData(user, accessToken) {
        try {
            const res = await fetch(url, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    user: user
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