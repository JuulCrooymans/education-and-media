const axios = require('axios');
const AuthenticationClient = require('auth0').AuthenticationClient;
require('dotenv').config();

const auth0 = new AuthenticationClient({
    domain: 'dev-a9jcsg3o.eu.auth0.com',
    clientId: 'yIpFqDKjseR34WK2v2AVaELs5PkFDGgQ',
    clientSecret: process.env.AUTH0_CLIENT_SECRET
});

const tokenOptions = {
    audience: 'https://dev-a9jcsg3o.eu.auth0.com/api/v2/',
    scope: 'read:users read:user_idp_tokens'
}

exports.getUsers = async (req, res) => {
    try {
        let queryString = '';
        
        if (req.headers.user_list && req.headers.user_list.length > 0) {
            const queryArray = [];
            const userList = req.headers.user_list.split(',');
            
            for (let i = 0; i < userList.length; i++) {
                if (i < userList.length - 1) {
                    `user_id:auth0|`
                    queryArray.push(`user_id:auth0|${userList[i]}" OR "`);
                } else {
                    queryArray.push(`user_id:auth0|${userList[i]}`);
                }
            }
            queryString = `?q=${queryArray.join('')}`;
            
            
        }

        auth0.clientCredentialsGrant(tokenOptions, async (err, response) => {
            if (err) throw err
            const users = [];
            const data = await axios({
                method: 'GET',
                url: `https://dev-a9jcsg3o.eu.auth0.com/api/v2/users${queryString}`,
                headers: {
                    authorization: `bearer ${response.access_token}`
                }
            });

            for (user of data.data) {
                users.push({
                    email: user.email,
                    nickname: user.nickname,
                    user_id: user.user_id,
                    picture: user.picture,
                    roles: user.app_metadata.roles
                });
            }
            res.send(users);
        });

    } catch (err) {
        res.send(err.message)
        throw err
    }
}