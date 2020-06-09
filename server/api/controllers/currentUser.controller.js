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

exports.getUserAppMetadata = async (req, res) => {
    try {
        auth0.clientCredentialsGrant(tokenOptions, async (err, response) => {
            if (err) throw err

            const data = await axios({
                method: 'GET',
                url: `https://dev-a9jcsg3o.eu.auth0.com/api/v2/users/${req.headers.user}`,
                headers: {
                    authorization: `bearer ${response.access_token}`
                }
            });

            res.send(await data.data.app_metadata.roles)
        });

    } catch (err) {
        res.send(err.message)
        throw err
    }
}