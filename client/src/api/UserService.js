const url = '/api/user/'

class UserService {
    static async getUserData(id, accessToken) {
        try {
            const res = await fetch(`${url}${id}`, {
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