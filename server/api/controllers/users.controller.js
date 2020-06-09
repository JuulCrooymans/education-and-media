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
    scope: 'read:users'
}

exports.getUsers = async (req, res) => {
    try {
        auth0.clientCredentialsGrant(tokenOptions, async (err, response) => {
            if (err) throw err
            const users = [];
            const data = await axios({
                method: 'GET',
                url: `https://dev-a9jcsg3o.eu.auth0.com/api/v2/users`,
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